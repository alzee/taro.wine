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
import coord from '../../icon/coord.png'
import gear from '../../icon/gear.png'
import lock from '../../icon/lock.png'

export default class Me extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;
  avatar: string = Env.imgUrl + 'avatar.png';
  username: string;
  orgName: string;
  oid: int

  componentWillMount () { }

  componentDidMount () {
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
            if (res.data.phone == null || res.data.name == null) {
              Taro.redirectTo({url: '/pages/consumerInfo/index'})
            } 
            this.orgName = '顾客'
            this.username = res.data.name
            break;
          default:
            this.orgName = res.data.org.name
            this.username = res.data.username
            this.oid = res.data.org.id
        }
      }
    })
  }

  componentWillUnmount () { }

  getLocation(){
    const self = this;
    Taro.showModal({
      title: '提示',
      content: '确定要更新坐标？',
      success: function (res) {
        if (res.confirm) {
          Taro.getLocation({
            // type: 'wgs84',
            type: 'gcj02',
            success: function (res) {
              const latitude = res.latitude
              const longitude = res.longitude
              // console.log(res)
              Taro.request({
                method: 'PATCH',
                url: Env.apiUrl + 'orgs/' + self.oid,
                data: {latitude: latitude, longitude: longitude},
                header: {
                  'content-type': 'application/merge-patch+json'
                },
                success: function (res) { self.setState({data: res.data}) }
              }).then((res) =>{
                // console.log(res.data)
                Taro.showToast({
                  title: '更新成功',
                  icon: 'success',
                  duration: 2000
                })
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }

  componentDidShow () { 
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
        <Text className='title'>{this.state && this.username}</Text>
        <Text className='note'>{this.state && this.orgName}</Text>
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
      title='我的仓库'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={wine}
      onClick={() => this.navTo('product')}
      />
      }

      <AtListItem
      title='我的代金券'
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

      { (this.role == 2 || this.role == 3) &&
      <AtListItem
      title='更新门店坐标'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={coord}
      onClick={this.getLocation.bind(this)}
      />
      }

      { this.role != 4 &&
      <AtListItem
      title='我的信息'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={gear}
      // onClick={() => Taro.navigateTo({url: '/pages/orgDetail/index?id=' + this.oid})}
      onClick={() => this.navTo('orgEdit')}
      />
      }

      { this.role != 4 &&
      <AtListItem
      title='修改密码'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('chpwd')}
      />
      }

      { this.role == 4 &&
      <>
      <AtListItem
      title='分销详情'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('referral')}
      />
      <AtListItem
      title='分销提现'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('referralWithdraw')}
      />
      <AtListItem
      title='我的推荐人'
      arrow='right'
      thumb={lock}
      // onClick={() => this.navTo('referral')}
      />
      </>
      }

      </AtList>

      <AtButton className='logout' size='small' onClick={this.logout}>退出登录</AtButton>
      </View>
      )
  }
}
