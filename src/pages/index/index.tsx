import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  apiUrl = Env.apiUrl;
  imgUrl = Env.imgUrl;
  list0 = [];
  list1 = [];
  state = {}
  //  constructor () {
  //    super(...arguments)
  //    this.state = {
  //    }
  //  }

  navToNode(id: int) {
    Taro.navigateTo({ url: '/pages/node/index?id=' + id })
  }

  componentDidMount () {
    const self = this;

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0',
      success: function (res) { self.setState({nodes0: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      console.log(nodes)
      for (let i in nodes) {
        self.list0.push(
          <SwiperItem key={i}>
          <Image className='img' mode='scaleToFill' src={ this.imgUrl + 'node/' + nodes[i].img } onClick={()=>this.navToNode(nodes[i].id)}></Image>
          </SwiperItem>
        );
      }
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=2&tag=1',
      success: function (res) { self.setState({nodes1: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      console.log(nodes)
      for (let i in nodes) {
        self.list1.push(
          <View className="featured" key={i}>
          <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + nodes[i].img} onClick={()=>this.navToNode(nodes[i].id)} ></Image>
          <Text className="text">
          {nodes[i].title}
          </Text>
          </View>
        );
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>

      <Swiper
      className='swiper'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay>
      {this.list0}
      </Swiper>

      <View className='at-row highlight'>
      <View className="at-col"  onClick={() => Taro.navigateTo({url: '/pages/showVideo/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'jiannan.png'}></AtAvatar>
      <Text>剑南老窖</Text>
      </View>
      <View className="at-col" onClick={() => Taro.switchTab({url: '/pages/org/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'store.png'}></AtAvatar>
      <Text>门店导航</Text>
      </View>
      <View className="at-col" onClick={() => Taro.switchTab({url: '/pages/org/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'dine.png'}></AtAvatar>
      <Text>合作餐厅</Text>
      </View>
      </View>

      {this.state.nodes1 && this.list1}

      </View>
    )
  }
}
