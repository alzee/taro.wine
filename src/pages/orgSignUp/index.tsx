import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import {  AtList, AtListItem } from "taro-ui"

export default class Orgsignup extends Component<PropsWithChildren> {
  state = {
    types: ['门店', '餐厅', '区域代理商(异业)', '门店(异业)'],
    agencyList: []
  }

  getAgencies(typeId: int){
    Taro.request({
      url: Env.apiUrl + 'orgs?type=' + typeId,
    }).then((res) =>{
      let agencyList = []
      for (let i of res.data) {
        agencyList.push(i.name)
      }
      this.setState(
        {
          agencies: res.data,
          agencyList,
          agencySelected: undefined
        }
      )
    })
  }

  componentDidMount () {
  }

  typeChanged = e => {
    let typeSelected  = Number(e.detail.value)
    let typeId: int
    let agencyType: int
    switch (typeSelected) {
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
    this.setState({ typeSelected, typeId, agencyType })
    this.getAgencies(agencyType)
  }

  agencyChanged = e => {
    this.setState({
      agencySelected: Number(e.detail.value),
    })
  }

  formSubmit = e => {
    console.log(e);
    let data = e.detail.value
    data.type = Number(this.state.typeId)
    if (isNaN(data.type)) {
      Taro.showToast({
        title: '请选择类型',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.state.agencySelected === undefined) {
      Taro.showToast({
        title: '请选择代理商',
        icon: 'error',
        duration: 2000
      })
      return
    }
    data.upstreamId = this.state.agencies[this.state.agencySelected].id
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
      { this.state.types &&
      <Picker mode='selector' range={this.state.types} onChange={this.typeChanged}>
      <AtList>
      <AtListItem
      title='请选择类型'
      className='first'
      extraText={this.state.types[this.state.typeSelected]}
      />
      </AtList>
      </Picker>
      }
      { this.state.agencyList &&
      <Picker mode='selector' range={this.state.agencyList} onChange={this.agencyChanged}>
      <AtList>
      <AtListItem
      title='请选择代理商'
      className=''
      extraText={this.state.agencyList[this.state.agencySelected]}
      />
      </AtList>
      </Picker>
      }
        <Input 
        title='用户名'
        className="input"
        required
          name='username' 
          type='text' 
          placeholder='用户名' 
        />
        <Input 
        title='新密码'
        className="input"
        required
          name='plainPassword' 
          type='password' 
          placeholder='新密码' 
        />
        <Input 
        title='密码确认'
        className="input"
        required
          name='confirmPass' 
          type='password' 
          placeholder='密码确认' 
        />
        <Input 
        title='店面名称'
        className="input"
        required
          name='name' 
          type='text' 
          placeholder='名称' 
        />
        <Input 
        title='联系人'
        className="input"
        required
          name='contact' 
          type='text' 
          placeholder='联系人' 
        />
        <Input 
        title='电话'
        className="input"
        required
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
        <Input 
        title='区域'
        className="input"
        required
          name='district' 
          type='text' 
          placeholder='区域' 
        />
        <Input 
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
