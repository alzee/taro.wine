import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Orders extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick () {
    Taro.navigateBack()
  }

  render () {
    return (
      <View className='orders'>
        <AtNavBar
          onClickRgIconSt={this.handleClick}
          onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.handleClick}
          color='#000'
          leftIconType='chevron-left'
          fixed
        />
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
      </View>
    )
  }
}
