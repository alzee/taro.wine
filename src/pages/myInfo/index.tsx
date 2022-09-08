import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Myinfo extends Component<PropsWithChildren> {

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
      <View className='myInfo'>
        <AtNavBar
          onClickRgIconSt={this.handleClick}
          onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.handleClick}
          color='#000'
          leftIconType='chevron-left'
          fixed
        />
          <AtList className="list first">
          <AtListItem
          title='昵称'
          extraText='Tom'
          arrow='right'
          />
          <AtListItem
          title='头像'
          arrow='right'
          />
          <AtListItem
          title='ID'
          extraText='55'
          arrow='right'
          />
          </AtList>
		<AtButton className='btn' type='secondary' size='small'>退出登录</AtButton>
      </View>
    )
  }
}
