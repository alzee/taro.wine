import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem} from "taro-ui"
import { fmtDate } from '../../fmtDate'

export default class Myreg extends Component<PropsWithChildren> {
  cid: int
  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({data: res.data})
        this.cid = res.data.cid
        Taro.request({
          url: Env.apiUrl + 'regs?submitter=' + this.cid
        }).then((res) => {
          let list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              title={i.orgName}
              note={fmtDate(i.createdAt)}
              extraText={i.name}
          />
            )
          }
          this.setState({list})
        })
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
