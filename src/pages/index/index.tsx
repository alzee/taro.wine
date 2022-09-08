import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'
import namedPng from './img/400x220.png'

export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>

      <Swiper
      className='top'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      // vertical
      circular
      indicatorDots
      autoplay>
      <SwiperItem>

      <View className='demo-text-1'><Image src={namedPng}></Image></View>
      </SwiperItem>
      <SwiperItem>
      <View className='demo-text-1'><Image src={namedPng}></Image></View>
      </SwiperItem>
      <SwiperItem>
      <View className='demo-text-1'><Image src={namedPng}></Image></View>
      </SwiperItem>
      </Swiper>

      <Text>Hello world!</Text>
      <AtButton type='primary'>按钮文案</AtButton>
      <AtAvatar type='primary'></AtAvatar>

      </View>
      )
  }
}
