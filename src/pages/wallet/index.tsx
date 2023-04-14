import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Wallet extends Component<PropsWithChildren> {

  entity = Taro.getCurrentInstance().router.params.entity
  oid: int
  uid: int
  roles: array = []
  state = {
    withdrawable: 0,
    list: undefined
  }

  getData (entity: string, id: int) {
    let query: string = '?' + entity + '=' + id
    Taro.request({
      url: Env.apiUrl + 'choices/transaction_types'
    })
    .then(res => {
      this.setState({types: res.data})
    })
    .then(() => {
      Taro.request({
        url: Env.apiUrl + 'transactions' + query
      })
      .then((res) =>{
        let list = []
        let type
        for (let i of res.data){
          type = this.state.types.find(type => type.id === i.type)
          list.push(
            <AtListItem
            title={type.value}
            note={fmtDate(i.createdAt)}
            extraText={i.amount / 100}
            />
          )
        }
        this.setState({list})
      })
    })
  }

  componentDidMount () {
    let entity = this.entity
    let id: int
    Taro.getStorage({
      key: Env.storageKey
    })
    .then( res => {
      this.oid = res.data.org.id
      this.uid = res.data.id
      this.roles = res.data.roles
      if (entity === 'user') {
        id = this.uid
      }
      if (entity === 'org') {
        id = this.oid
      }

      this.getData(entity, id)

      Taro.request({
        url: Env.apiUrl + `${entity}s/` + id
      })
      .then((res) =>{
        this.setState({
          withdrawable: res.data.withdrawable,
        })
      })
    })
    .catch( err => {
      console.log(err)
    })
  }

  create () {
    Taro.redirectTo({url: '/pages/withdrawNew/index'})
  }

  move = () => {
    let data = {}
    data.oid = this.oid
    data.uid = this.uid
    Taro.showModal({
      title: '转入个人微信',
      content: '将机构可提现金额转至机构管理员个人微信？'
    })
    .then(res => {
      if (res.confirm) {
        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'withdrawable_move_to_person',
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
                  Taro.navigateBack({ delta: 1 })
                }, 500)
            })
          }
        })
      } else if (res.cancel) {
      }
    })
  }

  render () {
    return (
      <View className='wallet main'>

      <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>
      </View>

      <AtList className="list">
      {this.state.list}
      </AtList>

      <View className='fixed'>
      { this.entity === 'user' &&
        <Button className='btn btn-primary' onClick={this.create}>申请提现</Button>
      }
      { (this.entity === 'org' && this.roles.includes('ROLE_ORG_ADMIN')) &&
      <Button className='btn btn-primary' onClick={this.move}>转入我的钱包</Button>
      }
      </View>

      </View>
    )
  }
}
