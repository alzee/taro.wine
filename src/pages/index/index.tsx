import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem, AtNoticebar, AtGrid } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  otype: int
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

  navToProduct(nid: int) {
    Taro.navigateTo({ url: '/pages/productDetail/index?nid=' + nid })
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      this.otype = res.data.otype
    })
    .catch(err => {
      console.log(err);
      console.log('pls login');
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=6&tags=0&order%5Bid%5D=desc',
      success: function (res) {}
    }).then((res) =>{
      let carousel = []
      for (let i of res.data) {
        carousel.push(
          <SwiperItem key={i}>
          <Image className='img' mode='aspectFill' src={ this.imgUrl + 'node/' + i.img } onClick={()=>this.navToNode(i.id)}></Image>
          </SwiperItem>
        );
      }
      self.setState({carousel})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=4&tags=4&order%5Bid%5D=desc',
      success: function (res) {}
    }).then((res) =>{
      let promo = []
      for (let i of res.data) {
        promo.push(
          <View className="item at-col at-col-6" key={i}>
          <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + i.img} onClick={()=>this.navToNode(i.id)} ></Image>
          </View>
        );
      }
      self.setState({promo})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=6&tags=1&order%5Bid%5D=desc',
      success: function (res) {}
    }).then((res) =>{
      let featured = []
      for (let i of res.data) {
        featured.push(
          <View className="item at-col at-col-6" key={i}>
          <View className='img-wrapper'>
          <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + i.img} onClick={()=>this.navToProduct(i.id)} ></Image>
          </View>
          <View className="title">
          {i.title}
          </View>
          <View className="price">
          <View className="left">
          <Text className='unitPrice'>
          ¥{i.product.unitPricePromo / 100}
          </Text>
          <Text className='unitPricePromo'>
          ¥{i.product.unitPrice / 100}
          </Text>
          </View>
          </View>
          </View>
        );
      }
      self.setState({featured})
    })
  }

  searchBarChange(value) {
    this.setState({
      value: value
    })
  }

	search(){
    if (this.state.value != '') {
      Taro.navigateTo({ url: '/pages/search/index?q=' + this.state.value })
    }
  }

  chooseGrid(e){
    let page 
    let query = ''
    let requireLogin = false
    switch (e.index) {
      case 0:
        page = 'qr'
        requireLogin = true
        break
      case 1:
        page = 'voucher'
        requireLogin = true
        break
      case 2:
        page = 'withdraw'
        requireLogin = true
        break
      case 3:
        page = 'poster'
        requireLogin = true
        break
      case 4:
        page = 'search'
        query = '?t=3'
        break
      case 5:
        page = 'search'
        query = '?t=2'
        break
      case 6:
        page = 'reg'
        requireLogin = true
        break
      case 7:
        page = 'about'
        break
    }
    if (this.otype === undefined && requireLogin) {
      Taro.navigateTo({url:  '/pages/chooseLogin/index' });
    } else {
      Taro.navigateTo({url:  '/pages/' + page + '/index' + query });
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

      <AtGrid className='grid' columnNum='4' hasBorder={false} onClick={this.chooseGrid.bind(this)} data={
        [
          {
            image: Env.imgUrl + 'icon/card.png',
            value: '会员码',
            index: 0
          },
          {
            image: Env.imgUrl + 'icon/ticket.png',
            value: '代金券',
            index: 1
          },
          {
            image: Env.imgUrl + 'icon/cny.png',
            value: '我的钱包',
            index: 2
          },
          {
            image: Env.imgUrl + 'icon/poster.png',
            value: '分销海报',
            index: 3
          },
          {
            image: Env.imgUrl + 'icon/dine.png',
            value: '合作餐厅',
            index: 4
          },
          {
            image: Env.imgUrl + 'icon/heart.png',
            value: '合作商家',
            index: 5
          },
          {
            image: Env.imgUrl + 'icon/store.png',
            value: '销售门店',
            index: 6
          },
          {
            image: Env.imgUrl + 'icon/headset.png',
            value: '客服电话',
            index: 7
          }
        ]
      } />

      <View className='label'>
      <View>活动公告</View>
      </View>
      <View className='promo at-row at-row--wrap'>
      {this.state.promo}
      </View>

      <View className='label'>
      <View>产品推荐</View>
      </View>
      <View className='featured at-row at-row--wrap'>
      {this.state.featured}
      </View>

      </View>
    )
  }
}
