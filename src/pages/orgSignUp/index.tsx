import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"

export default class Orgsignup extends Component<PropsWithChildren> {
  state = {
    types: ['门店', '餐厅', '区域代理商(异业)', '门店(异业)'],
    typeSelected: '',
  }

  getAgencies(typeId: int){
    Taro.request({
      url: Env.apiUrl + 'orgs?type=' + typeId,
    }).then((res) =>{
      console.log(res.data)
      let agencies = []
      for (let i of res.data) {
        agencies.push(i.name)
      }
      this.setState(
        {
          agencies,
          agencySelected: agencies[0]
        }
      )
    })
  }

  componentDidMount () {
  }

  typeChanged = e => {
    this.setState({
      typeSelected: this.state.types[e.detail.value],
    })
    let typeId: int
    let agencyType: int
    switch (Number(e.detail.value)) {
      case 0:
        typeId = 2
        agencyType = 1
      break
      case 1:
        typeId = 3
        agencyType = 1
      break
      case 2:
        typeId = 11
        agencyType = 10
      break
      case 3:
        typeId = 12
        agencyType = 11
      break
    }
    this.setState({ typeId, agencyType })
    this.getAgencies(agencyType)
  }

  agencyChanged = e => {
    this.setState({
      agencySelected: this.state.agencies[e.detail.value],
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    data.type = Number(this.state.typeId)
    data.upstream = Number(this.state.agencyType)
    if (isNaN(data.type)) {
      Taro.showToast({
        title: '请选择类型',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (isNaN(data.type)) {
      Taro.showToast({
        title: '请选择代理商',
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
      if (res.data.code === 1) {
        Taro.showToast({
          title: '用户名已存在',
          icon: 'error',
          duration: 2000,
          success: () => { }
        })
        return
      }
      if (res.data.code === 0) {
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
      }
    })
  }

  render () {
    return (
      <View className='orgSignUp'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Picker mode='selector' range={this.state.types} onChange={this.typeChanged}>
      <AtList>
      <AtListItem
      title='类型'
      className='picker'
      extraText={this.state.typeSelected}
      />
      </AtList>
      </Picker>
      <Picker mode='selector' range={this.state.agencies} onChange={this.agencyChanged}>
      <AtList>
      <AtListItem
      title='代理商'
      className='picker'
      extraText={this.state.agencySelected}
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
