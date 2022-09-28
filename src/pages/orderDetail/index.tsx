import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orderdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  entity = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orders/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.entity = res.data
      console.log(this.entity)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='orderDetail'>
      { this.state &&
      <AtList>
      <AtListItem title='发货方' extraText={this.entity.seller.name} />
      <AtListItem title='进货方' extraText={this.entity.buyer.name} />
      <AtListItem title='订单商品' />
      <View className='store'>
        <Text>Hello world!</Text>
      </View>
      <View className='store'>
        <Text>Hello world!</Text>
      </View>
      <View className='store'>
        <Text>Hello world!</Text>
      </View>
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
