import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Input, Picker } from '@tarojs/components'
import './new.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Borrow extends Component<PropsWithChildren> {
  
  uid: int
  state = {
    products: {},
    index: undefined
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then((res) => {
      this.uid = res.data.id
    })
    Taro.request({
      url: Env.apiUrl + 'products',
    }).then((res) =>{
      this.setState({
        products: res.data
      })
    })
  }

  productChanged = e => {
    let index = Number(e.detail.value)
    this.setState({
      index,
      productId: this.state.products[index].id
    })
  }

  formSubmit = () => {
    let data = e.detail.value
    data.product = '/api/products/' + this.state.productId
    data.salesman = '/api/users/' + this.uid
    if (this.state.index === undefined) {
      Taro.showToast({
        title: '请选择产品',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (isNaN(data.qty)) {
      Taro.showToast({
        title: '请填写数量',
        icon: 'error',
        duration: 2000
      })
      return
    }
    Taro.request({
      method: 'POST',
      data,
      url: Env.apiUrl + 'borrow/new',
      success: function (res) { }
    }).then((res) =>{
      if (res.data.code === 0) {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.reLaunch({url: '/pages/me/index'})
              }, 500
            )
          }
        })
      }
    })
  }

  render () {
    return (
      <View className='borrow'>
      <Form className='form'
      onSubmit={this.formSubmit.bind(this)}
      >
      <Picker mode='selector' range={this.state.products} rangeKey='name' onChange={this.productChanged}>
      <View className='input'>
      <Text className='label'>选择产品</Text>
      {this.state.index !== undefined && this.state.products[this.state.index].name}
      </View>
      </Picker>

      <Input 
      className="input"
      name='qty'
      type='number'
      />

      <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
