import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem, AtNoticebar, AtGrid } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  role: int
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
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.role = res.data.role
      }
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0&order%5Bid%5D=desc',
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
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=4&tag=4&order%5Bid%5D=desc',
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
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=6&tag=1&order%5Bid%5D=desc',
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
    let requireLogin = false
    let requireConsumer = false
    switch (e.value) {
      case '推荐赚钱':
        page = 'referral'
        requireLogin = true
        requireConsumer = true
        break
      case '我要提现':
        page = 'withdraw'
        requireLogin = true
        break
      case '我的代金券':
        page = 'voucher'
        requireLogin = true
        break
      case '餐厅抵现':
        page = 'qr'
        requireLogin = true
        requireConsumer = true
        break
      case '合作报备':
        page = 'reg'
        requireLogin = true
        requireConsumer = true
        break
      case '商家入驻':
        page = 'orgSignUp'
        break
    }
    if (this.role == -1 && requireLogin) {
      Taro.navigateTo({url:  '/pages/chooseLogin/index' });
    } else if (this.role != 4 && requireConsumer) {
    } else {
      Taro.navigateTo({url:  '/pages/' + page + '/index' });
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

      <AtGrid onClick={this.chooseGrid.bind(this)} data={
        [
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '推荐赚钱',
          },
          {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '我要提现'
          },
          {
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '我的代金券'
          },
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '餐厅抵现'
          },
          {
            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
            value: '合作报备'
          },
          {
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '商家入驻'
          }
        ]
      } />

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
