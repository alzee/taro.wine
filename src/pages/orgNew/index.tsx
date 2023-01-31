import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orgnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  type: int
  role: int
  oid: int
  state = {
    selector: ['门店', '餐厅', '代理商', '门店(异业)', '区域代理商(异业)'],
    selectorChecked: '',
  }

  componentDidMount () {
    this.type = this.instance.router.params.type
    this.setState({
      selectorChecked: this.state.selector[this.type]
    })

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.role = res.data.role
        this.oid = res.data.org.id
        if (this.role == 0) {
          this.setState({
            selector: ['代理商']
          })
        }
        if (this.role == 1) {
          this.setState({
            selector: ['门店', '餐厅'],
          })
        }
        if (this.role == 10) {
          this.setState({
            selector: ['区域代理商(异业)'],
          })
        }
        if (this.role == 11) {
          this.setState({
            selector: ['门店(异业)'],
          })
        }
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    let label = {
      name: '名称',
      contact: '联系人',
      phone: '电话',
      address: '地址',
      district: '区域',
    }
    for (let i in data) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请填写 ' + label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if (this.role == 0) {
      data.type = 1
    }
    if (this.role == 1) {
      data.type = Number(this.type) + 2
    }
    if (this.role == 10) {
      data.type = 11
    }
    if (this.role == 11) {
      data.type = 12
    }
    data.upstream = '/api/orgs/' + this.oid
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'orgs',
      success: function (res) { }
    }).then((res) =>{
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
    })
  }

  pickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
    this.type = e.detail.value
  }

  render () {
    return (
      <View className='orgNew'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Picker mode='selector' range={this.state.selector} onChange={this.pickerChange}>
      <AtList>
      <AtListItem
      title='类型'
      className=''
      extraText={this.state.selectorChecked}
      />
      </AtList>
      </Picker>
        <Input 
        className="input"
        required
          name='name' 
          type='text' 
          placeholder='名称' 
        />
        <Input 
        className="input"
          name='contact' 
          type='text' 
          placeholder='联系人' 
        />
        <Input 
        className="input"
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
        <Input 
        className="input"
          name='address' 
          type='text' 
          placeholder='地址' 
        />
        <Input 
        className="input"
          name='district' 
          type='text' 
          placeholder='地区' 
        />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
