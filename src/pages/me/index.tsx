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
  pageCtx = Taro.getCurrentInstance().page
  role: int
  roles: array = []
  oid: int
  state = {
    avatar: Env.imgUrl + 'avatar/default.jpg'
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data)
        this.role = res.data.role
        this.roles = res.data.roles
        let orgName
        let name
        switch (res.data.role) {
          case 4:
            orgName = '顾客'
            name = res.data.name
            Taro.request({
              url: Env.apiUrl + 'users/' + res.data.uid
            }).then(res => {
              console.log(res.data);
              if (res.data.phone === undefined || res.data.name === undefined) {
                Taro.redirectTo({url: '/pages/customerInfo/index'})
              } 
              self.setState({
                avatar: Env.imgUrl + 'avatar/' + res.data.avatar
              })
            })
            break;
          default:
            orgName = res.data.org.name
            name = res.data.username
            this.oid = res.data.org.id
        }
        this.setState({
          orgName,
          name
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
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
  
  scan(action: int){
    console.log(action)
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
        { this.role == 4 &&
        <View className='qricon' onClick={() => this.navTo('qr')}>
        <Image
        style='width: 36px;height: 36px'
        src={qr} />
        </View>
        }
        </View>

      <AtList>

      { this.role != 4  &&
      <AtListItem
      title='我的库存'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={wine}
      onClick={() => this.navTo('stock')}
      />
      }

      <AtListItem
      title='我的代金券'
      arrow='right'
      thumb={voucher}
      onClick={() => this.navTo('voucher')}
      />

      { this.role >= 10  &&
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
      onClick={() => this.navTo('myClaim')}
      />

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
        <>
      <AtListItem
      title='添加店员'
      arrow='right'
      thumb={gear}
      onClick={() => this.scan(1)}
      />
      <AtListItem
      title='机构信息'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={gear}
      // onClick={() => Taro.navigateTo({url: '/pages/orgDetail/index?id=' + this.oid})}
      onClick={() => this.navTo('orgEdit')}
      />
      <AtListItem
      title='用户信息'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={gear}
      // onClick={() => Taro.navigateTo({url: '/pages/orgDetail/index?id=' + this.oid})}
      onClick={() => this.navTo('user')}
      />
      <AtListItem
      title='我的兑奖'
      arrow='right'
      thumb={gear}
      onClick={() => this.navTo('orgClaim')}
      />
        </>
      }

      { this.role != 4 &&
        <>
      <AtListItem
      title='修改密码'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('chpwd')}
      />
      <AtListItem
      title='我的领用'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('borrow')}
      />
        </>
      }

      { this.roles.includes('ROLE_SALESMAN') &&
        <>
      <AtListItem
      title='商家管理员绑定'
      arrow='right'
      thumb={lock}
      onClick={() => this.scan(0)}
      />
      <AtListItem
      title='服务员登记'
      arrow='right'
      thumb={lock}
      onClick={() => this.scan(2)}
      />
      <AtListItem
      title='商家注册'
      arrow='right'
      thumb={lock}
      onClick={() => Taro.navigateTo({url: '/pages/orgSignUp/qr'})}
      />
        </>
      }

      { this.role == 4 &&
      <>
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
      <AtListItem
      title='我的信息'
      arrow='right'
      thumb={lock}
      onClick={() => this.navTo('customerInfo')}
      />
      </>
      }

      </AtList>

      <Button className='btn logout' size='small' onClick={this.logout}>退出登录</Button>
      </View>
      )
  }
}
