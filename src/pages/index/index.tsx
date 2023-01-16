import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem, AtNoticebar } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  apiUrl = Env.apiUrl;
  imgUrl = Env.imgUrl;
  state = {
    value: ''
  }
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
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0&order%5Bid%5D=asc',
      success: function (res) { self.setState({nodes0: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      let list = []
      for (let i in nodes) {
        list.push(
          <SwiperItem key={i}>
          <Image className='img' mode='aspectFit' src={ this.imgUrl + 'node/' + nodes[i].img } onClick={()=>this.navToNode(nodes[i].id)}></Image>
          </SwiperItem>
        );
      }
      self.setState({list0: list})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=2&tag=1&order%5Bid%5D=asc',
      success: function (res) { self.setState({nodes1: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      let list = []
      for (let i in nodes) {
        list.push(
          <View className="featured" key={i}>
          <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + nodes[i].img} onClick={()=>this.navToNode(nodes[i].id)} ></Image>
          <Text className="text">
          </Text>
          </View>
        );
      }
      self.setState({list1: list})
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  searchBarChange(value) {
    this.setState({
      value: value
    })
  }

	search(){
    // console.log(this.state.value)
    if (this.state.value != '') {
      Taro.navigateTo({ url: '/pages/search/index?q=' + this.state.value })
    }
  }

  render () {
    return (
      <View className='index'>

      <AtSearchBar className='search-bar'
        showActionButton
        value={this.state.value}
        placeholder='搜索门店'
        onChange={this.searchBarChange.bind(this)}
        onActionClick={this.search.bind(this)}
      />

      <Swiper
      className='swiper'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay>
      {this.state.list0}
      </Swiper>

      <View className='at-row highlight'>
      <View className="at-col" onClick={() => Taro.navigateTo({url: '/pages/about/index'})}>
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

      <AtNoticebar
      className='notice-bar'
      marquee
      speed='50'
      >
      这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
      </AtNoticebar>

      {this.state.list1}

      </View>
    )
  }
}
