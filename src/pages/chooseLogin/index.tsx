import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Chooselogin extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }

  wxlogin() {
    // Taro.login();
    console.log('fuck');
  }

  render () {
    return (
      <View className='chooseLogin'>
      <AtButton className="btn" type="primary" size="small" onClick={this.wxlogin}>微信登录</AtButton>
      <Text className="text" onClick={()=>this.navTo('login')}>机构登录</Text>
      </View>
    )
  }
}
