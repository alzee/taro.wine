import { Component, PropsWithChildren } from 'react'
import { View, Text, Video } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'

export default class Showvideo extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='showVideo'>
      <Video
      id='video'
      src={this.imgUrl + 'laojiuku.mp4'}
      poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
      initialTime={0}
      controls={true}
      autoplay={false}
      loop={false}
      muted={false}
      />
      </View>
    )
  }
}
