import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { QRCode } from 'taro-code'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Qr extends Component<PropsWithChildren> {
  cid: int;
  rand = new Date().getTime()

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.cid = res.data.cid
      }
    })
  }

  componentDidHide () { }

  render () {
    // let text = 'cid:rand';
    let text = this.cid + ':' + this.rand
    return (
      <View className='qr'>
      { this.cid &&
        <QRCode
          text={text}
          size={200}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        />
      }
      </View>
    )
  }
}