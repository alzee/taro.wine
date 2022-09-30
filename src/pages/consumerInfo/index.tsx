import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Consumerinfo extends Component<PropsWithChildren> {
  cid: int

  componentWillMount () { }

  componentDidMount () { 
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.cid = res.data.cid
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value
    console.log(data)

    return
    Taro.request({
      method: 'PATCH',
      data: data,
      url: Env.apiUrl + 'orgs',
      header: {
        'content-type': 'application/merge-patch+json'
      }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.switchTab({url: '/pages/org/index'})
            }, 500
          )
        }
      })
    })
  }

  render () {
    return (
      <View className='consumerInfo'>
        <Input 
        className="input"
          name='name' 
          type='text' 
          placeholder='姓名' 
        />
        <Input 
        className="input"
          name='phone' 
          type='text' 
          placeholder='电话' 
        />
        <Button type='primary' formType='submit'>提交</Button>
      </View>
    )
  }
}
