import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'

export default class Retailreturnnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  uid: int
  customerName: string
  timestamp: string
  oid: int
  products = []
  pid: int
  state = {
    products: [],
    productSelected: '',
  }

  formSubmit = e => {
    let data = e.detail.value
    data.quantity = Number(data.quantity)
    data.uid = this.uid
    data.pid = this.pid
    data.oid = this.oid
    data.timestamp = this.timestamp
    console.log(data)
    if (!this.pid) {
      Taro.showToast({
        title: '请选择商品' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.quantity == "") {
      Taro.showToast({
        title: '请填写数量' ,
        icon: 'error',
        duration: 2000
      })
      return
    } else {
      if (!Number.isInteger(data.quantity) || data.quantity < 1) {
        Taro.showToast({
          title: '请填写正整数' ,
          icon: 'error',
          duration: 2000
        })
        return
      }
    }

    // return
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'retail_return/new',
      success: function (res) { }
    }).then((res) =>{
      if (res.statusCode == 500) {
        Taro.showToast({
          title: '代金券不足',
          icon: 'error',
          duration: 2000,
        })
      } else {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.reLaunch({url: '/pages/orders/index'})
              }, 500
            )
          }
        })
      }
    })
  }

  componentWillMount () { }

  componentDidMount () {
    this.uid = this.instance.router.params.uid
    this.timestamp = this.instance.router.params.timestamp
    this.customerName = this.instance.router.params.name
    console.log(this.uid, this.timestamp)

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.oid = res.data.org.id

        Taro.request({
          url: Env.apiUrl + 'products?org=' + this.oid
        }).then((res) =>{
          this.products = res.data
          console.log(this.products)
          let list = []
          for (let i in this.products) {
            list[i] = this.products[i].name
          }
          this.setState({
            products: list
          })
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  productChange = e => {
    this.setState({
      productSelected: this.state.products[e.detail.value]
    })
    this.pid = this.products[e.detail.value].id
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='retailReturnNew main'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <View className='input'>
      <Text className='label'>顾客</Text>
      <Input 
      type='text' 
      value={[this.customerName]}
      disabled
      />
      </View>
      <Picker mode='selector' range={this.state.products} onChange={this.productChange}>
      <View className='input'>
      <Text className='label'>商品</Text>
      {this.state.productSelected}
      </View>
      </Picker>
      <Input 
      className="input"
      name='quantity' 
      type='number' 
      placeholder='数量' 
      />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
