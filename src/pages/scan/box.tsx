import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './box.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  state = {
    data: {}
  }

  componentDidMount () {
    let params = this.instance.router.params

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
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
      }
    })
  }

  done(){
    Taro.exitMiniProgram()
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
      <Button className='btn' size='small' onClick={this.done}>确定</Button>
      </View>
    )
  }
}
