import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  scan = {}

  onLoad(query) {
    let q = decodeURIComponent(query.q)
    q = q.replace(Env.wxqrUrl + '?', '')
    let arr = q.split('&')
    for (let i of arr) {
      let arri = i.split('=')
      this.scan[arri[0]] = arri[1]
    }
    console.log(this.scan)
    switch (this.scan.t) {
      case "0":
        Taro.redirectTo({url: '/pages/scan/box'})
        break
      case '1':
        Taro.redirectTo({url: '/pages/scan/bottle'})
        break
      case "2":
        Taro.redirectTo({url: '/pages/orgSignUp/index'})
        break
      case "3":
        Taro.redirectTo({url: '/pages/waiterSignUp/index'})
        break
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <View className='scan'>
      </View>
    )
  }
}
