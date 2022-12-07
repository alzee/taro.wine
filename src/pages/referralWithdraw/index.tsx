import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Referralwithdraw extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='referralWithdraw'>
      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>0</View>
      </View>

      <View className='at-col'>
      <View className='label'>提现中</View>
      <View className='number'>0</View>
      </View>
      </View>
      </View>
    )
  }
}
