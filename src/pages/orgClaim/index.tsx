import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Orgclaim extends Component<PropsWithChildren> {

  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this
        Taro.request({
          url: Env.apiUrl + 'claims?serveStore=' + data.org.id,
          success: function (res) {}
        }).then((res) =>{
          let records = res.data
          let list = []
          let title = i.prize.name + ' ' + i.product.name
          for (let i of records) {
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(i.id, 'serveStore')}
              title={title}
              note={fmtDate(i.createdAt)}
              extraText={Taxon.settleStatus[Number(i.serveStoreSettled)]}
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

  render () {
    return (
      <View className='orgClaim'>
      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
