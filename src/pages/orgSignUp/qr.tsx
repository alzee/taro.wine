import { Component, PropsWithChildren } from 'react'
import './qr.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { QRCode } from 'taro-code'
import { View } from '@tarojs/components'

export default class Orgsignup extends Component<PropsWithChildren> {
  state = {
  }

  componentDidMount () {
  }

  render () {
    let text = Env.wxqrUrl + '?t=2'
    return (
      <View className='orgSignUp-qr qr'>
      <View className='text'>
      <View>
      微信扫码开始注册
      </View>
      </View>
        <QRCode
          text={text}
          size={200}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        />
      </View>
    )
  }
}
