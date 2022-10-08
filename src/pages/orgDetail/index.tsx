import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orgdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orgs/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  makeCall(){
    console.log(this)
    Taro.makePhoneCall({phoneNumber: this.extraText})
  }

  render () {
    return (
      <View className='orgDetail'>
      { this.state.entity &&
      <View>
      <Image mode='widthFix' className='storefront' src={this.state.entity.img && Env.imgUrl + 'org/' + this.state.entity.img} />
      <AtList>
      <AtListItem title='名称' extraText={this.state.entity.name} />
      <AtListItem title='类型' extraText={Taxon.orgType[this.state.entity.type]} />
      <AtListItem title='联系人' extraText={this.state.entity.contact} />
      <AtListItem title='电话' extraText={this.state.entity.phone} onClick={this.makeCall} />
      <AtListItem title='地址' extraText={this.state.entity.address} />
      <AtListItem title='地区' extraText={this.state.entity.district} />
      </AtList>
      </View>
      }
      </View>
    )
  }
}
