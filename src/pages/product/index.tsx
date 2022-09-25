import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import type CustomTabBar from '../../custom-tab-bar'
import { Env } from '../../env/env'

export default class Product extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx)
    tabbar?.setSelected(0)
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
