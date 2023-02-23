import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './storeman.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  pid: int
  pIndexKey = 'storeman_p_index'
  oid: int
  oIndexKey= 'storeman_o_index'
  sn: string
  snsKey = 'storeman_sns'
  state = {
    products: [],
    productList: [],
    agencies: [],
    agencyList: [],
    sns: [],
    ord: {
    }
  }

  componentDidMount () {
    let params = this.instance.router.params
    console.log(params);
    this.sn = params.s
    this.getAgencies(1)
    this.getProducts()

    // get product index
    Taro.getStorage({
      key: this.pIndexKey
    }).then(res => {
      console.log(res.data);
      this.setState({
        productSelected: res.data
      })
    }).catch((err) => {
      console.log(err)
    })

    // get org index
    Taro.getStorage({
      key: this.oIndexKey
    }).then(res => {
      console.log(res.data);
      this.setState({
        agencySelected: res.data
      })
    }).catch((err) => {
      console.log(err)
    })

    // get sns
    let sns = []
    Taro.getStorage({
      key: this.snsKey
    }).then(res => {
      res.data.unshift(this.sn)
      // dedup
      sns = Array.from(new Set(res.data))
      Taro.setStorage({
        key: this.snsKey,
        data: sns
      })
      this.setState({
        sns
      })
    }).catch((err) => {
      console.log(err)
      sns = [this.sn]
      Taro.setStorage({
        key: this.snsKey,
        data: sns
      })
      this.setState({
        sns
      })
    })
  }

  productChanged = e => {
    let v = Number(e.detail.value)
    this.setState({
      productSelected: v,
    }, () => {
      // console.log(this.state.products[this.state.productSelected]);
    })
    Taro.setStorage({
      key: this.pIndexKey,
      data: v
    })
  }

  agencyChanged = e => {
    let v = Number(e.detail.value)
    this.setState({
      agencySelected: v,
    }, () => {
      // console.log(this.state.agencies[this.state.agencySelected]);
    })
    Taro.setStorage({
      key: this.oIndexKey,
      data: v
    })
  }

  getAgencies(typeId: int){
    Taro.request({
      url: Env.apiUrl + 'orgs?type=' + typeId,
    }).then((res) =>{
      console.log(res.data);
      let agencyList = []
      for (let i of res.data) {
        agencyList.push(i.name)
      }
      this.setState(
        {
          agencies: res.data,
          agencyList,
          // agencySelected: undefined
        }
      )
    })
  }

  getProducts(){
    Taro.request({
      url: Env.apiUrl + 'products',
    }).then((res) =>{
      console.log(res.data);
      let productList = []
      for (let i of res.data) {
        productList.push(i.name)
      }
      this.setState(
        {
          products: res.data,
          productList,
          // productSelected: undefined
        }
      )
    })
  }

  formSubmit = e => {
    if (this.state.productSelected === undefined) {
      Taro.showToast({
        title: '请选择产品',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.state.agencySelected === undefined) {
      Taro.showToast({
        title: '请选择代理商',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.state.sns.length === 0) {
      Taro.showToast({
        title: '请扫描箱码',
        icon: 'error',
        duration: 2000
      })
      return
    }
    console.log(this.state.sns)

    let oName = this.state.agencies[this.state.agencySelected].name
    let pName = this.state.products[this.state.productSelected].name
    let qty = this.state.sns.length
    let self = this
    Taro.showModal({
      title: '确认订单',
      content: '代理商: ' + oName + '\r\n产品: ' + pName + '\r\n数量: ' + qty,
      success: function (res) {
        if (res.confirm) {
          console.log('confirmed')
          let data = {
            oid: self.state.agencies[self.state.agencySelected].id,
            pid: self.state.products[self.state.productSelected].id,
            sns: self.state.sns
          }
          Taro.request({
            method: 'POST',
            data,
            url: Env.apiUrl + 'scan/storeman',
            success: function (res) { }
          }).then((res) =>{
            console.log(res.data)
            Taro.showToast({
              title: '已完成',
              icon: 'success',
              duration: 2000,
              success: () => {
                setTimeout(
                  () => {
                    Taro.switchTab({url: '/pages/index/index'})
                  }, 500
                )
              }
            })

            // remove storeman_* storege
            Taro.removeStorage({
              key: self.snsKey
            })
            Taro.removeStorage({
              key: self.pIndexKey
            })
            Taro.removeStorage({
              key: self.oIndexKey
            })
          })
        } else if (res.cancel) {
          console.log('canneled')
        }
      }
    })
  }

  rm = (i) => {
    let sns = this.state.sns
    Taro.showModal({
      title: '确认删除',
      content: '箱码 ' + sns[i],
    }).then(res => {
      if (res.confirm) {
        console.log('rm confirmed')
        sns.splice(i, 1)
        this.setState({
          sns
        })
        Taro.setStorage({
          key: this.snsKey,
          data: sns
        }).then(res => (
          console.log(res)
        ))
        if (sns.length === 0) {
          Taro.switchTab({url: '/pages/index/index'})
        }
      } else if (res.cancel) {
        console.log('rm cancelled')
      }
    })
  }

  clear = () => {
    Taro.showModal({
      title: '确认清空',
      content: '所选产品，代理商及所有扫描箱码',
    }).then(res => {
      if (res.confirm) {
        console.log('clear confirmed')
        // remove storeman_* storege
        Taro.removeStorage({
          key: this.snsKey
        })
        Taro.removeStorage({
          key: this.pIndexKey
        })
        Taro.removeStorage({
          key: this.oIndexKey
        })
        Taro.switchTab({url: '/pages/index/index'})
      } else if (res.cancel) {
        console.log('clear cancelled')
      }
    })
  }

  goOn(){
    Taro.scanCode({
      onlyFromCamera: true,
    }).then(res => {
      console.log(res)
      let text = res.result
      if (text.indexOf(Env.wxqrUrl) === 0) {
        console.log('its wxqr code')
        Taro.redirectTo({url: '/pages/scan/index?q=' + encodeURIComponent(text)})
      }
    }).catch(err => {
      console.log(err)
    })
    // Taro.redirectTo({url: '/pages/scan/storeman'})
  }

  render () {
    let list = []
    for (let i in this.state.sns) {
      list.push(
        <Button className='sn btn btn-outline-primary' onClick={() => this.rm(i)}>
        {this.state.sns[i]}
        </Button>
      )
    }
    return (
      <View className='scan-storeman scan'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <View className=''>

      <Picker mode='selector' range={this.state.productList} onChange={this.productChanged}>
      <View className='input'>
      <Text className='label'>请选择产品</Text>
      {this.state.productList[this.state.productSelected]}
      </View>
      </Picker>

      <Picker mode='selector' range={this.state.agencyList} onChange={this.agencyChanged}>
      <View className='input'>
      <Text className='label'>选择代理商</Text>
      {this.state.agencyList[this.state.agencySelected]}
      </View>
      </Picker>

      <View className='sns'>
      {list}
      </View>

      </View>
      <View className='fixed'>
      <View className='btn-wrapper'>
      <Button className='btn btn-outline-primary btn1' onClick={this.clear}>清空数据</Button>
      <Button className='btn btn-outline-primary btn1' onClick={this.goOn}>继续扫描</Button>
      </View>
      <Button className='btn' formType='submit'>生成订单</Button>
      </View>
      </Form>
      </View>
    )
  }
}
