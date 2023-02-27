import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Withdraw extends Component<PropsWithChildren> {
  uid: int
  state = {
    withdrawable: 0,
    withdrawing: 0
  }

  getData (type: string) {
    const self = this;
    let api: string = 'withdraws'
    let titlePrefix: string = ''
    let query: string = '?customer=' + this.uid
    Taro.request({
      url: Env.apiUrl + api + query
    }).then((res) =>{
      let list = []
      for (let i of res.data){
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(i.id)}
          title={titlePrefix + '申请提现 '+ i.amount / 100}
          note={fmtDate(i.date)}
          extraText={Taxon.status[i.status]}
          arrow='right'
          />
        )
      }
      this.setState({[type]: list})
    })
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        let query
        const self = this;

        this.uid = res.data.uid
        this.getData('customer')
        query = 'users/' + this.uid
        
        Taro.request({
          url: Env.apiUrl + query
        }).then((res) =>{
          this.setState({
            withdrawable: res.data.withdrawable,
            withdrawing: res.data.withdrawing
          })
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });
  }

  navToDetail(id){
    Taro.redirectTo({url: '/pages/withdrawDetail/index?id=' + id})
  }

  create () {
    Taro.redirectTo({url: '/pages/withdrawNew/index'})
  }

  render () {
    return (
      <View className='withdraw'>

      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>

      <View className='at-col'>
      <View className='label'>提现中</View>
      <View className='number'>{this.state.withdrawing / 100}</View>
      </View>
      </View>

      <AtList className="list">
      {this.state.customer}
      </AtList>

      <View className='fixed'>
      <Button className='btn btn-primary' onClick={this.create}>申请提现</Button>
      </View>

      </View>
    )
  }
}
