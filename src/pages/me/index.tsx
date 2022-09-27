import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import qr from './img/qr.png'
import wine from '../../icon/wine.png'
import voucher from '../../icon/voucher.png'
import cash from '../../icon/cash.png'

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
        if (this.role == -1) {
          Taro.redirectTo({ url: '/pages/chooseLogin/index' })
          return
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
      }
    })
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
        { this.role == 4 &&
        <View className='qr' onClick={() => this.navTo('qr')}>
        <Image
        style='width: 48px;height: 48px'
        src={qr} />
        </View>
        }
        </View>

      <AtList>

      { this.role != 4  &&
      <AtListItem
      title='我的产品'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={wine}
      onClick={() => this.navTo('product')}
      />
      }

      <AtListItem
      title='代金券明细'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={voucher}
      onClick={() => this.navTo('voucher')}
      />

      { (this.role == 0 || this.role == 1 || this.role == 3 ) &&
      <AtListItem
      title='提现管理'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={cash}
      onClick={() => this.navTo('withdraw')}
      />
      }

      </AtList>

      <AtButton className='logout' size='small' onClick={this.logout}>退出登录</AtButton>
      </View>
      )
  }
}
