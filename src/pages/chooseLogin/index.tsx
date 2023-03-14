import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Chooselogin extends Component<PropsWithChildren> {
  state = {
    disabled: false
  }

  onLoad(query) {
    let uid = query.scene
    console.log('onLoad uid: ' + uid)
    this.setState({referrerId: uid})
  }

  componentDidMount () {}

  wxlogin() {
    let that = this
    this.setState({ disabled: true })
    Taro.login({
      success: function (res) {
        if (res.code) {
          let data = {
            code: res.code
          }
          console.log('state.referrerId: ' + that.state.referrerId)
          if (that.state.referrerId !== undefined) {
            data.referrerId = that.state.referrerId
          }
          Taro.request({
            method: 'POST',
            url: Env.apiUrl + 'wxlogin',
            data
          }).then((res) => {
            if (res.statusCode === 200) {
              Taro.setStorage({
                key: Env.storageKey,
                data: res.data
              });
              Taro.reLaunch({ url: '/pages/me/index' })
            } else {
              Taro.showToast({
                title: '系统错误',
                icon: 'error',
                duration: 2000
              })
              this.setState({ disabled: false })
              console.log('server error！' + res.errMsg)
            }
          })
        } else {
          this.setState({ disabled: false })
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  render () {
    return (
      <View className='chooseLogin main'>
      <Button className="btn" onClick={this.wxlogin.bind(this)} disabled={this.state.disabled}>微信登录</Button>
      </View>
    )
  }
}
