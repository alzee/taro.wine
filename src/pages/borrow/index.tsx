import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Borrow extends Component<PropsWithChildren> {

  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this
        Taro.request({
          url: Env.apiUrl + 'borrows?salesman=' + data.uid,
          success: function (res) {}
        }).then((res) =>{
          let records = res.data
          let list = []
          for (let i of records) {
            console.log(i);
            list.push(
              <AtListItem
              title={i.claim.name}
              note={fmtDate(i.createdAt)}
              extraText={Taxon.borrowStatus[i.status]}
              // arrow='right'
              />
            )
          }
          this.setState({list: list})
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });
  }

  new () {
    Taro.redirectTo({url: '/pages/borrow/new'})
  }

  render () {
    return (
      <View className='borrow'>
      <AtList className="list">
      {this.state.list}
      </AtList>

      <View className='fixed'>
        <Button className='btn btn-primary' onClick={this.new}>新增领用</Button>
      </View>
      </View>
    )
  }
}
