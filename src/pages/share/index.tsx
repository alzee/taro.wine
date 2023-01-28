import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtCard } from "taro-ui"
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import { Taxon } from '../../Taxon'

export default class Share extends Component<PropsWithChildren> {
  state = {
    share: 0,
    withdrawable: 0
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data);
        let oid = res.data.org.id
        let list
        Taro.request({
          url: Env.apiUrl + 'orgs/' + oid,
        }).then((res) =>{
          this.setState({
            share: res.data.share,
            withdrawable: res.data.withdrawable
          })
          }
        )

        Taro.request({
          url: Env.apiUrl + 'shares?org=' + oid,
        }).then((res) =>{
          list = []
          for (let i of res.data) {
            // console.log(i)
            list.push(
              <AtListItem
              // onClick={}
              title={i.retail.store.name}
              note={fmtDate(i.createdAt) + ' ' + Taxon.REWARD_SHARE_STATUSES[i.status]}
              extraText={i.amount / 100}
              // arrow='right'
              className='list-item'
              />
            )
          }
          this.setState({shareList: list})
        })
      }
    })
  }

  render () {
    return (
      <View className='share'>
      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>分润</View>
      <View className='number'>{this.state.share / 100}</View>
      </View>

      <View className='at-col'>
      <View className='label'>可提现</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>

      </View>
      { this.state.shareList &&
      <AtList>
      { this.state.shareList}
      </AtList>
      }
      </View>
    )
  }
}
