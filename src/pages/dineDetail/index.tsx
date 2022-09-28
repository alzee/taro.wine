import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Dinedetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  entity = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'order_restaurants/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.entity = res.data
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='dineDetail'>
      { this.state &&
      <AtList>
      <AtListItem title='编号' extraText={this.entity.id} />
      <AtListItem title='餐厅' extraText={this.entity.restaurant.name} />
      <AtListItem title='顾客' extraText={this.entity.consumer.name} />
      <AtListItem title='代金券' extraText={this.entity.voucher / 100} />
      <AtListItem title='日期' extraText={this.entity.date} />
      </AtList>
      }
      </View>
    )
  }
}
