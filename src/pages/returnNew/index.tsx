import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Returnnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  role: int
  orgid: int
  productid: int
  senderid: int
  products = []
  downstreams = []
  label = {
    buyer: '订货方',
    note: '备注',
    quantity: '数量',
  }

  state = {
    products: [],
    productSelected: '',
    downstreams: [],
    downstreamSelected: '',
  }

  productChange = e => {
    this.setState({
      productSelected: this.state.products[e.detail.value]
    })
    this.productid = this.products[e.detail.value].id
  }

  downstreamChange = e => {
    this.setState({
      downstreamSelected: this.state.downstreams[e.detail.value]
    })
    this.senderid = this.downstreams[e.detail.value].id
  }

  formSubmit = e => {
    let data = e.detail.value
    if (!this.senderid) {
      Taro.showToast({
        title: '请选择退货方' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (!this.productid) {
      Taro.showToast({
        title: '请选择商品' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data['quantity'] == "") {
      Taro.showToast({
        title: '请填写数量' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    data.recipientid= this.orgid
    data.senderid = this.senderid
    data.product = this.productid
    console.log(data)
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'return/new',
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

  componentWillMount () { }

  componentDidMount () {
    // this.type = this.instance.router.params.type
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.role = res.data.role
        this.orgid = res.data.org.id

        Taro.request({
          url: Env.apiUrl + 'products?org=' + this.orgid
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

        Taro.request({
          url: Env.apiUrl + 'orgs?upstream=' + this.orgid
        }).then((res) =>{
          this.downstreams = res.data
          let list = []
          for (let i in this.downstreams) {
            list[i] = this.downstreams[i].name
          }
          this.setState({
            downstreams: list
          })
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='returnNew'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >

      <Picker className='buyer' mode='selector' range={this.state.downstreams} onChange={this.downstreamChange}>
      <View className='input'>
      <Text className='label'>退货发</Text>
      {this.state.downstreamSelected}
      </View>
      </Picker>

      <Picker mode='selector' range={this.state.products} onChange={this.productChange}>
      <View className='input'>
      <Text className='label'>产品</Text>
      {this.state.productSelected}
      </View>
      </Picker>

        <Input 
        className="input"
          name='quantity' 
          type='number' 
          placeholder={this.label['quantity']}
        />

        <Input 
        className="input"
          name='note' 
          type='text' 
          placeholder={this.label['note']}
        />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
