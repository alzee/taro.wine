import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Productdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'products/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='productDetail'>
      <Image className='pic' src={Env.imgUrl + 'product/' + this.state.entity.img} />
      <AtList>
      <AtListItem title='产品名称' extraText={this.state.entity.name} />
      <AtListItem title='产品编号' extraText={this.state.entity.sn} />
      <AtListItem title='产品规格' extraText={this.state.entity.spec} />
      <AtListItem title='产品价格' extraText={this.state.entity.price / 100} />
      <AtListItem title='产品库存' extraText={this.state.entity.stock} />
      <AtListItem title='随赠代金券' extraText={this.state.entity.voucher / 100} />
      </AtList>
      </View>
    )
  }
}
