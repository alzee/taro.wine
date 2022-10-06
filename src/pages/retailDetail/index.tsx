import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Retaildetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'retails/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='retailDetail'>
      { this.state.entity &&
      <AtList>
      <AtListItem title='零售编号' extraText={this.state.entity.id} />
      <AtListItem title='门店' extraText={this.state.entity.store.name} />
      <AtListItem title='顾客' extraText={this.state.entity.consumer.name} />
      <AtListItem title='商品' extraText={this.state.entity.product.name} />
      <AtListItem title='数量' extraText={this.state.entity.quantity} />
      <AtListItem title='金额' extraText={this.state.entity.amount / 100} />
      <AtListItem title='随赠代金券' extraText={this.state.entity.voucher / 100} />
      <AtListItem title='日期' extraText={fmtDate(this.state.entity.date)} />
      </AtList>
      }
      </View>
    )
  }
}
