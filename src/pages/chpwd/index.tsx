import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Chpwd extends Component<PropsWithChildren> {
  uid: int

  componentWillMount () { }

  componentDidMount () {
    self = this
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.uid = res.data.uid
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      oldPass: '原密码',
      plainPassword: '新密码',
      confirmPass: '密码确认',
    }
    for (let i in data) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请填写' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if (data['confirmPass'] !== data['plainPassword']) {
      Taro.showToast({
        title: '输入不一致',
        icon: 'error',
        duration: 2000
      })
      return
    }
    data.uid = this.uid
    console.log(data)
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'chpwd',
      success: function (res) { }
    }).then((res) =>{
      console.log(res.data)
      if (res.data.code == 1) {
        Taro.showToast({
          title: '原密码错误',
          icon: 'error',
          duration: 2000,
        })
      }
      if (res.data.code == 0) {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.navigateBack()
              }, 500
            )
          }
        })
      }
    })
  }

  render () {
    return (
      <View className='chpwd main'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Text className='label'>原密码</Text>
        <Input 
        className="input"
        required
          name='oldPass' 
          type='password' 
          placeholder='原密码' 
        />
      <Text className='label'>新密码</Text>
        <Input 
        className="input"
          name='plainPassword' 
          type='password' 
          placeholder='新密码' 
        />
      <Text className='label'>密码确认</Text>
        <Input 
        className="input"
          name='confirmPass' 
          type='password' 
          placeholder='密码确认' 
        />
        <Button type='primary' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
