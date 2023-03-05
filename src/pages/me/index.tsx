import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem} from "taro-ui"
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import qr from '../../icon/qr.svg'
import wine from '../../icon/wine.png'
import voucher from '../../icon/voucher.png'
import cash from '../../icon/cash.png'
import coord from '../../icon/coord.png'
import gear from '../../icon/gear.png'
import lock from '../../icon/lock.png'

export default class Me extends Component<PropsWithChildren> {
  otype: int
  roles: array = []
  oid: int
  state = {
    avatar: Env.imgUrl + 'avatar/default.jpg'
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log(res.data)
      this.otype = res.data.otype
      this.roles = res.data.roles
      this.setState({
        orgName: res.data.org.name,
        name: res.data.name
      })
      Taro.request({
        url: Env.apiUrl + 'users/' + res.data.uid
      }).then(res => {
        console.log(res.data);
        if (res.data.phone === undefined || res.data.name === undefined) {
          Taro.redirectTo({url: '/pages/customerInfo/index'})
        } 
        if (res.data.reloginRequired) {
          Taro.removeStorage({
            key: Env.storageKey,
            success: res => {
              console.log('storeage removed: ' + Env.storageKey);
            },
            fail: res => {
              console.log('storeage removed failed');
            }
          })
          Taro.redirectTo({ url: '/pages/chooseLogin/index'})
        }
        self.setState({
          avatar: Env.imgUrl + 'avatar/' + res.data.avatar
        })
      })
      this.oid = res.data.org.id
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({ url: '/pages/chooseLogin/index' })
    })
  }

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
              Taro.request({
                method: 'PATCH',
                url: Env.apiUrl + 'orgs/' + self.oid,
                data: {latitude: latitude, longitude: longitude},
                header: {
                  'content-type': 'application/merge-patch+json'
                }
              }).then((res) =>{
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

  logout(){
    console.log('out')
    Taro.showModal({
      title: '提示',
      content: '确定要退出当前账号？',
      success: function (res) {
        if (res.confirm) {
          Taro.removeStorage({
            key: Env.storageKey,
            success: res => {
              console.log('storeage removed: ' + Env.storageKey);
            },
            fail: res => {
              console.log('storeage removed failed');
            }
          })
          Taro.redirectTo({ url: '/pages/chooseLogin/index'})
        } else if (res.cancel) {
        }
      }
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }
  
  scan(action: string){
    Taro.scanCode({
      onlyFromCamera: true,
    }).then(res => {
      console.log(res)
      let text = res.result + '&action=' + action
      if (text.indexOf(Env.wxqrUrl) === 0) {
        console.log('its wxqr code')
        Taro.redirectTo({url: '/pages/scan/index?q=' + encodeURIComponent(text)})
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <View className='me'>
        <View className="at-row top">
        <AtAvatar className="avatar" circle image={this.state.avatar}></AtAvatar>
        <View className="name">
        <Text className='title'>{this.state.name}</Text>
        <Text className='note'>{this.state.orgName}</Text>
        </View>
        <View className='qricon' onClick={() => this.navTo('qr')}>
        <Image
        style='width: 36px;height: 36px'
        src={qr} />
        </View>
        </View>

      <AtList>

      <AtListItem
      title='我的代金券'
      arrow='right'
      thumb={voucher}
      onClick={() => this.navTo('voucher')}
      />

      { this.otype >= 10  &&
      <AtListItem
      title='分润明细'
      arrow='right'
      thumb={wine}
      onClick={() => this.navTo('share')}
      />
      }

      <AtListItem
      title='我的钱包'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={cash}
      onClick={() => this.navTo('withdraw')}
      />

      <AtListItem
      title='我的奖品'
      arrow='right'
      thumb={cash}
      onClick={() => Taro.navigateTo({ url: '/pages/myClaim/index?type=user'})}
      />

      <AtListItem
      title='我的信息'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('customerInfo')}
      />

      <AtListItem
      title='分销中心'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('referral')}
      />
      <AtListItem
      title='业务报备'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('myReg')}
      />

      { this.otype != 4 && this.roles.includes('ROLE_ORG_ADMIN') &&
        <>
      <View className='label'>商家</View>
      <AtListItem
      title='更新门店坐标'
      arrow='right'
      thumb={coord}
      onClick={this.getLocation.bind(this)}
      />
      <AtListItem
      title='我的库存'
      arrow='right'
      thumb={wine}
      onClick={() => this.navTo('stock')}
      />
      <AtListItem
      title='我要退货'
      arrow='right'
      thumb={Env.imgUrl + 'icon/scan.svg'}
      onClick={() => this.scan('ret')}
      />
      <AtListItem
      title='商家钱包'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('reward')}
      />
      <AtListItem
      title='添加店员'
      arrow='right'
      thumb={Env.imgUrl + 'icon/scan.svg'}
      onClick={() => this.scan('addStaff')}
      />
      <AtListItem
      title='机构信息'
      arrow='right'
      thumb={gear}
      onClick={() => this.navTo('orgEdit')}
      />
      <AtListItem
      title='我的奖品'
      arrow='right'
      thumb={gear}
      onClick={() => Taro.navigateTo({ url: '/pages/myClaim/index?type=store'})}
      />
      <AtListItem
      title='顾客兑奖'
      arrow='right'
      thumb={gear}
      onClick={() => this.navTo('orgClaim')}
      />
        </>
      }

      { (this.roles.includes('ROLE_SALESMAN') || this.roles.includes('ROLE_SALESMAN_RESTAURANT')) &&
        <>
      <View className='label'>业务员</View>
      { this.roles.includes('ROLE_SALESMAN_RESTAURANT') &&
      <AtListItem
      title='服务员登记'
      arrow='right'
      thumb={Env.imgUrl + 'icon/scan.svg'}
      onClick={() => this.scan('waiterSignUp')}
      />
      }
      <AtListItem
      title='商家管理员绑定'
      arrow='right'
      thumb={Env.imgUrl + 'icon/scan.svg'}
      onClick={() => this.scan('bindOrgAdmin')}
      />
      <AtListItem
      title='商家注册'
      arrow='right'
      thumb={Env.imgUrl + 'icon/scan.svg'}
      onClick={() => this.scan('orgSignUp')}
      />
      <AtListItem
      title='我的领用'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('borrow')}
      />
        </>
      }

      </AtList>

      <Button className='btn logout' size='small' onClick={this.logout}>退出登录</Button>
      </View>
      )
  }
}
