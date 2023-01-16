import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button} from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Chkphone extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    const phone = e.detail.value.phone
    
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'chkphone',
      data: {phone}
    }).then((res) => {
      // console.log(res.data)
      if (res.data.code == 0) {
        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'sms',
          data: {phone}
        }).then((res) => {
          Taro.navigateTo({url: '/pages/chkOTP/index?phone=' + phone})
        })
      } else {
        Taro.showToast({
          title: '手机号不存在',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }

  render () {
    return (
      <View className='chkPhone'>
      <Text>请输入绑定的手机号</Text>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
          name='phone' 
          type='text' 
          placeholder='手机号' 
        />
        <Button className='btn' formType='submit'>确认</Button>
      </Form>
      </View>
    )
  }
}
