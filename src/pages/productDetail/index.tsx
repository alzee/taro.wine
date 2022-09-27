import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Productdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'products/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.node = res.data
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='productDetail'>
        <Text>Hello world! id is {this.id}</Text>
      </View>
    )
  }
}
