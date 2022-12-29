import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Poster extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({cid: res.data.cid})
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='poster'>
        <Image 
        className='at-article__img' 
        src={ this.state && Env.imgUrl + 'poster/' + this.state.cid + '.jpg'}
        mode='widthFix' />
      </View>
    )
  }
}
