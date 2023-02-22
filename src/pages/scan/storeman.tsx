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
    let data = {
    }

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
    Taro.getStorage({
      key: this.snsKey
    }).then(res => {
      // dedup
      let sns = Array.from(new Set([...res.data, this.sn]))
      Taro.setStorage({
        key: this.snsKey,
        data: sns
      })
      this.setState({
        sns
      })
    }).catch((err) => {
      console.log(err)
      Taro.setStorage({
        key: this.snsKey,
        data: [this.sn]
      })
    })
    //Taro.setStorage({
    //  key: this.snsKey,
    //  data: 
    //})

    // Taro.getStorageInfo({})
    // .then(res => {
    //   console.log(res)
    //     if (res.keys.includes(this.storageKey)) {
    //       console.log('key found: ' + this.storageKey)
    //       Taro.getStorage({
    //       })
    //     } else {
    //       console.log('key not found: ' + this.storageKey)
    //     }
    // })

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        // let data = {
        //   oid: res.data.org.id,
        //   // oid: 28,
        //   s: params.s,
        //   e: params.e
        // }
        // Taro.request({
        //   method: 'POST',
        //   data,
        //   url: Env.apiUrl + 'scan/storeman',
        //   success: function (res) { }
        // }).then((res) =>{
        //   console.log(res.data);
        //   this.setState({
        //     data: res.data
        //   })
        // })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
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
    Taro.getStorage({
      key: this.snsKey
    }).then(res => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    let list = []
    for (let i of this.state.sns) {
      list.push(
        <View className='sn'>
        {i}
        </View>
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
      <Button className='btn' formType='submit'>入库</Button>
      </View>
      </Form>
      </View>
    )
  }
}
