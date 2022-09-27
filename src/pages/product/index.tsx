import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem, AtCard } from "taro-ui"

export default class Product extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  list = []

  componentWillMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        let orgId = res.data.org.id
        let query = '?page=1&itemsPerPage=20&org=' + orgId
        Taro.request({
          url: Env.apiUrl + 'products' + query,
          success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          console.log(res)
          for (let i in res.data) {
            this.list.push(
              <AtListItem
              title={res.data[i].name}
              note={'规格: ' + res.data[i].spec + ' 库存: ' + res.data[i].stock}
              // extraText={'库存: ' + res.data[i].stock}
              arrow='right'
          />
            )
          }
        })
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='product'>
      <AtList>
      { this.list }
      </AtList>
      </View>
    )
  }
}
