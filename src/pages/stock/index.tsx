import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem, AtCard } from "taro-ui"

export default class Stock extends Component<PropsWithChildren> {
  role: int
  orgid: int
  state = {}

  navToDetail(pid){
    Taro.navigateTo({url: '/pages/productDetail/index?pid=' + pid})
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.orgid = res.data.org.id
        this.role = res.data.role
        Taro.request({
          url: Env.apiUrl + 'stocks?org=' + this.orgid,
        }).then((res) =>{
          console.log(res.data);
          let list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(i.product.id)}
              title={i.product.name}
              note={'规格: ' + i.product.spec + ' 库存: ' + i.stock}
              extraText={'库存: ' + i.stock}
              arrow='right'
              thumb={Env.imgUrl + 'product/' + i.product.img}
          />
            )
          }
          this.setState({list: list})
        })
      }
    })
  }

  render () {
    return (
      <View className='product'>
      <AtList>
      { this.state.list }
      </AtList>
      </View>
    )
  }
}
