import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Collect extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  type: string
  isStore: bool = false
  uid: int
  oid: int
  state = {
    collects: [],
    collectList: [],
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.type = params.type
    if (this.type === 'store') {
      this.isStore = true
    }

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.uid = res.data.uid
        this.oid = res.data.org.id
        let query: string
        query = 'user=' + this.uid
        if (this.isStore) {
          query = 'store=' + this.oid
        }
        Taro.request({
          url: Env.apiUrl + 'collects?' + query
        }).then((res) =>{
          console.log(res.data);
          let collectList = []
          for (let i in res.data) {
            collectList.push(
              <AtListItem
              onClick={() => this.settle(i)}
              title={res.data[i].product.name}
              // note={fmtDate(i.date)}
              extraText={res.data[i].qty}
              // arrow='right'
              />
            )
          }
          this.setState({
            collectList,
            collects: res.data
          })
        })
      },
      fail: res => {
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });
  }

  settle(index: int){
    if (this.state.collects[index].qty < 3) {
      Taro.showModal({
        title: '提示',
        content: '须集齐3个才能兑换',
        showCancel: false
      })
      .then(res => {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      })
    } else {
      Taro.showModal({
        title: '确认兑换',
        content: '兑换再来一瓶: ' + this.state.collects[index].product.name,
      })
      .then(res => {
        if (res.confirm) {
          let data = {}
          data.uid = this.uid
          data.id = this.state.collects[index].id
          Taro.request({
            method: 'POST',
            url: Env.apiUrl + 'collect',
            data
          })
          .then(res => {
            if (res.data.code === 0) {
              Taro.showToast({
                title: '已完成',
                icon: 'success',
                duration: 2000
              })
              .then(res => {
                setTimeout(
                  () => {
                    Taro.redirectTo({ url: '/pages/myClaim/index' })
                  }, 500
                )
              })
            }
          })
        } else if (res.cancel) {
        }
      })
    }
  }

  render () {
    return (
      <View className='collect'>
      <AtList className="list">
      {this.state.collectList}
      </AtList>
      </View>
    )
  }
}
