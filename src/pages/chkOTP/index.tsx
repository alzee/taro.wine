import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button} from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Chkotp extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    console.log(e.detail.value)
    let phone = this.instance.router.params.phone
    const otp = e.detail.value.otp
    
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'chkotp',
      data: {
        phone,
        otp
      }
    }).then((res) => {
      console.log(res.data)
      if (res.data.code == 0) {
        Taro.navigateTo({url: '/pages/resetPWD/index?phone=' + phone})
      } else {
        Taro.showToast({
          title: '验证码错误',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }

  render () {
    return (
      <View className='chkOTP'>
      <Text>已输入您收到的手机验证码</Text>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
          name='otp' 
          type='text' 
          placeholder='验证码' 
        />
        <Button type='primary' formType='submit'>确认</Button>
      </Form>
      </View>
    )
  }
}
