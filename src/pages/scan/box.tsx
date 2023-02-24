import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './box.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  oType: int
  state = {
    data: {}
  }

  componentDidMount () {
    let params = this.instance.router.params

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.oType = res.data.org.type
        let data = {
          oid: res.data.org.id,
          // oid: 28,
          s: params.s,
          e: params.e
        }
        Taro.request({
          method: 'POST',
          data,
          url: Env.apiUrl + 'scan/box',
          success: function (res) { }
        }).then((res) =>{
          console.log(res.data);
          this.setState({
            data: res.data
          })
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  done(){
    Taro.exitMiniProgram()
  }

  goOn(){
    Taro.scanCode({
      onlyFromCamera: true,
    }).then(res => {
      console.log(res)
      let text = res.result
      if (text.indexOf(Env.wxqrUrl) === 0) {
        console.log('its wxqr code')
        Taro.redirectTo({url: '/pages/scan/index?q=' + encodeURIComponent(text)})
      }
    }).catch(err => {
      console.log(err)
    })
    // Taro.redirectTo({url: '/pages/scan/storeman'})
  }

  render () {
    return (
      <View className='scan-box scan'>
      <View className='scan'>

      { this.state.data &&
      <View className='msg'>
      {this.state.data.msg}
      </View>
      }

      { this.state.data.ord &&
      <View className='info'>
      {this.state.data.ord.product.name} x {this.state.data.ord.qty}
      </View>
      }

      </View>

      <View className='fixed'>
      { this.oType !== 4 &&
      <Button className='btn btn-outline-primary btn1' onClick={this.goOn}>继续入库</Button>
      }
      <Button className='btn' size='small' onClick={this.done}>确定</Button>
      </View>

      </View>
    )
  }
}
