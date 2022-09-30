import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Dinenew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  cid: int
  consumerName: string
  timestamp: string
  role: int
  oid: int

  componentWillMount () { }

  componentDidMount () {
    this.cid = this.instance.router.params.cid
    this.timestamp = this.instance.router.params.timestamp
    this.consumerName = this.instance.router.params.name
    console.log(this.cid, this.timestamp)

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.role = res.data.role
        this.oid = res.data.org.id

        Taro.request({
          url: Env.apiUrl + 'products?org=' + this.oid
        }).then((res) =>{
          this.products = res.data
          console.log(this.products)
          let list = []
          for (let i in this.products) {
            list[i] = this.products[i].name
          }
          this.setState({
            products: list
          })
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    let data = e.detail.value
    data.voucher = Number(data.voucher)
    data.cid = this.cid
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
    console.log(data)

    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'dine/new',
      success: function (res) { }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.switchTab({url: '/pages/orders/index'})
            }, 500
          )
        }
      })
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
      extraText={[this.consumerName]}
      disabled
      />
      </AtList>
      <Input 
      className="input"
      name='voucher' 
      type='number' 
      placeholder='代金券' 
      />
        <Button type='primary' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
