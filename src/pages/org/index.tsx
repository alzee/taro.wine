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

  componentDidMount () { 
    const self = this;
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

  render () {
    const tabList = [
      { title: '门店' },
      { title: '餐厅' },
      { title: '代理商' },
    ]
    return (
      <View className='org'>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
        <AtButton className='new-btn' type='secondary' size='small'>新增门店</AtButton>
          <AtList>
          <AtListItem
          title='门店1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='门店2号'
          arrow='right'
          />
          <AtListItem
          title='门店3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
        <AtButton className='new-btn' type='secondary' size='small'>新增餐厅</AtButton>
          <AtList>
          <AtListItem
          title='餐厅1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='餐厅2号'
          arrow='right'
          />
          <AtListItem
          title='餐厅3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={2} >
          <AtList>
          <AtListItem
          title='代理商1号'
          // note='描述信息'
          // extraText='详细信息'
          arrow='right'
          />
          <AtListItem
          title='代理商2号'
          arrow='right'
          />
          <AtListItem
          title='代理商3号'
          arrow='right'
          />
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
