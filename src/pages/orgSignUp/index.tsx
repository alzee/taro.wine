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
      selectorChecked: this.state.selector[e.detail.value],
      type: e.detail.value
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    data.type = Number(this.state.type)
    console.log(data)
    if (isNaN(data.type)) {
      Taro.showToast({
        title: '请选择类型',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let label = {
      username: '用户名',
      name: '名称',
      contact: '联系人',
      phone: '电话',
      address: '地址',
      plainPassword: '新密码',
      confirmPass: '密码确认',
      district: '区域',
    }
    for (let i in data) {
      if (data[i] === "") {
        console.log(i)
        console.log(data[i])
        Taro.showToast({
          title: '请填写 ' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if (data['username'].length < 6) {
      Taro.showToast({
        title: '用户名6位以上',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data['confirmPass'] !== data['plainPassword']) {
      Taro.showToast({
        title: '密码不一致',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data['plainPassword'].length < 6) {
      Taro.showToast({
        title: '密码须6位以上',
        icon: 'error',
        duration: 2000
      })
      return
    }
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'create-user-org',
      success: function (res) { }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              // Taro.reLaunch({url: '/pages/org/index'})
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
        <AtInput 
        title='用户名'
        className="input"
        required
          name='username' 
          type='text' 
          placeholder='用户名' 
        />
        <AtInput 
        title='新密码'
        className="input"
        required
          name='plainPassword' 
          type='password' 
          placeholder='新密码' 
        />
        <AtInput 
        title='密码确认'
        className="input"
        required
          name='confirmPass' 
          type='password' 
          placeholder='密码确认' 
        />
        <AtInput 
        title='店面名称'
        className="input"
        required
          name='name' 
          type='text' 
          placeholder='名称' 
        />
        <AtInput 
        title='联系人'
        className="input"
        required
          name='contact' 
          type='text' 
          placeholder='联系人' 
        />
        <AtInput 
        title='电话'
        className="input"
        required
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
        <AtInput 
        title='区域'
        className="input"
        required
          name='district' 
          type='text' 
          placeholder='区域' 
        />
        <AtInput 
        title='地址'
        className="input"
        required
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
