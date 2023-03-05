import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
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

  navTo(page: string, query: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index?' + query })
  }

  render () {
    let c = ''
    if (this.state.data.code === 0) {
      c = 'prize'
    }
    return (
      <View className='scan-bottle'>

      <View className={'scan ' + c}>
      { this.state.data.code === 0 &&
        <Image
      className='bg'
      mode='widthFix'
      src={Env.imgUrl + 'draw.jpg'}
      />
      }

      { this.state.data &&
      <View className='msg'>
      {this.state.data.msg}
      </View>
      }

      <View className='info'>
      { this.state.data.prize &&
        <>
      {this.state.data.prize}   
      {this.state.data.value / 100}   
        </>
      }

      { this.state.data.tip &&
        <>
      {this.state.data.tip / 100} 元  
        </>
      }

      </View>

      { this.state.data.code == 0 &&
      <View className='btns'>
      <View className='my-prize' onClick={() => this.navTo('myClaim')}>我的奖品</View>
      <View className='my-prize' onClick={() => this.navTo('node', 'tag=5')}>兑奖说明</View>
      </View>
      }

      </View>

      { this.state.data.code > 10 &&
      <Button className='btn' size='small' onClick={this.done}>确定</Button>
      }
      { this.state.data.code == 1 &&
      <Button className='btn' size='small' onClick={() => this.navTo('withdraw')}>我的钱包</Button>
      }
      </View>
    )
  }
}
