import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { QRCode } from 'taro-code'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Qr extends Component<PropsWithChildren> {
  uid: int
  name: string
  // timestamp = new Date().getTime()
  qrIntv: int = 30000
  qrIntvId: int
  chkIntv: int = 1000
  chkIntvId: int
  chkTimeout: int = 7000
  chkTimeoutId: int
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

  chkTransComplete = () => {
    console.log('check if transaction complete');
    Taro.request({
      url: Env.apiUrl + 'scans?customer=' + this.uid + '&rand=' + this.state.timestamp
    }).then((res) => {
      // console.log(res.data.length);
      if (res.data.length > 0) {
        // Taro.vibrateShort({type: 'heavy'})
        Taro.vibrateLong()
        Taro.redirectTo({ url: '/pages/transComplete/index' })
      }
    })
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.uid = res.data.id
        this.name = res.data.name
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })

    // Refresh QR every 30 sec
    this.qrIntvId = setInterval(this.newTimestamp , this.qrIntv)
    // Check if trans complete every 1 sec after 5 sec
    this.chkTimeoutId = setTimeout(() => {
      this.chkIntvId = setInterval(this.chkTransComplete, this.chkIntv)
      console.log('start checking');
    }, this.chkTimeout)

    Taro.setScreenBrightness({value: 1})
  }

  componentWillUnmount () {
    console.log('bye');
    Taro.setScreenBrightness({value: -1})
    clearInterval(this.qrIntvId)
    clearInterval(this.chkIntvId)
    clearTimeout(this.chkTimeoutId)
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
    let text
    if (this.uid !== undefined) {
      text = Env.wxqrUrl + '?t=2&uid=' + this.uid + '&timestamp=' + this.state.timestamp + '&name=' + this.name
      console.log(text)
    }
    return (
      <View className='qr'>
      <View className='text'>
      <View>
      代金券付款
      </View>
      </View>
      { this.uid &&
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
