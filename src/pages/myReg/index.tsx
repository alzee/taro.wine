import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem} from "taro-ui"
import { fmtDate } from '../../fmtDate'

export default class Myreg extends Component<PropsWithChildren> {
  uid: int
  statuses = ['待处理', '达成']
  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.uid = res.data.id
        Taro.request({
          url: Env.apiUrl + 'regs?submitter=' + this.uid
        }).then((res) => {
          let list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              title={i.orgName + ' - ' + i.name}
              note={fmtDate(i.createdAt)}
              extraText={this.statuses[i.status]}
          />
            )
          }
          this.setState({list})
        })
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  navi() {
    Taro.navigateTo({ url: '/pages/reg/index' })
  }

  render () {
    return (
      <View className='myReg'>
      <AtList>
      { this.state.list }
      </AtList>
      <View className='fixed'>
        <Button className='btn btn-primary' onClick={this.navi}>我要报备</Button>
      </View>
      </View>
    )
  }
}
