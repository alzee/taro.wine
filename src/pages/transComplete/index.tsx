import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

export default class TransComplete extends Component<PropsWithChildren> {

  componentDidMount () { }

  naviBack(){
    // Taro.redirectTo({ url: '/pages/me/index' })
    Taro.navigateBack({
      delta: 1
    })
  }

  render () {
    return (
      <View className='paid p-3'>
        <View className='text'>交易完成</View>
        <Button className='btn' onClick={this.naviBack}>确认</Button>
      </View>
    )
  }
}
