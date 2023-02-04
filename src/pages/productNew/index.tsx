import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput, AtForm} from "taro-ui"

export default class Productnew extends Component<PropsWithChildren> {
  role: int
  orgid: int
  label = {
    name: '名称',
    spec: '规格',
    price: '价格',
    sn: '产品编号',
    voucher: '随赠代金券',
    stock: '库存',
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.role = res.data.role
        this.orgid = res.data.org.id
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    console.log(e)
    let data = e.detail.value
    data.stock = Number(data.stock)
    data.price = Number(data.price)
    data.voucher = Number(data.voucher)
    for (let i in data) {
      if (data[i] == "") {
        Taro.showToast({
          title: '请填写 ' + this.label[i],
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    data.org = '/api/orgs/' + this.orgid
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'products',
      success: function (res) { }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.redirectTo({url: '/pages/product/index'})
            }, 500
          )
        }
      })
    })
  }

  render () {
    return (
      <View className='productNew'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
        required
          name='name' 
          type='text' 
          placeholder={this.label['name']}
        />
        <Input 
        className="input"
          name='spec' 
          type='text' 
          placeholder={this.label['spec']}
        />
        <Input 
        className="input"
          name='stock' 
          type='number' 
          placeholder={this.label['stock']}
        />
        <Input 
        className="input"
          name='price' 
          type='number' 
          placeholder={this.label['price']}
        />
        <Input 
        className="input"
          name='sn' 
          type='text' 
          placeholder={this.label['sn']}
        />
        <Input 
        className="input"
          name='voucher' 
          type='number' 
          placeholder={this.label['voucher']}
        />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
