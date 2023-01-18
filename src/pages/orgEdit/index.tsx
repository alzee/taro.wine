import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orgedit extends Component<PropsWithChildren> {
  role: int
  oid: int
  state = {}

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
          success: function (res) { self.setState({org: res.data}) }
        }).then((res) =>{
          console.log(res.data);
        })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      // name: '名称',
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
    // console.log(data)
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
      { this.state.org &&
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <AtInput 
          title='名称'
          className="input"
          required
          // name='name' 
          type='text' 
          value={this.state.org.name}
          disabled
        />
        <AtInput 
          title='联系人'
          className="input"
          name='contact' 
          type='text' 
          placeholder='联系人' 
          required
          value={this.state.org.contact}
        />
        <AtInput 
          title='电话'
          className="input"
          name='phone' 
          type='number' 
          placeholder='电话' 
          required
          value={this.state.org.phone}
        />
        <AtInput 
          title='地址'
          className="input"
          name='address' 
          type='text' 
          placeholder='地址' 
          required
          value={this.state.org.address}
        />
        <AtInput 
          title='地区'
          className="input"
          name='district' 
          type='text' 
          placeholder='地区' 
          required
          value={this.state.org.district}
        />
        <AtInput 
          title='收款人'
          className="input"
          name='payee' 
          type='text' 
          required
          value={this.state.org.payee}
        />
        <AtInput 
          title='开户行'
          className="input"
          name='bank' 
          type='text' 
          required
          value={this.state.org.bank}
        />
        <AtInput 
          title='收款账号'
          className="input"
          name='bankAccount' 
          type='text' 
          required
          value={this.state.org.bankAccount}
        />
        <AtInput 
          title='开户行地址'
          className="input"
          name='bankAddr' 
          type='text' 
          required
          value={this.state.org.bankAddr}
        />
        <Button className='btn' formType='submit'>保存</Button>
      </Form>
      }
      </View>
    )
  }
}
