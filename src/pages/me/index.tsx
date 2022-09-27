import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Me extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;
  avatar: string;
  username: string;
  orgName: string;


  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { 
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
        console.log(res.data)
        console.log(this.role)
        if (this.role == -1) {
          Taro.redirectTo({ url: '/pages/chooseLogin/index' })
          return
        }
        if (this.role > 1) {
        }
        switch (res.data.role) {
          case 4:
            this.orgName = '顾客'
            this.username = ''
            break;
          default:
            this.orgName = res.data.org.name
            this.username = res.data.username
        }
      }})
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
          Taro.clearStorage()
          Taro.setStorage({
            key: Env.storageKey,
            data: {uid: 0, role: -1, token: 0}
          });
          // redirect
          // Taro.switchTab({ url: '/pages/index/index' })
          // Taro.reLaunch({ url: '/pages/index/index' })
          Taro.redirectTo({ url: '/pages/chooseLogin/index'})
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }

  render () {
    return (
      <View className='me'>
        <View className="at-row top">
        <AtAvatar className="avatar" circle image={this.avatar}></AtAvatar>
        <View className="name">
        <Text className='main'>{this.state && this.username}</Text>
        <Text className='secondary'>{this.state && this.orgName}</Text>
        </View>
        </View>

      <AtList>
      <AtListItem
      title='代金券明细'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      onClick={() => this.navTo('voucher')}
      />
      <AtListItem
      title='提现'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      onClick={() => this.navTo('withdraw')}
      />
      </AtList>

      <AtButton className='logout' size='small' onClick={this.logout}>退出登录</AtButton>
      </View>
      )
  }
}
