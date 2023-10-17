import { Component, PropsWithChildren } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro'
import { Env } from './env/env'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    let verChanged: bool = false
    Taro.getStorage({
      key: 'ver'
    })
    .then(res => {
      console.log(res)
      if (res.data !== Env.ver) {
        console.log('ver not same')
        verChanged = true
      }
    })
    .catch(err => {
      console.log(err)
      verChanged = true
    })
    .finally(() => {
      if (verChanged) {
        Taro.setStorage({ key: 'ver', data: Env.ver})
        // force log out
        Taro.removeStorage({
          key: Env.storageKey
        }).then(res => {
          console.log('storeage removed: ' + Env.storageKey);
        }).catch(err => {
          console.log('storeage remove failed: ' + Env.storageKey);
        })
      }
    })
  }

  render () {
    return this.props.children
  }
}

export default App
