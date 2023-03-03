import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Reward extends Component<PropsWithChildren> {
  oid: int
  uid: int
  state = {
    withdrawable: 0,
    list: undefined
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then( res => {
      this.oid = res.data.org.id
      this.uid = res.data.uid
        // Taro.request({
        //   url: Env.apiUrl + 'rewards?'
        // })
        // .then((res) =>{
        // })
        Taro.request({
          url: Env.apiUrl + 'orgs/' + this.oid
        })
        .then((res) =>{
          this.setState({
            withdrawable: res.data.withdrawable,
          })
        })
    })
    .catch( err => {
      console.log(err)
    })
  }

  move = () => {
    let data = {}
    data.oid = this.oid
    data.uid = this.uid
    Taro.showModal({
      title: '转入个人微信',
      content: '将机构可提现金额转至机构管理员个人微信？'
    })
    .then(res => {
      if (res.confirm) {
        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'withdrawable_move_to_person',
          data
        })
        .then(res => {
          if (res.data.code === 0) {
            Taro.showToast({
              title: '已完成',
              icon: 'success',
              duration: 2000
            })
            .then(res => {
              setTimeout(
                () => {
                  Taro.navigateBack({ delta: 1 })
                }, 500)
            })
          }
        })
      } else if (res.cancel) {
      }
    })
  }

  render () {
    return (
      <View className='reward main'>

      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>
      </View>

      <View className='fixed'>
      <Button className='btn btn-primary' onClick={this.move}>转入个人微信</Button>
      </View>

      </View>
    )
  }
}
