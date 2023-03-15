import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { QRCode } from 'taro-code'

export default class Settle extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentDidMount () {
    let params = this.instance.router.params
    this.id = params.id
    if (this.id !== undefined) {
      this.setState({
        text: Env.wxqrUrl + '?t=4&id=' + this.id
      })
    }
  }

  render () {
    return (
      <View className='settle-qr qr'>
      {this.state.text &&
        <QRCode
          text={this.state.text}
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
