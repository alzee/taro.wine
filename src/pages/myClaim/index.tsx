import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Myclaim extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();

  state = {
  }

  componentDidMount () {
    let params = this.instance.router.params

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        let data = res.data
        const self = this
        let query = 'customer=' + data.uid
        if (params.t !== undefined) {
          query = 'store=' + data.org.id
        }
        console.log(query);
        Taro.request({
          url: Env.apiUrl + 'claims?' + query
        }).then((res) =>{
          let records = res.data
          let list = []
          for (let i of records) {
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(i.id)}
              title={i.prize.name + ' ' + i.value}
              note={fmtDate(i.createdAt)}
              extraText={Taxon.claimStatus[i.status]}
              arrow='right'
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

  navToDetail(id){
    Taro.redirectTo({url: '/pages/claimQr/index?id=' + id})
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
