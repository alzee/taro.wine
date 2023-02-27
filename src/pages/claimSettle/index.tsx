import { Component, PropsWithChildren } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { View, Text, Form, Input, Button, Icon } from '@tarojs/components'

export default class Claimsettle extends Component<PropsWithChildren> {
  oid: int
  otype: int
  id: int
  user = {}
  instance = Taro.getCurrentInstance();
  state = {
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.id = params.id


    Taro.getStorage({
      key: Env.storageKey
    }).then(res => {
      this.oid = res.data.org.id
      this.otype = res.data.org.type
      this.user = res.data
      Taro.request({
        url: Env.apiUrl + 'claims/' + this.id
      }).then((res) => {
        let claim = res.data
        this.setState({
          claim
        })
        console.log(claim);
        let msg: string
        let action: string = 'cannot'
        if (this.otype !== 2 && ! this.user.roles.includes('ROLE_SALESMAN')) {
          msg = 'cannot'
        }
        if (this.otype === 2) {
          switch (claim.status) {
            case 0:
              msg = 'pending'
              action = 'claim'
              break
            case 1:
              msg = 'claimed'
              break
            case 2:
              msg = 'expired'
              break
          }
        }
        if (this.user.roles.includes('ROLE_SALESMAN')) {
          if (claim.settled) {
            msg = 'settled'
          } else {
            msg = 'notsettled'
            action = 'settle'
          }
        }
        this.setState({
          msg,
          action
        })
      })
    })
  }

  done(){
    Taro.redirectTo({url: '/pages/me/index'})
  }

  setClaimed = () => {
    let data = {}
    data.oid = this.oid
    data.id = this.id
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'claim/done',
    })
    .then((res) => {
      if (res.data.code === 0)
        this.setState({
          msg: '恭喜你获得提现金额 ' + res.data.tip / 100 + ' 元',
          action: 'cannot'
        })
    })
  }

  settle = () => {
    let data = {}
    data.id = this.id
    Taro.request({
      method: 'POST',
      data: data,
      url: Env.apiUrl + 'claim/settle',
    })
    .then((res) => {
      let msg = ''
      let action = 'cannot'
      if (res.data.code === 0) {
        msg = '已兑付'
      } else {
        msg = '请先创建领用单'
      }
      this.setState({
        msg,
        action
      })
    })
  }

  render () {
    return (
      <View className='claimSettle'>
        { this.state.action === 'cannot' &&
          <>
          <View className='msg'>{this.state.msg}</View>
          <Button className='btn' onClick={this.done}>确定</Button>
          </>
          ||
          <View className='msg'>
          <Text>{this.state.claim && this.state.claim.prize.name} x {this.state.claim && this.state.claim.value}</Text>
          </View>
        }
        { this.state.action === 'claim' &&
        <Button className='btn' onClick={this.setClaimed}>确定兑奖</Button>
        }
        { this.state.action === 'settle' &&
        <Button className='btn' onClick={this.settle}>确定兑付</Button>
        }
      </View>
    )
  }
}
