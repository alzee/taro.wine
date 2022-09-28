import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'

export default class Withdraw extends Component<PropsWithChildren> {
  list = []
  query: string = '?page=1&itemsPerPage=20'
  tabList = []
  orgid: int
  myWithdraws = []
  downstreamWithdraws = []
  role: int

  componentWillMount () { }

  getData (type: string) {
    const self = this;
    let api: string = 'withdraws'
    let filter: string
    let title: string
    let note: string
    let extraText: string
    let titlePrefix: string = ''
    switch (type) {
      case 'myWithdraws':
        filter = 'applicant'
        title = 'amount'
        note = 'date'
        extraText = 'status'
        break
      case 'downstreamWithdraws':
        filter = 'approver'
        title = 'amount'
        note = 'date'
        extraText = 'status'
        break
    }
    Taro.request({
      url: Env.apiUrl + api + '?page=1&itemsPerPage=15&' + filter + '=' + this.orgid,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      for (let i in res.data){
        if (type == 'downstreamWithdraws') {
          titlePrefix = res.data[i].applicant.name + '-'
        }
        this[type].push(
          <AtListItem
          onClick={() => this.navToDetail(res.data[i].id)}
          title={titlePrefix + '申请提现 '+ res.data[i][title] / 100}
          note={res.data[i][note]}
          extraText={Taxon.status[res.data[i][extraText]]}
          arrow='right'
          />
        )
      }
    })
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        this.orgid = res.data.org.id
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
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

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

  render () {
    return (
      <View className='withdraw'>
      { this.role == 0 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.downstreamWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      { this.role == 1 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtButton className='new-btn' type='secondary' size='small'>申请提现</AtButton>
          <AtList className="list">
          {this.myWithdraws}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.downstreamWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      { this.role == 3 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.myWithdraws}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }
      </View>
    )
  }
}
