import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button} from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Resetpwd extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value
    // console.log(data)
    let phone = this.instance.router.params.phone

    for (let i in data) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请输入密码',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }

    if (data['pwd1'] !== data['pwd2']) {
      Taro.showToast({
        title: '输入不一致',
        icon: 'error',
        duration: 2000
      })
      return
    }
    data.phone = phone
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'resetpwd',
      data: data
    }).then((res) => {
      // console.log(res.data)
      if (res.data.code == 0) {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.reLaunch({url: '/pages/login/index'})
              }, 500
            )
          }
        })
      } else {
        Taro.showToast({
          title: '错误',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }

  render () {
    return (
      <View className='resetPWD'>
      <Text>请输入新密码</Text>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
          name='pwd1' 
          type='password' 
          placeholder='新密码' 
        />
        <Input 
        className="input"
          name='pwd2' 
          type='password' 
          placeholder='密码确认' 
        />
        <Button className='btn' formType='submit'>确认</Button>
      </Form>
      </View>
    )
  }
}
