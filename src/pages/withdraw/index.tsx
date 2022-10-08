import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Withdraw extends Component<PropsWithChildren> {
  query: string = '?page=1'
  tabList = []
  oid: int
  role: int
  state = {}
  withdrawable: int
  withdrawing: int

  componentWillMount () { }

  getData (type: string) {
    const self = this;
    let api: string = 'withdraws'
    let filter: string
    let title: string
    let extraText: string
    let titlePrefix: string = ''
    switch (type) {
      case 'myWithdraws':
        filter = 'applicant'
        title = 'amount'
        extraText = 'status'
        break
      case 'downstreamWithdraws':
        filter = 'approver'
        title = 'amount'
        extraText = 'status'
        break
    }
    Taro.request({
      url: Env.apiUrl + api + '?page=1&' + filter + '=' + this.oid,
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
        this.oid = res.data.org.id
        this.role = res.data.role
        const self = this;
        switch (this.role) {
          case 0:
            this.tabList = [{ title: '下级提现' }]
            this.getData('downstreamWithdraws')
            break
          case 1:
            this.tabList = [{ title: '我的提现' }, { title: '下级提现' }]
            this.getData('myWithdraws')
            this.getData('downstreamWithdraws')
            break
          case 3:
            this.tabList = [{title: '我的提现'}]
            this.getData('myWithdraws')
            break
        }
        if (this.role == 1 || this.role == 3) {
          Taro.request({
            url: Env.apiUrl + 'orgs/' + data.org.id
          }).then((res) =>{
            this.setState({
              withdrawable: res.data.withdrawable,
              withdrawing: res.data.withdrawing
            })
          })
        }
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log('u see me')
  }

  componentDidHide () { }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/withdrawDetail/index?id=' + id})
  }

  handleClick (value) {
    console.log(value)
    this.setState({
      current: value
    })
  }

  create () {
    Taro.navigateTo({url: '/pages/withdrawNew/index'})
  }

  render () {
    return (
      <View className='withdraw'>
      <View className='at-row card'>

      { this.state && (this.role == 1 || this.role == 3) &&
      <View className='at-col'>
      <View className='label'>可提金额</View>
      <View className='withdrawable'>{this.state.withdrawable / 100}</View>
      </View>
      }

      { this.state && (this.role == 1 || this.role == 3) &&
      <View className='at-col'>
      <View className='label'>提现中</View>
      <View className='withdrawable'>{this.state.withdrawing / 100}</View>
      </View>
      }
      </View>

      { this.role == 0 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.downstreamWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      { this.role == 1 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={this.create}>申请提现</AtButton>
          <AtList className="list">
          {this.state.myWithdraws}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.downstreamWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      { this.role == 3 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={this.create}>申请提现</AtButton>
          <AtList className="list">
          {this.state.myWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      </View>
    )
  }
}
