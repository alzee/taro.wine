import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtIcon } from "taro-ui"
import { Taxon } from '../../Taxon'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

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
    Taro.request({
      url: Env.apiUrl + 'nodes?org=/api/orgs/' + this.id,
      success: function (res) {
        let nodeList = []
        for (let i of res.data) {
          nodeList.push(
            <View className='node'>
            <View className='at-article__h3 title'>
            {i.title}
            </View>
            <View className='at-article__content'>
            <View dangerouslySetInnerHTML={{__html: i.body}} className='at-article__section'>
            </View>
            </View>
            </View>
          )
        }
        self.setState({nodeList})
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  makeCall(){
    Taro.makePhoneCall({phoneNumber: this.extraText})
  }

  openLocation(){
    const latitude = this.state.entity.latitude
    const longitude = this.state.entity.longitude
    Taro.openLocation({
      latitude,
      longitude,
      scale: 18
    })
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
      <View className='item-wrapper'>
      <AtListItem title='电话' extraText={this.state.entity.phone} onClick={this.makeCall} />
      <AtIcon className='icon' value='phone' size='18' color='#999'></AtIcon>
      </View>
      <View className='item-wrapper'>
      <AtListItem title='地址导航' extraText={this.state.entity.address} onClick={this.openLocation.bind(this)} />
      <AtIcon className='icon' value='map-pin' size='18' color='#999'></AtIcon>
      </View>
      <AtListItem title='地区' extraText={this.state.entity.district} />
      </AtList>
      </View>
      }

      { this.state.nodeList &&
        this.state.nodeList
      }

      </View>
    )
  }
}
