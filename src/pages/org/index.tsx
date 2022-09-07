import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'

export default class Org extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
      const tabList = [{ title: '代理商' }, { title: '门店' }, { title: '餐厅' }]
    return (
      <View className='org'>

      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList>
          <AtListItem
          title='代理商1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='代理商2号'
          arrow='right'
          />
          <AtListItem
          title='代理商3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <AtList>
          <AtListItem
          title='门店1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='门店2号'
          arrow='right'
          />
          <AtListItem
          title='门店3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <AtList>
          <AtListItem
          title='餐厅1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='餐厅2号'
          arrow='right'
          />
          <AtListItem
          title='餐厅3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
