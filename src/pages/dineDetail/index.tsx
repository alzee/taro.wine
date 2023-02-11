import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Dinedetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'order_restaurants/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='dineDetail'>
      { this.state.entity &&
      <AtList>
      <AtListItem title='编号' extraText={this.state.entity.id} />
      <AtListItem title='餐厅' extraText={this.state.entity.restaurant.name} />
      <AtListItem title='顾客' extraText={this.state.entity.customer.name} />
      <AtListItem title='代金券' extraText={this.state.entity.voucher / 100} />
      <AtListItem title='日期' extraText={fmtDate(this.state.entity.date)} />
      </AtList>
      }
      </View>
    )
  }
}
