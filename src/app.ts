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
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data);
        if (res.data.role == 0) {
          // Taro.showTabBarRedDot({index: 2})
        }
      },
      fail: res => {
        console.log('fuck')
      },
    });

    Taro.getLocation({
      // type: 'wgs84',
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        Taro.setStorage({
          key: 'coord',
          data: res
        });
      }
    })

    // Taro.checkSession({
    //   success() {
    //   },
    //   fail() {
    //     return Taro.login()
    //     .then(res => {})
    //     .then(res => {
    //       if (1) {
    //         Taro.setStorage({key: '111', data: {}})
    //       } else {
    //       }
    //     })
    //   }
    // })
  }

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
