import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Input, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Reg extends Component<PropsWithChildren> {
  state = {
    selector: ['代理商', '门店', '餐厅', '代理商(异业)', '区域代理商(异业)', '门店(异业)'],
    selectorChecked: '',
    pca: ['湖北省', '十堰市', '茅箭区']
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({
          uid: res.data.uid
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  pcaChange = (e) => {
    this.setState({
      pca: e.detail.value,
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

    data.submitter = '/api/users/' + this.state.uid
    data.area = this.state.pca[0] + this.state.pca[1] + this.state.pca[2]
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
      <View className='input'>
      <Text className='label'>请选择类型</Text>
      {this.state.selectorChecked}
      </View>
      </Picker>
      <View className='input'>
      <Text className='label'>单位名称</Text>
      <Input 
        name='orgName' 
        type='text' 
      />
      </View>
      <View className='input'>
      <Text className='label'>联系人</Text>
      <Input 
        name='name' 
        type='text' 
      />
      </View>
      <View className='input'>
      <Text className='label'>电话</Text>
      <Input 
        name='phone' 
        type='number' 
      />
      </View>
      <Picker mode='region' onChange={this.pcaChange} value={this.state.pca}>
      <View className='input'>
      <Text className='label'>地区</Text>
      {
        this.state.pca[0]
        + ' - ' +  this.state.pca[1]
        + ' - ' +  this.state.pca[2]
      }
      </View>
      </Picker>
      <View className='input'>
      <Text className='label'>详细地址</Text>
      <Input 
        name='address' 
        type='text' 
      />
      </View>
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
