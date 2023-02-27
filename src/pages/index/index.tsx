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
          <Image className='img rounded' mode='aspectFill' src={ this.imgUrl + 'node/' + i.img } onClick={()=>this.navToNode(i.id)}></Image>
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
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=6&tags=1&order%5Bid%5D=desc',
      success: function (res) {}
    }).then((res) =>{
      let featured = []
      for (let i of res.data) {
        featured.push(
          <View className="item at-col at-col-6" key={i}>
          <View className='img-wrapper rounded'>
          <Image className='img' mode='aspectFill' src={this.imgUrl + 'node/' + i.img} onClick={()=>this.navToProduct(i.id)} ></Image>
          <View className="banner">
          <Text className="badge">
          扫码中大奖
          </Text>
          </View>
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
          <View className='right'>
          <Text className="badge">
          中奖率100%
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
    let requireCustomer = false
    switch (e.index) {
      case 0:
        page = 'qr'
        requireCustomer = true
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
        requireCustomer = true
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
        break
      case 7:
        page = 'about'
        break
    }
    if (this.otype === undefined && requireLogin) {
      Taro.navigateTo({url:  '/pages/chooseLogin/index' });
    } else if (this.otype != 4 && requireCustomer) {
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

      <AtGrid columnNum='4' hasBorder={false} onClick={this.chooseGrid.bind(this)} data={
        [
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '会员码',
            index: 0
          },
          {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '代金券',
            index: 1
          },
          {
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '我的钱包',
            index: 2
          },
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '分销海报',
            index: 3
          },
          {
            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
            value: '合作餐厅',
            index: 4
          },
          {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '销售门店',
            index: 5
          },
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '合作商家',
            index: 6
          },
          {
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
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
