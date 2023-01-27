import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'

export default class Referral extends Component<PropsWithChildren> {
  state = {
    seg: 0,
  }
  role: int

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let cid = res.data.cid
        Taro.request({
          url: Env.apiUrl + 'consumers/' + cid,
        }).then((res) =>{
          this.setState({
            reward: res.data.reward,
            withdrawable: res.data.withdrawable
          })
        })

        let list = []
        Taro.request({
          url: Env.apiUrl + 'consumers?referrer=' + cid,
        }).then((res) =>{
          for (let i of res.data) {
            list.push(
              <AtListItem
              // onClick={}
              title={i.name}
              note={i.phone}
              // extraText={}
              // arrow='right'
              className='list-item'
              />
            )
          }
          // this.setState({refList: list})
        })

        Taro.request({
          url: Env.apiUrl + 'orgs?referrer=' + cid,
        }).then((res) =>{
          for (let i of res.data) {
            list.push(
              <AtListItem
              // onClick={}
              title={i.name}
              note={i.phone}
              // extraText={}
              // arrow='right'
              className='list-item'
              />
            )
          }
          this.setState({refList: list})
        })

        Taro.request({
          url: Env.apiUrl + 'rewards?&referrer=' + cid,
        }).then((res) =>{
          console.log(res.data)
          list = []
          let record
          for (let i of res.data) {
            console.log(i);
            if (i.type == 0 || i.type == 1 || i.type == 2) {
              record = i.ord.orderItems[0]
            }
            if (i.type == 3 || i.type == 4 || i.type == 5) {
              record = i.retail
            }
            list.push(
              <AtListItem
              title={record.product.name + ' x ' + record.quantity}
              note={fmtDate(i.createdAt)}
              extraText={i.amount / 100}
              className='list-item'
              />
            )
          }
          this.setState({rewardList: list})
        })
      }
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }

  render () {
    let tabList = [
        { title: '佣金明细' },
        { title: '我的介绍' },
    ]
    return (
      <View className='referral'>
      <View className='p-3'>
      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>我的佣金</View>
      <View className='number'>{this.state.reward / 100}</View>
      </View>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>
      </View>
      </View>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
          <AtList>
          { this.state.rewardList}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
          <AtList>
          { this.state.refList}
          </AtList>
        </AtTabsPane>
      </AtTabs>

      <View className='fixed'>
      { this.state.seg == 1 &&
        <Button className='btn btn-primary' onClick={() => this.navTo('poster')}>我的海报</Button>
      }
      </View>

      </View>
    )
  }
}
