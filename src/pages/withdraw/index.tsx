import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Withdraw extends Component<PropsWithChildren> {
  uid: int
  oid: int
  state = {
    withdrawable: 0,
  }

  getData (entity: string) {
    let id: int
    if (entity === 'user') {
      id = this.uid
    }
    if (entity === 'org') {
      id = this.oid
    }
    let query: string = '?' + entity + '=' + id
    Taro.request({
      url: Env.apiUrl + 'transactions' + query
    }).then((res) =>{
      let list = []
      let type
      for (let i of res.data){
        type = this.state.types.find(type => type.id === i.type)
        list.push(
          <AtListItem
          title={type.value}
          note={fmtDate(i.createdAt)}
          extraText={i.amount / 100}
          />
        )
      }
      this.setState({[entity]: list})
    })
  }

  componentDidMount () {
    Taro.request({
      url: Env.apiUrl + 'choices/transaction_types'
    })
    .then(res => {
      this.setState({types: res.data})
    })

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.uid = res.data.id
        this.oid = res.data.org.id
        this.getData('user')
        
        Taro.request({
          url: Env.apiUrl + 'users/' + this.uid
        }).then((res) =>{
          this.setState({
            withdrawable: res.data.withdrawable,
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
      </View>

      <AtList className="list">
      {this.state.user}
      </AtList>

      <View className='fixed'>
      <Button className='btn btn-primary' onClick={this.create}>申请提现</Button>
      </View>

      </View>
    )
  }
}
