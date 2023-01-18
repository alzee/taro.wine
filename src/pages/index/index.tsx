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

  navToProduct(id: int) {
    Taro.navigateTo({ url: '/pages/productDetail/index?id=' + id })
  }

  componentDidMount () {
    const self = this;

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0&order%5Bid%5D=asc',
      success: function (res) {}
    }).then((res) =>{
      let carousel = []
      for (let i of res.data) {
        carousel.push(
          <SwiperItem key={i}>
          <Image className='img rounded' mode='aspectFit' src={ this.imgUrl + 'node/' + i.img } onClick={()=>this.navToNode(i.id)}></Image>
          </SwiperItem>
        );
      }
      self.setState({carousel})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=4&tag=4&order%5Bid%5D=asc',
      success: function (res) {}
    }).then((res) =>{
      let promo = []
      for (let i of res.data) {
        promo.push(
          <View className="item at-col at-col-6" key={i}>
          <Image className='img rounded' mode='widthFix' src={this.imgUrl + 'node/' + i.img} onClick={()=>this.navToNode(i.id)} ></Image>
          <View className="text">
          {i.title}
          </View>
          </View>
        );
      }
      self.setState({promo})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=6&tag=1&order%5Bid%5D=asc',
      success: function (res) {}
    }).then((res) =>{
      let featured = []
      for (let i of res.data) {
        featured.push(
          <View className="item at-col at-col-6" key={i}>
          <Image className='img rounded' mode='aspectFill' src={this.imgUrl + 'node/' + i.img} onClick={()=>this.navToProduct(i.product.id)} ></Image>
          <View className="text">
          {i.title}
          </View>
          </View>
        );
      }
      self.setState({featured})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=5&order%5Bid%5D=asc',
      success: function (res) {}
    }).then((res) =>{
      let scrollInfo = []
      for (let i of res.data) {
        // scrollInfo += i.body
        scrollInfo.push(
          <View dangerouslySetInnerHTML={{__html: i.body}} className=''></View>
        );
      }
      self.setState({scrollInfo})
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
      {this.state.carousel}
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
      <View className='scroll-info'>
      {this.state.scrollInfo}
      </View>
      </AtNoticebar>

      <View className='label'>
      <View>活动公告</View>
      <View className='read-more'>
      查看更多
      <AtIcon value='chevron-right' size='15'></AtIcon>
      </View>
      </View>
      <View className='promo at-row at-row--wrap'>
      {this.state.promo}
      </View>

      <View className='label'>
      <View>产品推荐</View>
      <View className='read-more'>
      查看更多
      <AtIcon value='chevron-right' size='15'></AtIcon>
      </View>
      </View>
      <View className='featured at-row at-row--wrap'>
      {this.state.featured}
      </View>

      </View>
    )
  }
}
