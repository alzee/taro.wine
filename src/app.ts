import { Component, PropsWithChildren } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro'
import { Env } from './env/env'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    // Taro.clearStorage()
    Taro.getStorageInfo({
      success: res => {
        // if not found
        if (res.keys.indexOf(Env.storageKey) == -1) {
          Taro.setStorage({
            key: Env.storageKey,
            data: {uid: 0, role: -1, token: 0}
          });
        }
      },
      fail: res => {
        console.log('fuck');
      }
    })
    // only for test
    // Taro.setStorage({
    //   key: Env.storageKey,
    //   data: {uid: 0, role: 1, token: 0}
    // });

    Taro.getLocation({
      // type: 'wgs84',
      type: 'gcj02',
      success: function (res) {
        Taro.setStorage({
          key: 'coord',
          data: res
        });
      }
    })
  }

  render () {
    return this.props.children
  }
}

export default App
