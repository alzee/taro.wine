import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Withdrawnew extends Component<PropsWithChildren> {
  otype: int
  oid: int
  uid: int
  state = {
    withdrawable: 0,
    disabled: false
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        // this.setState({data: res.data})
        this.otype = res.data.org.type
        this.uid = res.data.id
        Taro.request({
          url: Env.apiUrl + 'users/' + this.uid
        }).then((res) =>{
          this.setState({withdrawable: res.data.withdrawable})
        })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    data.amount = Number(data.amount) * 100
    data.customer = '/api/users/' + this.uid
    if (data.amount == "") {
      Taro.showToast({
        title: '请填写金额' ,
        icon: 'error',
        duration: 2000
      })
      return
    } 
    if (Number.isNaN(data.amount)) {
      Taro.showToast({
        title: '请填写数字' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount < 0) {
      Taro.showToast({
        title: '请填写正数' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount < 100) {
      Taro.showToast({
        title: '最小金额 1' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount > 50000) {
      Taro.showToast({
        title: '单次最高500' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount > this.state.withdrawable) {
      Taro.showToast({
        title: '可提金额不足' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    this.setState({disabled: true})

    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'withdraws'
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.redirectTo({url: '/pages/withdraw/index'})
            }, 500
          )
        }
      })
    })
  }

  render () {
    return (
      <View className='withdrawNew main'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <View className='money-input'>
      <Text className='cny'>￥</Text>
      <Input 
      className="input"
      name='amount'
      type='digit'
      />
      </View>
      { this.state &&
        <View className='hint'>
        <Text>可提金额: {this.state.withdrawable / 100}</Text>
        </View>
      }
        <Button className='btn' formType='submit' disabled={this.state.disabled}>提交</Button>
      </Form>
      </View>
    )
  }
}
