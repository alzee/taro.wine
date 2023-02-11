import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Chooselogin extends Component<PropsWithChildren> {
  state = {}

  onLoad(query) {
    let cid = query.scene
    console.log('onLoad cid: ' + cid)
    this.setState({referrerId: cid})
  }

  componentDidMount () {}

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }
  toLoginPage() {
    Taro.navigateTo({ url: '/pages/login/index' })
  }
  toOrgSignUp() {
    Taro.navigateTo({ url: '/pages/orgSignUp/index' })
  }

  wxlogin() {
    let that = this
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
            Taro.setStorage({
              key: Env.storageKey,
              data: res.data
            });
            Taro.reLaunch({ url: '/pages/me/index' })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  render () {
    return (
      <View className='chooseLogin main'>
      <Button className="btn" onClick={this.wxlogin.bind(this)}>用户登录</Button>
      <Button className="btn btn-primary" onClick={this.toLoginPage}>商家登录</Button>
      {/*
      <Button className="btn btn-outline-primary" onClick={this.toLoginPage}>商家登录</Button>
      <Button className="btn btn-primary" onClick={this.toOrgSignUp}>商家注册</Button>
      */}
      </View>
    )
  }
}
