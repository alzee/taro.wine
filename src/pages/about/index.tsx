import { Component, PropsWithChildren } from 'react'
import { View, Text, Video } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'

export default class About extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='about'>
      <Video
      id='video'
      src={Env.imgUrl + 'laojiuku.mp4'}
      // poster={Env.imgUrl + 'jiannan.png'}
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
