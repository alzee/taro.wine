import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker, Icon } from '@tarojs/components'

export default class Bindorgadmin extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  uid: int  //uid of whom was scanned
  state = {
    name: '', //name of whom was scanned
    // types: ['代理商', '门店', '餐厅', '代理商(异业)', '区域代理商(异业)', '门店(异业)'],
    types: [],
    typeIndex: undefined,
    orgIndex: undefined,
    orgs: [],
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.uid = params.uid
    Taro.request({
      url: Env.apiUrl + 'choices/org_types',
    }).then((res) =>{
      this.setState({
        types: res.data
      })
    })

    this.setState({
      name: params.name
    })
  }

  getOrgs(typeId: int){
    Taro.request({
      url: Env.apiUrl + 'orgs?type=' + typeId,
    }).then((res) =>{
      this.setState(
        {
          orgs: res.data,
          orgIndex: undefined
        }
      )
    })
  }

  typeChanged = e => {
    let typeIndex  = Number(e.detail.value)
    this.setState({
      typeIndex,
      oid: undefined
    })
    this.getOrgs(this.state.types[typeIndex].id)
  }

  orgChanged = e => {
    let orgIndex = Number(e.detail.value)
    let org = this.state.orgs[orgIndex]
    this.setState({
      orgIndex,
      oid: this.state.orgs[orgIndex].id
    })
  }

  formSubmit = e => {
    let data = {}
    if (this.state.oid === undefined) {
      Taro.showToast({
        title: '请选择商家',
        icon: 'error',
        duration: 2000
      })
      return
    }
    data.uid = this.uid
    data.oid = this.state.oid
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'org/admin/bind',
      success: function (res) { }
    }).then((res) =>{
      if (res.data.code === 0) {
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
      }
    })
  }

  render () {
    return (
      <View className='bindOrgAdmin'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      { this.state.types &&
      <Picker mode='selector' range={this.state.types} rangeKey='value' onChange={this.typeChanged}>
      <View className='input'>
      <Text className='label'>商家类型</Text>
      {this.state.typeIndex !== undefined && this.state.types[this.state.typeIndex].value}
      </View>
      </Picker>
      }
      { this.state.orgs &&
      <Picker mode='selector' range={this.state.orgs} rangeKey='name' onChange={this.orgChanged}>
      <View className='input'>
      <Text className='label'>选择商家</Text>
      {this.state.orgIndex !== undefined && this.state.orgs[this.state.orgIndex].name}
      </View>
      </Picker>
      }
      <View className='notice'>
      <View className='title'> <Icon size='30' type='warn' /> <Text className='text'>重要提示！</Text></View>
      <View className='info'>正在将用户 {this.state.name} 绑定为机构管理员。</View>
      <View className='info'>完成后用户 {this.state.name} 须重新登录。</View>
      <View className='info'>每个机构只能有一个管理员。</View>
      </View>
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
