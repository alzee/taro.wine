import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Returndetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  entity = {}
  itemList = []

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'returns/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.entity = res.data
      let items = this.entity.returnItems
      console.log(this.entity)
      for (let i in items) {
        this.itemList.push(
          <View className='order-item'>
          <Text>{items[i].product.name} x {items[i].quantity}</Text>
          </View>
        )
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='returnDetail'>
      { this.state &&
      <AtList>
      <AtListItem title='退货编号' extraText={this.entity.id} />
      <AtListItem title='退货方' extraText={this.entity.sender.name} />
      <AtListItem title='接收方' extraText={this.entity.recipient.name} />
      <AtListItem title='退货商品' />
      {this.itemList}
      <AtListItem title='金额' extraText={this.entity.amount / 100} />
      <AtListItem title='代金券' extraText={this.entity.voucher / 100} />
      <AtListItem title='日期' extraText={this.entity.date} />
      <AtListItem title='备注' extraText={this.entity.note} />
      </AtList>
      }
      </View>
    )
  }
}
