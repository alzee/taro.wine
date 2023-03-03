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
    withdrawable: 0
  }

  componentWillMount () { }

  componentDidShow () {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        // this.setState({data: res.data})
        this.otype = res.data.otype
        this.uid = res.data.uid
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
    data.amount = Number(data.amount)
    data.customer = '/api/users/' + this.uid
    if (data.amount == "") {
      Taro.showToast({
        title: '请填写金额' ,
        icon: 'error',
        duration: 2000
      })
      return
    } 
    if (Number.isNaN(Number(data.amount))) {
      Taro.showToast({
        title: '请填写正数' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount < 1) {
      Taro.showToast({
        title: '请填写正数' ,
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.amount * 100 > this.state.withdrawable) {
      Taro.showToast({
        title: '可提金额不足' ,
        icon: 'error',
        duration: 2000
      })
      return
    }

    data.amount = data.amount * 100

    // console.log(data)
    // return
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'withdraws',
      success: function (res) { }
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
      <Input 
      className="input"
      name='amount'
      type='digit'
      placeholder='提现金额'
      />
      { this.state &&
        <View className='hint'>
        <Text>可提金额: {this.state.withdrawable / 100}</Text>
        </View>
      }
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
