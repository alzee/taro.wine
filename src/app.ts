import { Component, PropsWithChildren } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro'
import { Env } from './env/env'

class App extends Component<PropsWithChildren> {
  updateMark = '0'

  componentDidMount () {
    // Taro.clearStorage()
    Taro.getStorageInfo({
      success: res => {
        // if not found
        // force log out
        if (res.keys.indexOf(this.updateMark) == -1) {
          Taro.setStorage({
            key: this.updateMark,
            data: 'fuck'
          });
          Taro.removeStorage({
            key: this.updateMark ^ 1,
            success: res => {
              console.log('storeage removed: ' + this.updateMark ^ 1);
            },
            fail: res => {
              console.log('storeage remove failed: ' + this.updateMark ^ 1);
            }
          })
          Taro.removeStorage({
            key: Env.storageKey,
            success: res => {
              console.log('storeage removed: ' + Env.storageKey);
            },
            fail: res => {
              console.log('storeage remove failed: ' + Env.storageKey);
            }
          })
        }
      },
      fail: res => {
        console.log('pls login');
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
