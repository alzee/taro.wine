import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orgedit extends Component<PropsWithChildren> {
  role: int
  oid: int
  org = {}

  componentWillMount () { }

  componentDidMount () {
    self = this
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.role = res.data.role
        this.oid = res.data.org.id
        Taro.request({
          url: Env.apiUrl + 'orgs/' + this.oid,
          success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          this.org = res.data
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      name: '名称',
      contact: '联系人',
      phone: '电话',
      address: '地址',
      district: '区域',
    }
    for (let i in data) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请填写 ' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    console.log(data)
    Taro.request({
      method: 'PATCH',
      data: data,
      url: Env.apiUrl + 'orgs/' + this.oid,
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
      <View className='orgEdit main'>
      { this.state &&
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Text className='label'>名称</Text>
        <Input 
        className="input"
        required
          name='name' 
          type='text' 
          placeholder='名称' 
          value={this.org.name}
        />
      <Text className='label'>联系人</Text>
        <Input 
        className="input"
          name='contact' 
          type='text' 
          placeholder='联系人' 
          value={this.org.contact}
        />
      <Text className='label'>电话</Text>
        <Input 
        className="input"
          name='phone' 
          type='number' 
          placeholder='电话' 
          value={this.org.phone}
        />
      <Text className='label'>地址</Text>
        <Input 
        className="input"
          name='address' 
          type='text' 
          placeholder='地址' 
          value={this.org.address}
        />
      <Text className='label'>地区</Text>
        <Input 
        className="input"
          name='district' 
          type='text' 
          placeholder='地区' 
          value={this.org.district}
        />
        <Button type='primary' formType='submit'>保存</Button>
      </Form>
      }
      </View>
    )
  }
}
