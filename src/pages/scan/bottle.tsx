import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './bottle.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Scan extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();

  componentDidMount () {
    let params = this.instance.router.params

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data);
        let data = {
          uid: res.data.uid,
          s: params.s,
          e: params.e
        }
        Taro.request({
          method: 'POST',
          data,
          url: Env.apiUrl + 'scan/bottle',
          success: function (res) { }
        }).then((res) =>{
          console.log(res.data);
        })
      }
    })

  }

  done(){
    Taro.exitMiniProgram()
  }

  render () {
    return (
      <View className='scan-bottle'>
      <Button className='btn' size='small' onClick={this.done}>确定</Button>
      </View>
    )
  }
}
