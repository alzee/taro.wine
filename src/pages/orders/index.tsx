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
  list = []
  list0 = []
  list1 = []
  sales = []
  returnsToMe = []
  buys = []
  myReturns = []
  retails = []
  retailReturns = []
  dines = []

  componentWillMount () { }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
      }
    })

    for (let i in [1,2,3,4,5]){
      console.log(i)
      this.list0.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText={i}
      />
      )
    }
    this.list = this.list0

    for (let i in [6,7,8,9,10]){
      console.log(i)
      this.list1.push(
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
    switch(value){
      case 0:
        this.list=this.list0
        break
      case 1:
        this.list=this.list1
        break
    }
  }

  render () {
    let tabList = []
    switch (this.role) {
      case 0:
        tabList = [{ title: '销售' }, {title: '售后退货'}]
        break
      case 1:
        tabList = [{ title: '进货' }, { title: '销售' }, {title: '我的退货'}, {title: '售后退货'}]
        break
      case 2:
        tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}]
        break
      case 3:
        tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}, {title: '餐饮'}]
        break
      case 4:
        tabList = [{title: '买酒'}, {title: '餐饮'}]
        break
    }

    let panes = []
    for (let i in tabList) {
      panes.push(
        <AtTabsPane current={this.state.current} index={0} >
        </AtTabsPane>
      )
    }

    let list = [
    ]
    list.push(
      <AtListItem
      title='代理商-请货'
      note='2022-09-05 19:05:05'
      extraText='50'
      />
    )

    return (
      <View className='orders'>

      <AtTabs scroll className='first' current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>

      { this.role == 0 &&
        <div>
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
        </div>
      }

      { this.role == 1 &&
        <div>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
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
          <AtList className="list">
          {this.returnsToMe}
          </AtList>
        </AtTabsPane>
        </div>
      }

      { this.role == 2 &&
        <div>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.retailReturns}
          </AtList>
        </AtTabsPane>
        </div>
      }

      { this.role == 3 &&
        <div>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.retailReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtList className="list">
          {this.dines}
          </AtList>
        </AtTabsPane>
        </div>
      }

      { this.role == 4 &&
        <div>
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
        </div>
      }

      </AtTabs>

      </View>
    )
  }
}
