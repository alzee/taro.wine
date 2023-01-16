import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"

export default class Orgsignup extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  type: int
  role: int
  oid: int
  state = {
    selector: ['门店', '餐厅'],
    selectorChecked: '',
  }

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  pickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
    this.type = e.detail.value
  }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      username: '用户名',
      name: '名称',
      contact: '联系人',
      phone: '电话',
      address: '地址',
      oldPass: '原密码',
      plainPassword: '新密码',
      confirmPass: '密码确认',
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
    if (this.role == 0) {
      data.type = 1
    } else {
      data.type = Number(this.type) + 2
    }
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'orgs',
      success: function (res) { }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.reLaunch({url: '/pages/org/index'})
            }, 500
          )
        }
      })
    })
  }

  render () {
    return (
      <View className='orgSignUp'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Picker mode='selector' range={this.state.selector} onChange={this.pickerChange}>
      <AtList>
      <AtListItem
      title='类型'
      extraText={this.state.selectorChecked}
      />
      </AtList>
      </Picker>
        <Input 
        className="input"
        required
          name='username' 
          type='text' 
          placeholder='用户名' 
        />
        <Input 
        className="input"
          name='plainPassword' 
          type='password' 
          placeholder='新密码' 
        />
        <Input 
        className="input"
          name='confirmPass' 
          type='password' 
          placeholder='密码确认' 
        />
        <Input 
        className="input"
        required
          name='name' 
          type='text' 
          placeholder='名称' 
        />
        <Input 
        className="input"
          name='contact' 
          type='text' 
          placeholder='联系人' 
        />
        <Input 
        className="input"
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
        <Input 
        className="input"
          name='address' 
          type='text' 
          placeholder='地址' 
        />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
