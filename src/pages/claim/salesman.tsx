import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Claim extends Component<PropsWithChildren> {

  uid: int
  oid: int
  state = {}

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res =>{
      this.uid = res.data.id
      this.oid = res.data.org.id
    })
    .then(() => {
      Taro.request({
        url: Env.apiUrl + 'claim/salesman/' + this.uid
      })
      .then((res) =>{
        let list = []
        for (let i of res.data) {
          let extraText = Taxon.settleStatus[Number(i.status)]
          list.push(
            <AtListItem
            title={i.title}
            note={fmtDate(i.createdAt)}
            extraText={extraText}
            />
          )
        }
        this.setState({list})
      })
    })
  }

  render () {
    return (
      <View className='claim'>
      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
