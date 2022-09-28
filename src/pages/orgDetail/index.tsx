import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"

export default class Orgdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  org = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orgs/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.org = res.data
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='orgDetail'>
      <AtList>
      <AtListItem title='名称' extraText={this.org.name} />
      <AtListItem title='类型' extraText={this.org.type} />
      <AtListItem title='联系人' extraText={this.org.contact} />
      <AtListItem title='电话' extraText={this.org.phone} />
      <AtListItem title='区域' extraText={this.org.district} />
      </AtList>
      </View>
    )
  }
}
