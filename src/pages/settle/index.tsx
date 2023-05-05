import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Settle extends Component<PropsWithChildren> {

  uid: int
  state = {
  }

  componentDidMount () {
    Taro.request({
      url: Env.apiUrl + 'choices/settle_statuses'
    })
    .then(res => {
      this.setState({
        statuses: res.data
      })
    })

    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      this.uid = res.data.id
      Taro.request({
        url: Env.apiUrl + 'settles?salesman=' + this.uid
      })
      .then(res => {
        let list = []
        for (let i of res.data) {
          list.push(
            <AtListItem
            onClick={() => this.navToDetail(i.id)}
            title={i.product.name}
            note={fmtDate(i.createdAt)}
            extraText={this.state.statuses[i.status].value}
            arrow='right'
            />
          )
        }
        this.setState({list})
      })
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({ url: '/pages/chooseLogin/index' })
    })
  }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/settle/qr?id=' + id})
  }

  render () {
    return (
      <View className='settle'>
      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
