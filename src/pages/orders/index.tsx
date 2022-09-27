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

  getData (type: string) {
    const self = this;
    let query: string
    let api: string
    let filter: string
    let title: string
    let note: string
    let extraText: string
    switch (type) {
      case 'sales':
        api = 'orders'
        filter = 'seller'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'returnsToMe':
        api = 'returns'
        filter = 'recipient'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'buys':
        api = 'orders'
        filter = 'buyer'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'myReturns':
        api = 'returns'
        filter = 'sender'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'retails':
        api = 'retail'
        filter = 'store'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'retailReturns':
        api = 'retailReturn'
        filter = 'store'
        title = 'amount'
        note = 'date'
        extraText = 'voucher'
        break
      case 'dines':
        api = 'orderRestaurant'
        filter = 'restaurant'
        title = 'voucher'
        note = 'date'
        extraText = 'voucher'
        break
    }
    Taro.request({
      url: Env.apiUrl + api + '?page=1&itemsPerPage=15&=' + filter + '=' + this.orgid,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      for (let i in res.data){
        this[type].push(
          <AtListItem
          title={res.data[i][title]}
          note={res.data[i][note]}
          extraText={res.data[i][extraText]}
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
            this.getData('sales')
            this.getData('returnsToMe')
            break
          case 1:
            this.tabList = [{ title: '进货' }, { title: '销售' }, {title: '我的退货'}, {title: '售后退货'}]
            this.getData('buys')
            this.getData('sales')
            this.getData('myReturns')
            this.getData('returnsToMe')
            break
          case 2:
            this.tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}]
            this.getData('myReturns')
            this.getData('retails')
            this.getData('retailReturns')
            break
          case 3:
            this.tabList = [{title: '我的退货'}, {title: '零售'}, {title: '零售退货'}, {title: '餐饮'}]
            this.getData('myReturns')
            this.getData('retails')
            this.getData('retailReturns')
            this.getData('dines')
            break
          case 4:
            this.tabList = [{title: '买酒'}, {title: '餐饮'}]
            this.getData('retails')
            this.getData('dine')
            break
        }
      }
    })
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
