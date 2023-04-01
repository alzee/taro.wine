import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem, AtCard } from "taro-ui"

export default class Stock extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  oid = this.instance.router.params.oid
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
        if (this.oid === undefined) {
          this.oid = res.data.org.id
        }
        Taro.request({
          url: Env.apiUrl + 'stocks?org=' + this.oid,
        }).then((res) =>{
          console.log(res.data);
          let list = []
          for (let i of res.data) {
            list.push(
              <AtListItem
              // onClick={() => this.navToDetail(i.product.id)}
              title={i.product.name}
              note={'规格: ' + i.product.spec + ' 库存: ' + i.stock}
              extraText={'库存: ' + i.stock}
              // arrow='right'
              thumb={Env.imgUrl + 'product/' + i.product.img}
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
