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

  componentWillMount () { }

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
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={2}>
        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
}
