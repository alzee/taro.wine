import { Component, PropsWithChildren } from 'react'
import { View, Text, Video, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class About extends Component<PropsWithChildren> {
  state = {};

  componentWillMount () { }

  componentDidMount () {
    Taro.request({
      url: Env.apiUrl + 'nodes/13',
    }).then((res) =>{
      this.setState({node: res.data})
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='about'>
      <View className='video-wrapper'>
      <Video
      id='video'
      src={Env.imgUrl + 'laojiuku.mp4'}
      initialTime={0}
      controls={true}
      autoplay={false}
      loop={false}
      muted={false}
      />
      </View>

      { this.state.node &&
      <View>
      <View className='at-article__content'>
      <View dangerouslySetInnerHTML={{__html: this.state.node.body}} className='at-article__section'>
      </View>
      </View>
      </View>
      }
      </View>
    )
  }
}
