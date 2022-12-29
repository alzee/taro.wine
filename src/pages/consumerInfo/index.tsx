import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker, Checkbox, CheckboxGroup, Navigator } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'
import { AtCheckbox } from 'taro-ui'

export default class Consumerinfo extends Component<PropsWithChildren> {
  cid: int
  storageData = {}
  state = {
    btnDisabled: true
  }

  componentWillMount () { }

  componentDidMount () { 
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.cid = res.data.cid
        this.storageData = res.data
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value

    if (data.name == '') {
      Taro.showToast({
        title: '请填写姓名',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.phone == '') {
      Taro.showToast({
        title: '请填写电话',
        icon: 'error',
        duration: 2000
      })
      return
    }
    console.log(data)

    // return
    this.storageData.name = data.name
    this.storageData.phone = data.phone
    Taro.setStorage({
      key: Env.storageKey,
      data: this.storageData
    });
    Taro.request({
      method: 'PATCH',
      data: data,
      url: Env.apiUrl + 'consumers/' + this.cid,
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
              Taro.reLaunch({url: '/pages/me/index'})
            }, 500
          )
        }
      })
    })
  }

  checkboxChange(e){
    let s
    if (e.detail.value[0] == 'checked') {
      s = false
    } else {
      s = true
    }
    this.setState({
      btnDisabled: s
    })
  }

  render () {
    return (
      <View className='consumerInfo main'>
      <View className='hint'>
      <Text>请完善姓名及电话</Text>
      </View>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
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
        <View className='d-flex'>
        <CheckboxGroup onChange={this.checkboxChange.bind(this)}>
        <Checkbox value='checked'></Checkbox>
        </CheckboxGroup>
        我已阅读并同意<Navigator url='/pages/node/policy'>《用户协议》</Navigator>
        </View>
        <Button type='primary' formType='submit' disabled={this.state.btnDisabled}>提交</Button>
      </Form>
      </View>
    )
  }
}
