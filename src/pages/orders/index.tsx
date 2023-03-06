import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'

export default class Orders extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  otype: int;
  tabList = []
  orgid: int
  uid: int

  create(type: int){
    let page: string
    switch (type) {
      case 1:
        page = 'orderNew'
        break
      case 10:
        page = 'returnNew'
        break
      case 2:
        page = 'retailNew'
        break
      case 20:
        page = 'retailReturnNew'
        break
      case 3:
        page = 'dineNew'
        break
    }
    Taro.navigateTo({url: '/pages/' + page + '/index'})
  }

  getData (type: string) {
    const self = this;
    let query: string
    let api: string
    let filter: string
    let title: string
    let extraText: string
    let me = this.orgid
    switch (type) {
      case 'sales':
        api = 'orders'
        filter = 'exists%5BorderItems%5D=true&seller'
        extraText = 'amount'
        break
      case 'returnsToMe':
        api = 'returns'
        filter = 'exists%5BreturnItems%5D=true&recipient'
        extraText = 'amount'
        break
      case 'buys':
        api = 'orders'
        filter = 'exists%5BorderItems%5D=true&buyer'
        extraText = 'amount'
        break
      case 'myReturns':
        api = 'returns'
        filter = 'exists%5BreturnItems%5D=true&sender'
        extraText = 'amount'
        break
      case 'retails':
        api = 'retails'
        filter = 'store'
        extraText = 'amount'
        break
      case 'dines':
        api = 'order_restaurants'
        filter = 'restaurant'
        extraText = 'voucher'
        break
      case 'myDines':
        api = 'order_restaurants'
        filter = 'customer'
        extraText = 'voucher'
        me = this.uid
        break
      case 'myRetails':
        api = 'retails'
        filter = 'customer'
        extraText = 'amount'
        me = this.uid
        break
    }
    Taro.request({
      url: Env.apiUrl + api + '?page=1&' + filter + '=' + me,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      let list = []
      for (let i of res.data){
        switch (type) {
          case 'dines':
            title = i.customer.name
            break
          case 'myDines':
            title = i.restaurant.name
            break
          case 'myRetails':
            title = i.store.name
            break
          case 'retails':
            title = i.product.name + ' x ' + i.quantity
            break
          case 'sales':
            title = i.buyer.name
            break
          case 'buys':
            title = i.orderItems[0].product.name + ' x ' + i.orderItems[0].quantity + ' ...'
            break
          case 'myReturns':
            title = i.returnItems[0].product.name + ' x ' + i.returnItems[0].quantity + ' ...'
            break
          case 'returnsToMe':
            title = i.sender.name
            break
          default:
          title = '编号: ' + i.id
        }
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(i.id, type)}
          title={title}
          note={fmtDate(i.date)}
          extraText={i[extraText] / 100}
          arrow='right'
          />
        )
      }
      this.setState({[type]: list})
    })
  }

  navToDetail(id: int, type: string){
    let page: string
    if (type == 'sales' || type == 'buys') {
      page = 'orderDetail'
    }
    if (type == 'returnsToMe' || type == 'myReturns') {
      page = 'returnDetail'
    }
    if (type == 'retails') {
      page = 'retailDetail'
    }
    if (type == 'dines') {
      page = 'dineDetail'
    }
    if (type == 'myRetails') {
      page = 'retailDetail'
    }
    if (type == 'myDines') {
      page = 'dineDetail'
    }
    Taro.navigateTo({url: '/pages/' + page + '/index?id=' + id})
  }
  
  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey
    })
    .then((res) => {
      self.setState({data: res.data})
      this.otype = res.data.otype
      if (this.otype != 4){
        this.orgid = res.data.org.id
      } else {
        this.uid = res.data.uid
      }
      switch (this.otype) {
        case 0:
          this.tabList = [{ title: '销售' }, {title: '退货'}]
        this.getData('sales')
        this.getData('returnsToMe')
        break
        case 1:
          this.tabList = [{ title: '进货' }, { title: '销售' }, {title: '退货'}, {title: '售后退货'}]
        this.getData('buys')
        this.getData('sales')
        this.getData('myReturns')
        this.getData('returnsToMe')
        break
        case 2:
          this.tabList = [{title: '进货'}, {title: '退货'}, {title: '零售'}]
        this.getData('buys')
        this.getData('myReturns')
        this.getData('retails')
        break
        case 3:
          this.tabList = [{title: '进货'}, {title: '退货'}, {title: '零售'}, {title: '餐饮'}]
        this.getData('buys')
        this.getData('myReturns')
        this.getData('retails')
        this.getData('dines')
        break
        case 4:
          this.tabList = [{title: '酒品消费'}, {title: '餐饮消费'}]
        this.getData('myRetails')
        this.getData('myDines')
        break
        case 10:
          this.tabList = [{ title: '进货' }, { title: '销售' }, {title: '退货'}, {title: '售后退货'}]
        this.getData('buys')
        this.getData('sales')
        this.getData('myReturns')
        this.getData('returnsToMe')
        break
        case 11:
          this.tabList = [{ title: '进货' }, { title: '销售' }, {title: '退货'}, {title: '售后退货'}]
        this.getData('buys')
        this.getData('sales')
        this.getData('myReturns')
        this.getData('returnsToMe')
        break
        case 12:
          this.tabList = [{title: '进货'}, {title: '退货'}, {title: '零售'}]
        this.getData('buys')
        this.getData('myReturns')
        this.getData('retails')
        break
      }
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({ url: '/pages/chooseLogin/index' })
    })
  }

  scan(type: int){
    let page: string
    switch (type) {
      case 0:
        page = 'retailNew'
        break
      case 10:
        page = 'retailReturnNew'
        break
      case 1:
        page = 'dineNew'
        break
    }
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        let text = res.result
        console.log(text)
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substr(1);
        }
        console.log(text)
        let data = JSON.parse(text)
        console.log(data)
        Taro.navigateTo({url: '/pages/' + page + '/index?uid=' + data.uid + '&timestamp=' + data.timestamp + '&name=' + data.name})
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
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='orders'>

      { this.otype == 0 &&
      <AtTabs className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { (this.otype == 1 || this.otype == 10 || this.otype == 11) &&
      <AtTabs className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtList className="list">
          {this.state.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { (this.otype == 2 || this.otype == 12) &&
      <AtTabs className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.state.retails}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.otype == 3 &&
      <AtTabs className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.state.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtList className="list">
          {this.state.dines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.otype == 4 &&
      <AtTabs className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.myRetails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myDines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      </View>
    )
  }
}
