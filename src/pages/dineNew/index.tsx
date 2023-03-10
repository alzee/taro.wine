import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Dinenew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  uid: int
  customerName: string
  timestamp: string
  oid: int

  componentDidMount () {
    this.uid = this.instance.router.params.uid
    this.timestamp = this.instance.router.params.timestamp
    this.customerName = this.instance.router.params.name
    console.log(this.uid, this.timestamp)

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.oid = res.data.org.id
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value
    data.voucher = Number(data.voucher)
    data.uid = this.uid
    data.oid = this.oid
    data.timestamp = this.timestamp
    if (data.voucher == "") {
      Taro.showToast({
        title: '请填写数量' ,
        icon: 'error',
        duration: 2000
      })
      return
    } else {
      if (!Number.isInteger(data.voucher) || data.voucher < 1) {
        Taro.showToast({
          title: '请填写正整数' ,
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    data.voucher = data.voucher * 100
    console.log(data)

    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'dine/new',
      success: function (res) { }
    }).then((res) =>{
      if (res.statusCode === 500) {
        Taro.showToast({
          title: '系统维护',
          icon: 'error',
          duration: 2000,
        })
      } else {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.reLaunch({url: '/pages/orders/index'})
              }, 500
            )
          }
        })
      }
    })
  }

  render () {
    return (
      <View className='dineNew main'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <AtList>
      <AtListItem
      title='顾客'
      extraText={[this.customerName]}
      disabled
      />
      </AtList>
      <Input 
      className="input"
      name='voucher' 
      type='number' 
      placeholder='代金券' 
      />
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
