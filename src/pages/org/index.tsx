import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Org extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  agencies = []
  stores = []
  restaurants = []
  query: string = '?page=1&itemsPerPage=100'
  list = []
  list1 = []
  list2 = []
  role: int;

  componentDidMount () { 
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
      }
    })

    Taro.request({
      url: Env.apiUrl + 'orgs' + this.query,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      let orgs = res.data
      console.log(orgs)
      for (let i in orgs) {
        switch (orgs[i].type) {
          case 1:
            this.agencies = [...this.agencies, orgs[i]]
            break;
          case 2:
            this.stores = [...this.stores, orgs[i]]
            break;
          case 3:
            this.restaurants = [...this.restaurants, orgs[i]]
            break;
        }
        console.log(this.agencies)
        console.log(this.stores)
        console.log(this.restaurants)
      }

      for (let i in this.stores) {
        this.list.push(
          <AtListItem
          onClick={() => this.navToDetail(this.stores[i].id)}
          title={this.stores[i].name}
          note={this.stores[i].address}
          // extraText='详细信息'
          arrow='right'
          />
        )
      }
      for (let i in this.restaurants) {
        this.list1.push(
          <AtListItem
          onClick={() => this.navToDetail(this.restaurants[i].id)}
          title={this.restaurants[i].name}
          note={this.restaurants[i].address}
          // extraText='详细信息'
          arrow='right'
          />
        )
      }
      for (let i in this.agencies) {
        this.list2.push(
          <AtListItem
          onClick={() => this.navToDetail(this.agencies[i].id)}
          title={this.agencies[i].name}
          note={this.agencies[i].address}
          // extraText='详细信息'
          arrow='right'
          />
        )
      }
    })

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        if (res.data.uid == 0) {
          console.log('need to login');
          //this.navTo('chooseLogin');
        } else {
        }
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      seg: 0,
    }
  }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/orgDetail/index?id=' + id})
  }

  render () {
    let tabList = []
    if (this.role == 0) {
      tabList = [
        { title: '门店' },
        { title: '餐厅' },
        { title: '代理商' },
      ]
    } else {
      tabList = [
        { title: '门店' },
        { title: '餐厅' },
      ]
    }
    return (
      <View className='org'>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
        { this.role == 1 &&
        <AtButton className='new-btn' type='secondary' size='small'>新增门店</AtButton>
        }
          <AtList>
          { this.list }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
        { this.role == 1 &&
        <AtButton className='new-btn' type='secondary' size='small'>新增餐厅</AtButton>
        }
          <AtList>
          { this.list1 }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={2} >
        <AtButton className='new-btn' type='secondary' size='small'>新增代理商</AtButton>
          <AtList>
          { this.list2 }
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
