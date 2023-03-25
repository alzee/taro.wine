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
  type: string
  isStore: bool = false
  state = {
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.type = params.type
    if (this.type === 'store') {
      this.isStore = true
    }

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.uid = res.data.id
        this.oid = res.data.org.id
        const self = this
        let query = 'customer=' + this.uid
        let value = 'toCustomer'
        let extraText = ''
        if (this.isStore) {
          query = 'store=' + this.oid
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
              title = i.prize.name + ' ' + i.product.name
            }
            if (i.prize.label === 'voucher' && this.isStore) {
              title = '可提现金额 ' + i.prize.toStore / 100
            }
            if (this.isStore && i.customer !== undefined) {
              title += '(扫码奖)'
            }
            extraText = Taxon.claimStatus[i.status]
            if (this.isStore && i.prize.label === 'onemore') {
              extraText = Taxon.settleStatus[Number(i.storeSettled)]
            }
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(i.id, this.type)}
              title={title}
              note={fmtDate(i.createdAt)}
              extraText={extraText}
              arrow='right'
              />
            )
          }
          this.setState({list: list})
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });
  }

  navToDetail(id, type){
    Taro.redirectTo({url: '/pages/claimQr/index?id=' + id + '&type=' + type})
  }

  goToCollect = () => {
    let type: string
    if (this.isStore) {
      type = 'store'
    } else {
      type = 'user'
    }
    Taro.navigateTo({ url: '/pages/collect/index?type=' + type })
  }

  render () {
    return (
      <View className='myClaim main'>
      <View className='at-row card' onClick={this.goToCollect}>
      <View className='at-col'>
      <View className='label'>集3瓶兑一瓶</View>
      </View>
      </View>

      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
