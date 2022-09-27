import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Withdraw extends Component<PropsWithChildren> {
  list = []
  query: string = '?page=1&itemsPerPage=20'

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this;
        if (data.role == 4) {
        } else {
        }
        Taro.request({
          url: Env.apiUrl + 'withdraws' + this.query,
          success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          let records = res.data
          for (let i in records) {
            this.list.push(
              <AtListItem
              title={'提现 ' + records[i].amount / 100}
              note={records[i].date}
              extraText={records[i].status}
              // arrow='right'
              />
            )
          }
        })
      },
      fail: res => {
        console.log('fuck')
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick () {
    Taro.navigateBack()
  }

  render () {
    return (
      <View className='withdraw'>
          <AtList className="list first">
          {this.list}
          </AtList>
      </View>
    )
  }
}
