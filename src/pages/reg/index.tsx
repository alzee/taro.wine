import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Reg extends Component<PropsWithChildren> {
  state = {
    selector: ['门店', '代理商', '合伙人', '总代', '区代'],
    selectorChecked: '',
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({
          cid: res.data.cid
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  pickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
      type: e.detail.value
    })
  }

  formSubmit (e) {
    let data = e.detail.value
    data.type = Number(this.state.type)
    if (isNaN(data.type)) {
      Taro.showToast({
        title: '请选择类型',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let label = {
      name: '姓名',
      phone: '电话',
    }
    for (let i in data) {
      if (data[i] === "") {
        Taro.showToast({
          title: '请填写 ' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }

    data.submitter = '/api/consumers/' + this.state.cid
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'regs',
      success: function (res) { }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.reLaunch({url: '/pages/me/index'})
            }, 500
          )
        }
      })
    })
  }

  render () {
    return (
      <View className='reg'>
      <Form className='form'
      onSubmit={this.formSubmit.bind(this)}
      >
      <Picker mode='selector' range={this.state.selector} onChange={this.pickerChange}>
      <AtList>
      <AtListItem
      title='类型'
      className='picker'
      extraText={this.state.selectorChecked}
      />
      </AtList>
      </Picker>
        <AtInput 
          className="input"
          title='姓名'
          name='name' 
          type='text' 
          placeholder='姓名' 
          required
        />
        <AtInput 
          className="input"
          title='电话'
          name='phone' 
          type='number' 
          placeholder='电话' 
          required
        />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
