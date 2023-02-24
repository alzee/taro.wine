import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'

export default class Orgsignup extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  uid: int  //uid of whom was scanned
  state = {
    types: ['门店', '餐厅', '区域代理商(异业)', '门店(异业)'],
    agencyList: [],
    pca: ['湖北省', '十堰市', '茅箭区']
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
    let params = this.instance.router.params
    this.uid = params.uid
  }

  pcaChange = (e) => {
    this.setState({
      pca: e.detail.value,
    })
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
      name: '名称',
      contact: '联系人',
      phone: '电话',
      address: '地址',
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
    data.area = this.state.pca[0] + this.state.pca[1] + this.state.pca[2]
    data.uid = this.uid
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'org/new',
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
      <View className='orgSignUp'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      { this.state.types &&
      <Picker mode='selector' range={this.state.types} onChange={this.typeChanged}>
      <View className='input'>
      <Text className='label'>类型</Text>
      {this.state.types[this.state.typeSelected]}
      </View>
      </Picker>
      }
      { this.state.agencyList &&
      <Picker mode='selector' range={this.state.agencyList} onChange={this.agencyChanged}>
      <View className='input'>
      <Text className='label'>代理商</Text>
      {this.state.agencyList[this.state.agencySelected]}
      </View>
      </Picker>
      }
      <View className='input'>
      <Text className='label'>店面名称</Text>
        <Input 
          name='name' 
          type='text' 
        />
      </View>
      <View className='input'>
      <Text className='label'>联系人</Text>
        <Input 
          name='contact' 
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
