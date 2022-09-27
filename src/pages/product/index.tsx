import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Product extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='product'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
