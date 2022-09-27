import { Component, PropsWithChildren } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Orders extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;
  sales = []
  returnsToMe = []
  buys = []
  myReturns = []
  retails = []
  retailReturns = []
  dines = []
  tabList = []
  orgid: int

  componentWillMount () { }

  getSales () {
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orders' + '?page=1&itemsPerPage=15&seller=' + this.orgid,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      console.log(res)
      for (let i in res.data){
        this.sales.push(
          <AtListItem
          title={res.data[i].amount}
          note={res.data[i].date}
          extraText={i}
          />
        )
      }
    })
  }

  getReturnsToMe () {
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'orders' + '?page=1&itemsPerPage=15&seller=' + res.data.org.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      for (let i in res.data){
        console.log(i)
        this.sales.push(
          <AtListItem
          title={res.data.amount}
          note={res.data.date}
          extraText={i}
          />
        )
      }
    })
  }
  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
        if (this.role != 4) {
          this.orgid = res.data.org.id
        }
        switch (this.role) {
          case 0:
            this.tabList = [{ title: '销售' }, {title: '售后退货'}]
            this.getSales()
            break
          case 1:
            this.tabList = [{ title: '进货' }, { title: '销售' }, {title: '我的退货'}, {title: '售后退货'}]
            break
          case 2:
            this.tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}]
            break
          case 3:
            this.tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}, {title: '餐饮'}]
            break
          case 4:
            this.tabList = [{title: '买酒'}, {title: '餐饮'}]
            break
        }
      }
    })


    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.returnsToMe.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.buys.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.myReturns.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.retails.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.retailReturns.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  scan(){
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        let data = res.result
        Taro.navigateTo({url: '/pages/retailNew/index?data=' + data})
      }
    })
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    console.log(value)
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='orders'>

      { this.role == 0 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtButton className='new-btn' type='secondary' size='small'>新增销售</AtButton>
          <AtList className="list">
          {this.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small'>新增售后退货</AtButton>
          <AtList className="list">
          {this.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 1 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small'>新增销售</AtButton>
          <AtList className="list">
          {this.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtButton className='new-btn' type='secondary' size='small'>新增售后退货</AtButton>
          <AtList className="list">
          {this.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 2 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small'>新增零售</AtButton>
          <AtList className="list">
          {this.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtButton className='new-btn' type='secondary' size='small'>新增零售退货</AtButton>
          <AtList className="list">
          {this.retailReturns}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 3 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small'>新增零售</AtButton>
          <AtList className="list">
          {this.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtButton className='new-btn' type='secondary' size='small'>新增零售退货</AtButton>
          <AtList className="list">
          {this.retailReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtButton className='new-btn' type='secondary' size='small'>新增餐饮消费</AtButton>
          <AtList className="list">
          {this.dines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 4 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.dines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      </View>
    )
  }
}
