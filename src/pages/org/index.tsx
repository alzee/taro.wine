import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Org extends Component<PropsWithChildren> {

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      seg: 0,
    }
  }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }
  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }
  switchTab (value) {
    if (value == this.state.current) {
      return;
    }
    // this.setState({
    //   current: value
    // })
    let i: string;
    switch (value) {
      case 0:
        i = 'index';
        break;
      case 1:
        i = 'org';
        break;
      case 2:
        i = 'me';
        break;
      case 3:
        i = 'me';
        break;
      case 4:
        i = 'me';
        break;
    }
    this.navTo(i);
  }

  render () {
      const tabList = [
        // { title: '代理商' },
        { title: '门店' },
        { title: '餐厅' }]
    return (
      <View className='org'>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
      {
        /*
        <AtTabsPane current={this.state.seg} index={0} >
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
       */
      }
        <AtTabsPane current={this.state.seg} index={0}>
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
        <AtTabsPane current={this.state.seg} index={1}>
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
