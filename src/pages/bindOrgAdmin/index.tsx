import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker, Icon } from '@tarojs/components'

export default class Bindorgadmin extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  uid: int
  adminId: int  //uid of whom was scanned
  state = {
    name: '', //name of whom was scanned
    orgIndex: undefined,
    orgs: [],
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.adminId = params.uid
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      this.uid = res.data.id
    })

    this.setState({
      name: params.name
    })
  }

  orgChanged = e => {
    let orgIndex = Number(e.detail.value)
    let org = this.state.orgs[orgIndex]
    this.setState({
      orgIndex,
      oid: this.state.orgs[orgIndex].id,
      oname: this.state.orgs[orgIndex].name,
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
    data.adminId = this.adminId
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

  search = (e) => {
    let value = e.detail.value
    console.log(value)
    if (value.length === 0) {
      console.log('nothing to search')
      return
    }
    Taro.request({
      url: Env.apiUrl + 'orgs?name=' + value,
    }).then((res) =>{
      console.log(res.data);
      this.setState(
        {
          orgs: res.data,
          orgIndex: undefined,
          oname: value
        }
      )
    })
  }

  render () {
    return (
      <View className='bindOrgAdmin'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <View className='search-picker'>
      <View className='input'>
      <Text className='label'>商家</Text>
      <Input 
        name='oname' 
        type='text' 
        value={this.state.oname}
        onInput={(e) => {this.search(e)}}
      />
      </View>
      <Picker className='picker' mode='selector' range={this.state.orgs} rangeKey='name' onChange={this.orgChanged}>
        <Button className='picker-btn' size='mini'>搜索</Button>
      </Picker>
      </View>
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
