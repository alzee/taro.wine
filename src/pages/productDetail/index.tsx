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
  product = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'products/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.product = res.data
      console.log(this.product)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='productDetail'>
      <Image className='pic' src={Env.imgUrl + 'jiannan.jpg'} />
      <AtList>
      <AtListItem title='产品名称' extraText={this.product.name} />
      <AtListItem title='产品编号' extraText={this.product.sn} />
      <AtListItem title='产品规格' extraText={this.product.spec} />
      <AtListItem title='产品价格' extraText={this.product.price / 100} />
      <AtListItem title='产品库存' extraText={this.product.stock} />
      <AtListItem title='随赠代金券' extraText={this.product.voucher / 100} />
      </AtList>
      </View>
    )
  }
}
