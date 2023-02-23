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
    // console.log(q);
    let arr = q.split('&')
    for (let i of arr) {
      let arri = i.split('=')
      this.scan[arri[0]] = arri[1]
    }

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.roles = res.data.roles
        // this.roles = [...this.roles, 'ROLE_STOREMAN']
        switch (this.scan.t) {
          case "0":
            if (this.roles.includes('ROLE_STOREMAN')) {
              console.log('storeman')
              Taro.redirectTo({url: '/pages/scan/storeman?' + q})
            } else {
              Taro.redirectTo({url: '/pages/scan/box?' + q})
            }
            break
          case '1':
            Taro.redirectTo({url: '/pages/scan/bottle?' + q})
            break
          case "2":
            Taro.redirectTo({url: '/pages/orgSignUp/index'})
            break
          case "3":
            // user qr
            if (this.scan.action === undefined) {
              Taro.redirectTo({url: '/pages/dineNew/index'})
            }
            if (this.scan.action === 0) {
              Taro.redirectTo({url: '/pages/bindOrgAdmin/index'})
            }
            if (this.scan.action === 1) {
              Taro.redirectTo({url: '/pages/addStaff/index'})
            }
            if (this.scan.action === 2) {
              Taro.redirectTo({url: '/pages/waiterSignUp/index'})
            }
            break
        }
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
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
