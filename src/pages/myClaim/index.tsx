import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Myclaim extends Component<PropsWithChildren> {

  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this
        Taro.request({
          url: Env.apiUrl + 'claims?customer=' + data.uid,
          success: function (res) {}
        }).then((res) =>{
          let records = res.data
          let list = []
          for (let i of records) {
            console.log(i);
            list.push(
              <AtListItem
              title={i.prize.name + ' ' + i.value}
              note={fmtDate(i.createdAt)}
              extraText={Taxon.claimStatus[i.status]}
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

  render () {
    return (
      <View className='myClaim'>
      <AtList className="list">
      {this.state.list}
      </AtList>
      </View>
    )
  }
}
