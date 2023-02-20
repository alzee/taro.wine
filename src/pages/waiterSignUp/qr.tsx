import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { Env } from '../../env/env'
import { QRCode } from 'taro-code'

export default class Waitersignup extends Component<PropsWithChildren> {

  render () {
    let text = Env.wxqrUrl + '?t=3'
    return (
      <View className='waiterSignUp-qr qr'>
      <View className='text'>
      <View>
      微信扫码开始登记
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
