import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Retailnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  cid: int
  consumerName: string
  timestamp: string
  role: int
  orgid: int
  products = []
  label = {
    name: '名称',
    spec: '规格',
    price: '价格',
    sn: '产品编号',
    voucher: '随赠代金券',
    stock: '库存',
  }
  state = {
    products: [],
    productSelected: '',
  }

  componentWillMount () { }

  formSubmit = e => {
  }

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
        this.orgid = res.data.org.id

        Taro.request({
          url: Env.apiUrl + 'products?org=' + this.orgid
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

  productChange = e => {
    this.setState({
      productSelected: this.state.products[e.detail.value]
    })
    this.productid = this.products[e.detail.value].id
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='retailNew'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Picker mode='selector' range={this.state.products} onChange={this.productChange}>
      <AtList>
      <AtListItem
      title='商品'
      extraText={this.state.selectorChecked}
      />
      </AtList>
      </Picker>
      <Input 
      className="input"
      required
      type='text' 
      placeholder='顾客' 
      value={this.consumerName}
      disabled
      />
      <Input 
      className="input"
      name='quantity' 
      type='number' 
      placeholder='数量' 
      />
        <Button type='primary' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
