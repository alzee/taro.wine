import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  scan = {}

  onLoad(query) {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.role = res.data.role
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
    let q = decodeURIComponent(query.q)
    q = q.replace(Env.wxqrUrl + '?', '')
    // console.log(q);
    let arr = q.split('&')
    for (let i of arr) {
      let arri = i.split('=')
      this.scan[arri[0]] = arri[1]
    }
    switch (this.scan.t) {
      case "0":
        Taro.redirectTo({url: '/pages/scan/box?' + q})
        break
      case '1':
        Taro.redirectTo({url: '/pages/scan/bottle?' + q})
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
