import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import type CustomTabBar from '../../custom-tab-bar'

export default class Me extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;
  tabBarIndex = 3;

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.role = res.data.role
        console.log(this.role)
        if (this.role == -1) {
          Taro.redirectTo({ url: '/pages/chooseLogin/index' })
        }
        if (this.role > 1) {
          this.tabBarIndex = 2;
        }
      }})
  }

  componentWillUnmount () { }

  componentDidShow () { 
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx)
    tabbar?.setSelected(this.tabBarIndex)
  }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 2,
    }
  }

  logout(){
    console.log('out')
    Taro.showModal({
      title: '提示',
      content: '确定要退出当前账号？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // clear
          // Taro.clearStorage()
          Taro.setStorage({
            key: Env.storageKey,
            data: {uid: 0, role: -1, token: 0}
          });
          // redirect
          Taro.redirectTo({ url: '/pages/index/index' })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }
  switchTab (value) {
    if (value == this.state.current) {
      return;
    }
    // this.setState({
    //   current: value
    // })
    let i: string;
    switch (value) {
      case 0:
        i = 'index';
        break;
      case 1:
        i = 'org';
        break;
      case 2:
        i = 'me';
        break;
      case 3:
        i = 'me';
        break;
      case 4:
        i = 'me';
        break;
    }
    this.navTo(i);
  }

  handleClick1 () {
    Taro.navigateTo({
        url: 'pages/voucher/index'
            })
  }
  handleClick2 () {
    Taro.navigateTo({
        url: 'pages/orders/index'
            })
  }
  handleClick3 () {
    Taro.navigateTo({
        url: 'pages/returns/index'
            })
  }
  handleClick4 () {
    Taro.navigateTo({
        url: 'pages/withdraw/index'
            })
  }
  handleClick5 () {
    Taro.navigateTo({
        url: 'pages/retail/index'
            })
  }
  handleClick6 () {
    Taro.navigateTo({
        url: 'pages/orderRestaurant/index'
            })
  }
  handleClick7 () {
    Taro.navigateTo({
        url: 'pages/myInfo/index'
            })
  }

  render () {
    return (
      <View className='me'>
        <View className="at-row top">
		<AtAvatar className="avatar" circle image="https://jdc.jd.com/img/200"></AtAvatar>
        <View className="name">
        <Text className='main'>用户名</Text>
        <Text className='secondary'>角色</Text>
        </View>
        </View>

      <AtList>
      <AtListItem
      title='代金券明细'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      onClick={this.handleClick1}
      />
      <AtListItem
      title='提现'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      onClick={this.handleClick4}
      />
      <AtListItem
      title='我的信息'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      onClick={this.handleClick7}
      />
      </AtList>

      <AtButton className='logout' size='small' onClick={this.logout}>退出登录</AtButton>
      </View>
      )
  }
}
