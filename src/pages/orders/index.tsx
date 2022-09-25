import { Component, PropsWithChildren } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import type CustomTabBar from '../../custom-tab-bar'

export default class Orders extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx)
    tabbar?.setSelected(2)
  }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick1 (value) {
    this.setState({
      current: value
    })
  }

  handleClick () {
    Taro.navigateBack()
  }

  render () {
    const tabList = [{ title: '进货' }, { title: '销售' }, {title: '我的退货'}, {title: '销售退货'}, {title: '零售退货'}]
    return (
      <View className='orders'>
      <AtTabs scroll className='first' current={this.state.current} tabList={tabList} onClick={this.handleClick1.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
        <AtButton className='new-btn' type='secondary' size='small'>新增销售</AtButton>
          <AtList className="list">
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          </AtList>
        </AtTabsPane>
        </AtTabs>


      </View>
    )
  }
}
