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
  role: int
  voucher: int
  state = []

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
            // this.setState({voucher: res.data.voucher})
            this.voucher = res.data.voucher
          })
        } else {
          this.query = '?page=1&org=' + data.org.id
          Taro.request({
            url: Env.apiUrl + 'orgs/' + data.org.id
          }).then((res) =>{
            // this.setState({voucher: res.data.voucher})
            this.voucher = res.data.voucher
          })
        }
        Taro.request({
          url: Env.apiUrl + 'vouchers' + this.query,
          success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          let records = res.data
          let list = []
          for (let i in records) {
            list.push(
              <AtListItem
              title={Taxon.voucherType[records[i].type]}
              note={fmtDate(records[i].date)}
              extraText={records[i].voucher / 100}
              // arrow='right'
              />
            )
          }
          this.setState({list: list})
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

      { this.state && this.role != 0 &&
      <View className='at-col'>
      <View className='label'>代金券</View>
      <View className='my'>{this.voucher / 100}</View>
      </View>
      }

      </View>

      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
