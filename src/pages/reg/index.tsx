import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Reg extends Component<PropsWithChildren> {
  state = {
    selector: ['门店', '代理商', '代理商(异业)', '区域代理商(异业)', '门店(异业)'],
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
      className='phony-input'
      extraText={this.state.selectorChecked}
      />
      </AtList>
      </Picker>
      <View className='input'>
        <Text className='label'>
          单位名称
        </Text>
        <Input 
          name='orgName' 
          type='text' 
          placeholder='' 
        />
      </View>
      <View className='input'>
        <Text className='label'>
          联系人
        </Text>
        <Input 
          name='name' 
          type='text' 
          placeholder='姓名' 
        />
      </View>
      <View className='input'>
        <Text className='label'>
          电话
        </Text>
        <Input 
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
      </View>
      <View className='input'>
        <Text className='label'>
          地址
        </Text>
        <Input 
          name='address' 
          type='text' 
          placeholder='' 
        />
      </View>
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
