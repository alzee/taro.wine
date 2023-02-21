import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './bottle.scss'
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

  myClaim(){
    Taro.redirectTo({url: '/pages/myClaim/index'})
  }

  myWallet(){
    Taro.redirectTo({url: '/pages/withdraw/index'})
  }

  render () {
    return (
      <View className='scan-bottle'>

      <View className='scan'>

      { this.state.data &&
      <View className='msg'>
      {this.state.data.msg}
      </View>
      }

      <View className='info'>
      { this.state.data.prize &&
        <>
      {this.state.data.prize}   
      {this.state.data.value}   
        </>
      }

      { this.state.data.tip &&
        <>
      {this.state.data.tip} 元  
        </>
      }

      </View>
      </View>

      { this.state.data.code > 10 &&
      <Button className='btn' size='small' onClick={this.done}>确定</Button>
      }
      { this.state.data.code == 0 &&
      <Button className='btn' size='small' onClick={this.myClaim}>我的奖品</Button>
      }
      { this.state.data.code == 1 &&
      <Button className='btn' size='small' onClick={this.myWallet}>我的钱包</Button>
      }
      </View>
    )
  }
}
