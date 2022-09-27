import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Chooselogin extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }
  toLoginPage() {
    Taro.navigateTo({ url: '/pages/login/index' })
    // Taro.redirectTo({ url: '/pages/wxlogin/index' })
  }

  wxlogin() {
    Taro.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          Taro.request({
            method: 'POST',
            url: Env.apiUrl + 'consumer_login',
            data: {
              code: res.code
            }
          }).then((res) => {
            console.log(res)
            Taro.setStorage({
              key: Env.storageKey,
              data: res.data
            });
            // Taro.switchTab({ url: '/pages/me/index' })
            Taro.reLaunch({ url: '/pages/me/index' })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    console.log('fuck');
  }

  render () {
    return (
      <View className='chooseLogin'>
      <AtButton className="btn" onClick={this.wxlogin}>微信登录</AtButton>
      <Text className="text" onClick={this.toLoginPage}>机构登录</Text>
      </View>
    )
  }
}
