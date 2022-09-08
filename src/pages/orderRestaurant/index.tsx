import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Orderrestaurant extends Component<PropsWithChildren> {

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
      <View className='orderRestaurant'>
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
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          <AtListItem
          title='餐厅订单号 12345'
          note='2022-09-05 19:05:05'
          extraText='代金券 50'
          />
          </AtList>
      </View>
    )
  }
}
