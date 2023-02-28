import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Input, Picker } from '@tarojs/components'
import './new.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Borrow extends Component<PropsWithChildren> {
  
  uid: int
  state = {
    claims: {},
    index: undefined
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then((res) => {
      this.uid = res.data.uid
    })
    Taro.request({
      url: Env.apiUrl + 'claims?status=1&settled=false',
    }).then((res) =>{
      console.log(res.data)
      this.setState({
        claims: res.data
      })
    })
  }

  claimChanged = e => {
    let index = Number(e.detail.value)
    this.setState({
      index,
      claimId: this.state.claims[index].id
    })
  }

  formSubmit = () => {
    let data = {}
    data.id = this.state.claimId
    data.uid = this.uid
    if (this.state.index === undefined) {
      Taro.showToast({
        title: '请选择兑奖单',
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
      <Picker mode='selector' range={this.state.claims} rangeKey='name' onChange={this.claimChanged}>
      <View className='input'>
      <Text className='label'>选择兑奖单</Text>
      {this.state.selectorChecked}
      {this.state.index !== undefined && this.state.claims[this.state.index].name}
      </View>
      </Picker>
      <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
