import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'

export default class Retailnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  cid: int
  consumerName: string
  timestamp: string
  role: int
  oid: int
  products = []
  pid: int
  state = {
    products: [],
    productSelected: '',
  }

  componentWillMount () { }

  formSubmit = e => {
    let data = e.detail.value
    data.quantity = Number(data.quantity)
    data.cid = this.cid
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
      url: Env.apiUrl + 'retail/new',
      success: function (res) { }
    }).then((res) =>{
      if (res.statusCode == 500) {
        Taro.showToast({
          title: '库存不足',
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

  componentDidMount () {
    this.cid = this.instance.router.params.cid
    this.timestamp = this.instance.router.params.timestamp
    this.consumerName = this.instance.router.params.name
    console.log(this.cid, this.timestamp)

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.role = res.data.role
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
      <View className='retailNew main'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <View className='input'>
      <Text className='label'>顾客</Text>
      <Input 
      type='text' 
      value={[this.consumerName]}
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
