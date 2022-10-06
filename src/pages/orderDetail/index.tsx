import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Orderdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orders/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
      let data = res.data
      let items = data.orderItems
      let itemList = []
      for (let i in items) {
        itemList.push(
          <View className='order-item'>
          <Text>{items[i].product.name} x {items[i].quantity}</Text>
          </View>
        )
      }
      this.setState({itemList: itemList})
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='orderDetail'>
      { this.state.entity &&
      <AtList>
      <AtListItem title='订单编号' extraText={this.state.entity.id} />
      <AtListItem title='发货方' extraText={this.state.entity.seller.name} />
      <AtListItem title='进货方' extraText={this.state.entity.buyer.name} />
      <AtListItem title='订单商品' />
      {this.state.itemList}
      <AtListItem title='金额' extraText={this.state.entity.amount / 100} />
      <AtListItem title='代金券' extraText={this.state.entity.voucher / 100} />
      <AtListItem title='日期' extraText={fmtDate(this.state.entity.date)} />
      <AtListItem title='备注' extraText={this.state.entity.note} />
      </AtList>
      }
      </View>
    )
  }
}
