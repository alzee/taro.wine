import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  scan = {}
  roles: array
  otype: int

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
        this.otype = res.data.org.type
        switch (this.scan.t) {
          case "0": // box
            if (this.scan.action === 'ret') {
              Taro.redirectTo({url: '/pages/scan/ret?' + q})
            } else if (this.scan.action === 'stockout') {
              Taro.redirectTo({url: '/pages/scan/storeman?' + q})
            } else {
              Taro.redirectTo({url: '/pages/scan/box?' + q})
            }
            break
          case '1': // bottle
            Taro.redirectTo({url: '/pages/scan/bottle?' + q})
            break
          case "2": // user qr
            console.log('userqr scanned. action: ' + this.scan.action);
            if (this.scan.action === undefined) {
              if (this.otype !== 3 && this.otype !== 12) {
                Taro.switchTab({url: '/pages/index/index'})
              } else {
                Taro.redirectTo({url: '/pages/dineNew/index?' + q})
              }
            } else {
              console.log('redirectTo: ' + this.scan.action)
              Taro.redirectTo({url: `/pages/${this.scan.action}/index?${q}`})
            }
            break
          case '3': // claim
            Taro.redirectTo({url: '/pages/claimSettle/index?' + q})
            break
          case '4': // settle
            if (this.roles.includes('ROLE_STOREMAN')) {
              Taro.redirectTo({url: '/pages/settle/settle?' + q})
            } else {
              Taro.switchTab({url: '/pages/index/index'})
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
