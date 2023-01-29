import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { QRCode } from 'taro-code'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Qr extends Component<PropsWithChildren> {
  cid: int
  name: string
  // timestamp = new Date().getTime()
  qrIntv: int = 30000
  qrIntvId: int
  chkIntv: int = 1000
  chkIntvId: int
  state = {
    timestamp: new Date().getTime()
  }

  componentWillMount () { }

  newTimestamp = () => {
    console.log('QR refresh')
    this.setState({
      timestamp: new Date().getTime()
    }, () => {
      // console.log(this.state.timestamp);
    })
  }

  chkPaid = () => {
    console.log('check if paid');
    Taro.request({
      // url: Env.apiUrl + 'scans?consumer=' + this.cid + '&rand=' + this.state.timestamp
      url: Env.apiUrl + 'scans?consumer=35&rand=1668853055743'
    }).then((res) => {
      // console.log(res.data.length);
      if (res.data.length > 0) {
        Taro.vibrateShort({type: 'heavy'})
        Taro.redirectTo({ url: '/pages/paid/index' })
      }
    })
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.cid = res.data.cid
        this.name = res.data.name
      }
    })

    // Refresh QR every 30 sec
    this.qrIntvId = setInterval(this.newTimestamp , this.qrIntv)
    // Check if paid every 1 sec after 5 sec
    setTimeout(() => {
      this.chkIntvId = setInterval(this.chkPaid, this.chkIntv)
      console.log('start checking');
    }, 7000)

    Taro.setScreenBrightness({value: 1})
  }

  componentWillUnmount () {
    console.log('bye');
    Taro.setScreenBrightness({value: -1})
    clearInterval(this.qrIntvId)
    clearInterval(this.chkIntvId)
  }

  componentDidHide () {
    // not working
    console.log('bye');
  }

  qrclicked = () => {
    console.log('clicked qr');
    this.newTimestamp()
    clearInterval(this.qrIntvId)
    this.qrIntvId = setInterval(this.newTimestamp , this.qrIntv)
  }

  render () {
    // let text = '{"cid": ${this.cid}, "timestamp": "${this.timestamp}", "name": "${this.name}"}'
    // let text = '{"cid":' + this.cid + ', "timestamp": "' + this.timestamp + '", "name": "' + this.name + '"}'
    let text
    if (this.cid !== undefined) {
      text = `{"cid": ${this.cid}, "timestamp": "${this.state.timestamp}", "name": "${this.name}"}`
      console.log(text)
    }
    return (
      <View className='qr'>
      <View className='text'> 代金券消费 </View>
      { this.cid &&
        <QRCode
          onClick={this.qrclicked}
          text={text}
          size={200}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        />
      }
      <View className='note'> 点击二维码刷新 </View>
      </View>
    )
  }
}
