import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { View, Text, Form, Input, Button, Picker, Icon } from '@tarojs/components'
import { QRCode } from 'taro-code'

export default class Claimqr extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  id: int
  type: string
  state = {}

  componentDidMount () {
    let params = this.instance.router.params
    this.id = params.id
    this.type = params.type
    console.log(this.id);
    if (this.id !== undefined) {
      this.setState({
        text: Env.wxqrUrl + '?t=3&id=' + this.id + '&type=' + this.type
      })
    }
  }

  render () {
    console.log(this.state.text)
    return (
      <View className='claimQr qr'>
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
