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
  role: int
  voucher: int
  witdrawable: int

  componentWillMount () { }

  componentDidMount () {
    console.log(Taxon.voucherType)
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        this.role = res.data.role
        const self = this;
        if (data.role == 4) {
          this.query = '?page=1&consumer=' + data.cid
          Taro.request({
            url: Env.apiUrl + 'consumers/' + data.cid
          }).then((res) =>{
            this.voucher = res.data.voucher
          })
        } else {
          this.query = '?page=1&org=' + data.org.id
          Taro.request({
            url: Env.apiUrl + 'orgs/' + data.org.id
          }).then((res) =>{
            this.voucher = res.data.voucher
            this.witdrawable = res.data.witdrawable
          })
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

      <View className='at-row card'>

      { this.role != 0 &&
      <View className='at-col'>
      <View className='label'>代金券</View>
      <View className='my'>{this.voucher}</View>
      </View>
      }

      { (this.role == 1 || this.role == 3) &&
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='witdrawable'>{this.witdrawable}</View>
      </View>
      }

      </View>

      <AtList className="list">
      {this.list}
      </AtList>
      </View>
    )
  }
}
