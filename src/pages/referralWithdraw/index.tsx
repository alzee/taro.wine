import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Referralwithdraw extends Component<PropsWithChildren> {
  state = {
  }

  getData (type: string) {
    const self = this;
    let api: string = 'withdraws'
    let title: string
    let extraText: string
    let titlePrefix: string = ''
    let query: string
    Taro.request({
      url: Env.apiUrl + api + query
    }).then((res) =>{
      console.log(res.data)
      let list = []
      for (let i in res.data){
        if (type == 'downstreamWithdraws') {
          titlePrefix = res.data[i].applicant.name + '-'
        }
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(res.data[i].id)}
          title={titlePrefix + '申请提现 '+ res.data[i][title] / 100}
          note={fmtDate(res.data[i].date)}
          extraText={Taxon.status[res.data[i][extraText]]}
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
        console.log(res.data);
        this.setState({
          storage: res.data
        })
        const self = this;
        Taro.request({
          url: Env.apiUrl + 'consumers/' + res.data.cid
        }).then((res) =>{
          console.log(res.data)
          this.setState({
            consumer: res.data,
          })
        })
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentDidShow () {
    console.log('u see me')
  }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/withdrawDetail/index?id=' + id})
  }

  create () {
    Taro.navigateTo({url: '/pages/withdrawNew/index'})
  }

  render () {
    return (
      <View className='referralWithdraw'>

      { this.state.consumer &&
      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.consumer.withdrawable / 100}</View>
      </View>

      <View className='at-col'>
      <View className='label'>提现中</View>
      <View className='number'>{this.state.consumer.withdrawing / 100}</View>
      </View>
      </View>
      }

      <AtList className="list">
      {this.state.myWithdraws}
      </AtList>

      <View className='fixed'>
      <Button className='btn btn-primary' onClick={this.create}>申请提现</Button>
      </View>

      </View>
    )
  }
}
