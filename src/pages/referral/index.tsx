import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Referral extends Component<PropsWithChildren> {
  state = {
    current: 1,
    seg: 0,
  }

  componentWillMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let cid = res.data.cid
        let list
        Taro.request({
          // url: Env.apiUrl + 'consumers?referrer=' + cid,
          url: Env.apiUrl + 'consumers?referrer=' + 55,
          // success: function (res) { that.setState({data: res.data}) }
        }).then((res) =>{
          list = []
          for (let i of res.data) {
            // console.log(i)
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
          this.setState({list1: list})
        })

        Taro.request({
          // url: Env.apiUrl + 'refretail/' + cid,
          url: Env.apiUrl + 'refretail/' + 55,
        }).then((res) =>{
          console.log(res.data)
          list = []
          for (let i of res.data) {
            // console.log(i)
            list.push(
              <AtListItem
              title={i.product.name}
              note={i.quantity}
              extraText={i.amount / 100}
              className='list-item'
              />
            )
          }
          this.setState({list2: list})
        })
      }
    })

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }

  render () {
    let tabList = [
        { title: '我推荐的' },
        { title: '分销订单' },
    ]
    return (
      <View className='referral'>
      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
          <AtList>
          { this.state.list1}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
          <AtList>
          { this.state.list2}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
}
