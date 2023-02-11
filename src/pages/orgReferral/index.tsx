import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'

export default class Orgreferral extends Component<PropsWithChildren> {
  state = {
    seg: 0,
  }

  componentWillMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let uid = res.data.uid
        let list
        Taro.request({
          url: Env.apiUrl + 'orgs?referrer=' + uid,
        }).then((res) =>{
          list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              // onClick={}
              title={i.name}
              note={i.contact}
              // extraText={}
              // arrow='right'
              className='list-item'
              />
            )
          }
          this.setState({list1: list})
        })

        Taro.request({
          url: Env.apiUrl + 'rewards?&referrer=' + uid,
          // url: Env.apiUrl + 'refretail/' + 55,
        }).then((res) =>{
          console.log(res.data)
          list = []
          let record
          for (let i of res.data) {
            if (i.type == 0 || i.type == 1) {
              record = i.ord.orderItems[0]
            }
            if (i.type == 2 || i.type == 3) {
              record = i.retail
            }
            list.push(
              <AtListItem
              title={record.product.name + ' x ' + record.quantity}
              note={fmtDate(i.createdAt)}
              extraText={i.amount / 100}
              className='list-item'
              />
            )
          }
          this.setState({list2: list})
        })
      }
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }

  componentDidMount () { }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }

  render () {
    let tabList = [
        { title: '我介绍的' },
        { title: '佣金明细' },
    ]
    return (
      <View className='orgReferral'>
      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
          <AtList>
          { this.state.list1}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
          <AtList>
          { this.state.list2}
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
