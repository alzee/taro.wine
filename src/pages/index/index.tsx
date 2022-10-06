import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { HttpService } from '../../services/http.service'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  apiUrl = Env.apiUrl;
  imgUrl = Env.imgUrl;
  nodes = [];
  nodes0 = [];
  nodes1 = [];
  list0 = [];
  list1 = [];
  http: HttpService;

  navToNode(id: int) {
    Taro.navigateTo({ url: '/pages/node/index?id=' + id })
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  navTo(page: string) {
    Taro.navigateTo({ url: '/pages/' + page + '/index' })
  }

  componentDidMount () {
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'nodes?order%5Bid%5D=asc',
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.nodes = res.data;
      for (let i in this.nodes) {
        if (this.nodes[i].tag == 0) {
          this.nodes0.push(this.nodes[i]);
        }
        if (this.nodes[i].tag == 1) {
          this.nodes1.push(this.nodes[i]);
        }
      }
      for (let i in this.nodes0) {
        if (i < 3) {
          this.list0.push(
            <SwiperItem key={i}>
            <View className='highlight0'>
            <Image className='img' mode='scaleToFill' src={ this.imgUrl + 'node/' + this.nodes0[i].img } onClick={()=>this.navToNode(this.nodes0[i].id)}></Image>
            </View>
            </SwiperItem>
          );
        }
      }
      for (let i in this.nodes1) {
        if (i < 2) {
          this.list1.push(
            <View className="highlight2" key={i}>
            <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + this.nodes1[i].img} onClick={()=>this.navToNode(this.nodes1[i].id)} ></Image>
            <Text className="text">
            {this.nodes1[i].title}
            </Text>
            </View>
          );
        }
      }
    }).catch(() => {console.log('fuck')})
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
      // vertical
      circular
      indicatorDots
      autoplay>
      {this.list0 && this.list0}
      </Swiper>

      <View className='at-row highlight1'>
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

      {this.state && this.state.data && this.list1}

      </View>
    )
  }
}
