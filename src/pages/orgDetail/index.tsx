import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import storefront from '../../img/storefront.png'

export default class Orgdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  entity = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orgs/' + this.id,
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
      <View className='orgDetail'>
      <Image mode='widthFix' className='storefront' src={storefront} />
      <AtList>
      <AtListItem title='名称' extraText={this.entity.name} />
      <AtListItem title='类型' extraText={Taxon.orgType[this.entity.type]} />
      <AtListItem title='联系人' extraText={this.entity.contact} />
      <AtListItem title='电话' extraText={this.entity.phone} />
      <AtListItem title='区域' extraText={this.entity.district} />
      </AtList>
      </View>
    )
  }
}
