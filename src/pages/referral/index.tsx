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
    reward: 0,
    withdrawable: 0
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let uid = res.data.uid
        Taro.request({
          url: Env.apiUrl + 'users/' + uid,
        }).then((res) =>{
          this.setState({
            reward: res.data.reward,
            withdrawable: res.data.withdrawable
          })
        })

        let list = []
        Taro.request({
          url: Env.apiUrl + 'users?referrer=' + uid,
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
          url: Env.apiUrl + 'orgs?referrer=' + uid,
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
          url: Env.apiUrl + 'rewards?&referrer=' + uid,
        }).then((res) =>{
          list = []
          let record
          for (let i of res.data) {
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
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
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
        { title: '分销明细' },
        { title: '我的团队' },
    ]
    return (
      <View className='referral'>

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
