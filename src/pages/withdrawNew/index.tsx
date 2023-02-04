import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Withdrawnew extends Component<PropsWithChildren> {
  role: int
  oid: int
  cid: int
  discount: float
  withdrawable: int

  componentWillMount () { }

  componentDidShow () {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        // this.setState({data: res.data})
        this.role = res.data.role
        let query
        if (this.role == 4) {
          this.cid = res.data.cid
          query = 'consumers/' + this.cid
        } else {
          this.oid = res.data.org.id
          query = 'orgs/' + this.oid
        }

        Taro.request({
          url: Env.apiUrl + query
        }).then((res) =>{
          if (this.role != 4) {
            this.discount = res.data.discount
          }
          this.withdrawable = res.data.withdrawable
          this.setState({withdrawable: this.withdrawable})
        })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    data.amount = Number(data.amount)
    if (this.role == 4) {
      data.consumer = '/api/consumers/' + this.cid
    } else {
      data.applicant = '/api/orgs/' + this.oid
    }
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
    if (data.amount * 100 > this.withdrawable) {
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
      type='number' 
      placeholder='提现金额' 
      />
      { this.state &&
        <View className='hint'>
        <Text>可提金额: {this.withdrawable / 100}</Text>
        { this.role == 3 &&
          <Text> ，折扣: {this.discount * 100} %</Text>
        }
        </View>
      }
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
