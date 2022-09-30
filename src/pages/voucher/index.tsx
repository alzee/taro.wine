import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Voucher extends Component<PropsWithChildren> {
  query: string = '?page=1'
  list = []
  orgId: int

  componentWillMount () { }

  componentDidMount () {
    console.log(Taxon.voucherType)
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this;
        if (data.role == 4) {
          this.query = '?page=1&consumer=' + data.cid
        } else {
          this.query = '?page=1&org=' + data.org.id
        }
        Taro.request({
          url: Env.apiUrl + 'vouchers' + this.query,
          success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          let records = res.data
          for (let i in records) {
            this.list.push(
              <AtListItem
              title={Taxon.voucherType[records[i].type]}
              note={fmtDate(records[i].date)}
              extraText={records[i].voucher / 100}
              // arrow='right'
              />
            )
          }
        })
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='voucher'>
      <AtList className="list">
      {this.list}
      </AtList>
      </View>
    )
  }
}
