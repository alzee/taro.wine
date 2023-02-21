import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Navigator } from '@tarojs/components'
import './index.scss'
import { AtForm, AtButton, AtInput, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Login extends Component<PropsWithChildren> {

  formSubmit = e => {
    let username = e.detail.value
    let password = e.detail.password
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'login',
      data: e.detail.value
    }).then((res) => {
      if (res.data.code == 0) {
        Taro.setStorage({
          key: Env.storageKey,
          data: res.data.data
        })
        Taro.reLaunch({ url: '/pages/me/index' })
      } else {
        // toast: wrong password
        console.log('wrong')
        Taro.showToast({
          title: '用户名或密码错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  render () {
    return (
      <View className='login'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
          name='username' 
          type='text' 
          placeholder='用户名' 
        />
        <Input 
        className="input"
          name='password' 
          type='password' 
          placeholder='密码' 
        />
        <Navigator className='nav' url='/pages/chkPhone/index'>忘记密码？</Navigator>
        <Button className='btn' formType='submit'>登录</Button>
      </Form>
      </View>
    )
  }
}
