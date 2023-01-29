import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem} from "taro-ui"

export default class Myreg extends Component<PropsWithChildren> {
  cid: int
  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.cid = res.data.cid
        Taro.request({
          url: Env.apiUrl + 'regs?submitter=' + this.cid
        }).then((res) => {
          let list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              title={i.orgName}
              note={i.name}
              // extraText={i.stock}
          />
            )
          }
          this.setState({list})
        })
      }
    })
  }

  render () {
    return (
      <View className='myReg'>
      <AtList>
      { this.state.list }
      </AtList>
      </View>
    )
  }
}
