import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Input } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class User extends Component<PropsWithChildren> {
  role: int
  uid: int
  state = {}

  componentDidMount () {
    self = this
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data);
        this.uid = res.data.uid
        Taro.request({
          url: Env.apiUrl + 'users/' + this.uid,
          success: function (res) { }
        }).then((res) =>{
          console.log(res.data)
          self.setState({
            user: res.data
          })
        })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      phone: '电话',
    }
    for (let i in label) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请填写 ' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    // console.log(data)
    Taro.request({
      method: 'PATCH',
      data: data,
      url: Env.apiUrl + 'users/' + this.uid,
      header: {
        'content-type': 'application/merge-patch+json'
      },
      success: function (res) { }
    }).then((res) =>{
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
    })
  }

  render () {
    return (
      <View className='user p-3'>
      { this.state.user &&
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <View className='input'>
        <Text className='label'>机构</Text>
        <Input 
          type='text' 
          value={this.state.user.org.name}
          disabled
        />
        </View>
        <View className='input'>
        <Text className='label'>用户名</Text>
        <Input 
          type='text' 
          value={this.state.user.username}
          disabled
        />
        </View>
        <View className='input'>
        <Text className='label'>电话</Text>
        <Input 
          name='phone' 
          type='number' 
          value={this.state.user.phone}
        />
        </View>
        <Button className='btn' formType='submit'>保存</Button>
      </Form>
      }
      </View>
    )
  }
}
