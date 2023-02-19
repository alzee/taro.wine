import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './bottle.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {

  componentDidMount () {
  }

  render () {
    return (
      <View className='scan-bottle'>
      </View>
    )
  }
}
