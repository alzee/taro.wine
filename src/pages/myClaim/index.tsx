import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Myclaim extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  uid: int
  oid: int
  isStore: bool = false

  state = {
    point: 0
  }

  componentDidMount () {
    let params = this.instance.router.params
    if (params.t !== undefined) {
      this.isStore = true
    }

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        this.uid = data.uid
        this.oid = data.org.id
        const self = this
        let query = 'customer=' + data.uid
        let query2 = 'users/' + data.uid
        let value = 'toCustomer'
        if (this.isStore) {
          query = 'store=' + data.org.id
          query2 = 'orgs/' + data.org.id
          value = 'toStore'
        }
        Taro.request({
          url: Env.apiUrl + 'claims?' + query
        }).then((res) =>{
          let records = res.data
          let list = []
          for (let i of records) {
            let title = i.prize.name + ' ' + i.prize[value] / 100
            if (i.prize.label === 'onemore') {
              title = i.prize.name
            }
            if (this.isStore && i.customer !== undefined) {
              title += '(顾客抽奖)'
            }
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(i.id)}
              title={title}
              note={fmtDate(i.createdAt)}
              extraText={Taxon.claimStatus[i.status]}
              arrow='right'
              />
            )
          }
          this.setState({list: list})
        })
        Taro.request({
          url: Env.apiUrl + query2
        }).then((res) =>{
          this.setState({point: res.data.point})
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });
  }

  navToDetail(id){
    Taro.redirectTo({url: '/pages/claimQr/index?id=' + id})
  }

  collect = () => {
    if (this.state.point < 300) {
      Taro.showModal({
        title: '提示',
        content: '须集齐3个才能兑换',
        showCancel: false
      })
      .then(res => {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      })
    } else {
      let data = {}
      data.uid = this.uid
      data.oid = this.oid
      if (this.isStore) {
        data.type = 1
      }
      Taro.request({
        method: 'POST',
        url: Env.apiUrl + 'collect',
        data
      })
      .then(res => {
        if (res.data.code === 0) {
          Taro.showToast({
            title: '已完成',
            icon: 'success',
            duration: 2000
          })
          .then(res => {
            setTimeout(
              () => {
                Taro.redirectTo({url: '/pages/me/index'})
              }, 500
            )
          })
        }
      })
    }
  }

  render () {
    return (
      <View className='myClaim main'>
      <View className='at-row card' onClick={this.collect}>
      <View className='at-col'>
      <View className='label'>集3瓶兑一瓶</View>
      <View className='number'>{this.state.point / 100}</View>
      </View>
      </View>

      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
