import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Withdraw extends Component<PropsWithChildren> {
  tabList = []
  oid: int
  cid: int
  role: int
  state = {
    current: 0,
  }

  getData (type: string) {
    const self = this;
    let api: string = 'withdraws'
    // let filter: string
    let title: string
    let extraText: string
    let titlePrefix: string = ''
    let query: string
    switch (type) {
      case 'consumerWithdraws':
        // filter = 'applicant'
        title = 'amount'
        extraText = 'status'
        query = '?consumers=' + this.cid
        break
      case 'orgWithdraws':
        // filter = 'applicant'
        title = 'amount'
        extraText = 'status'
        query = '?applicant=' + this.oid
        break
      case 'downstreamWithdraws':
        // filter = 'approver'
        title = 'amount'
        extraText = 'status'
        query = '?approver=' + this.oid
        break
      case 'all':
        // filter = 'approver'
        title = 'amount'
        extraText = 'status'
        query = ''
        break
    }
    Taro.request({
      url: Env.apiUrl + api + query
    }).then((res) =>{
      let list = []
      for (let i in res.data){
        if (type == 'downstreamWithdraws') {
          titlePrefix = res.data[i].applicant.name + '-'
        }
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(res.data[i].id)}
          title={titlePrefix + '申请提现 '+ res.data[i][title] / 100}
          note={fmtDate(res.data[i].date)}
          extraText={Taxon.status[res.data[i][extraText]]}
          arrow='right'
          />
        )
      }
      this.setState({[type]: list})
    })
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        let query
        this.role = res.data.role
        const self = this;
        if (this.role == 4) {
          this.cid = res.data.cid
          this.getData('consumerWithdraws')
          query = 'consumers/' + this.cid
        } else {
          this.oid = res.data.org.id
          query = 'orgs/' + this.oid
          if (this.role == 0 ) {
            this.getData('all')
          }
          if (this.role == 1 ) {
            this.tabList = [{ title: '我的提现' }, { title: '下级提现' }]
            this.getData('orgWithdraws')
            this.getData('downstreamWithdraws')
          }
          if (this.role == 3 || this.role == 10 || this.role == 11 || this.role == 12) {
            this.getData('orgWithdraws')
          }
        }

        Taro.request({
          url: Env.apiUrl + query
        }).then((res) =>{
          this.setState({
            withdrawable: res.data.withdrawable,
            withdrawing: res.data.withdrawing
          })
        })
      },
      fail: res => {
      },
    });
  }

  componentDidShow () {
    console.log('u see me')
  }

  navToDetail(id){
    Taro.redirectTo({url: '/pages/withdrawDetail/index?id=' + id})
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  create () {
    Taro.redirectTo({url: '/pages/withdrawNew/index'})
  }

  render () {
    return (
      <View className='withdraw'>

      { this.state && this.role != 0 &&
        <View className='at-row card'>
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='number'>{this.state.withdrawable / 100}</View>
      </View>

      <View className='at-col'>
      <View className='label'>提现中</View>
      <View className='number'>{this.state.withdrawing / 100}</View>
      </View>
      </View>
      }

      { this.role == 0 &&
        <AtList className="list">
      {this.state.all}
      </AtList>
      }
      { this.role == 1 &&
        <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
      <AtTabsPane current={this.state.current} index={0} >
      <AtList className="list">
      {this.state.orgWithdraws}
      </AtList>
      </AtTabsPane>
      <AtTabsPane current={this.state.current} index={1} >
      <AtList className="list">
      {this.state.downstreamWithdraws}
      </AtList>
      </AtTabsPane>
      </AtTabs>
      }
      { (this.role == 3 || this.role == 10 || this.role == 11 || this.role == 12) &&
        <AtList className="list">
      {this.state.orgWithdraws}
      </AtList>
      }

      <View className='fixed'>
      { this.role != 0 && this.state.current == 0 &&
        <Button className='btn btn-primary' onClick={this.create}>申请提现</Button>
      }
      </View>

      </View>
    )
  }
}
