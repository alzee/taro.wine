import { Component, PropsWithChildren } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Orders extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;

  componentWillMount () { }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  scan(){
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        let data = res.result
        Taro.navigateTo({url: '/pages/retailNew/index?data=' + data})
      }
    })
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick1 (value) {
    console.log(value)
    this.setState({
      current: value
    })
  }

  render () {
    let tabList = []
    switch (this.role) {
      case 0:
        tabList = [{ title: '销售' }, {title: '售后退货'}]
        break
      case 1:
        tabList = [{ title: '进货' }, { title: '销售' }, {title: '我的退货'}, {title: '售后退货'}]
        break
      case 2:
        tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}]
        break
      case 3:
        tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}, {title: '餐饮'}]
        break
      case 4:
        tabList = [{title: '买酒'}, {title: '餐饮'}]
        break
    }

    return (
      <View className='orders'>

      <AtTabs scroll className='first' current={this.state.current} tabList={tabList} onClick={this.handleClick1.bind(this)}>

        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          <AtListItem
          title='代理商-请货'
          note='2022-09-05 19:05:05'
          extraText='50'
          />
          </AtList>
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={1} >
        <AtButton className='new-btn' type='secondary' size='small'>新增销售</AtButton>
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={2} >
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={3} >
        <AtButton className='new-btn' type='secondary' size='small'>新增销售退货</AtButton>
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={4} >
        <AtButton className='new-btn' type='secondary' size='small' onClick={this.scan}>新增零售</AtButton>
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={5} >
        <AtButton className='new-btn' type='secondary' size='small'>新增零售退货</AtButton>
        </AtTabsPane>

        </AtTabs>

      </View>
    )
  }
}
