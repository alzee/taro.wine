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
  nodes2 = [];
  list0 = [];
  list1 = [];
  list2 = [];
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
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        // if (res.data.uid == 0) {
        //   console.log('need to login');
        //   //this.navTo('chooseLogin');
        // } else {
        // }
      },
      fail: res => {
        console.log('fuck')
      },
    });

    const self = this;
    Taro.request({
      url: Env.apiUrl + 'nodes',
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.nodes = res.data;
      for (let i in this.nodes) {
        if (this.nodes[i].tag == 0) {
          this.nodes0.push(this.nodes[i]);
        }
        // if (this.nodes[i].tag == 1) {
        // this.nodes1.push(this.nodes[i]);
        // }
        if (this.nodes[i].tag == 2) {
          this.nodes2.push(this.nodes[i]);
        }
      }
      for (let i in this.nodes0) {
        if (i < 3) {
          this.list0.push(
            <SwiperItem key={i}>
            <View className='highlight0'>
            <Image className='img' mode='scaleToFill' src={ this.imgUrl + this.nodes0[i].img } onClick={()=>this.navToNode(this.nodes0[i].id)}></Image>
            </View>
            </SwiperItem>
          );
        }
      }
      // for (let i in nodes1) {
      //   if (i < 4) {
      //     list1.push(
      //         <View className="at-col">
      //             <AtAvatar className="avatar" circle size="small" image={ this.state && this.state.data && this.imgUrl+ nodes1[i].img}></AtAvatar>
      //             <Text>{nodes1[i].title}</Text>
      //         </View>
      //         );
      //   }
      // }
      for (let i in this.nodes2) {
        if (i < 3) {
          this.list2.push(
            <View className="highlight2" key={i}>
            <Image className='img' mode='widthFix' src={this.imgUrl + this.nodes2[i].img} onClick={()=>this.navToNode(this.nodes2[i].id)} ></Image>
            <Text className="text">
            {this.nodes2[i].title}
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
      {/*
          <AtSearchBar actionName='搜一下' />
          */}

      { this.state && this.state.data &&
        <Swiper
      className='swiper'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      // vertical
      circular
      indicatorDots
      autoplay>
      {this.list0}
      </Swiper>
      }

      <View className='at-row highlight1'>
      <View className="at-col">
      <AtAvatar className="avatar" circle image={ this.imgUrl + '80x80.png'}></AtAvatar>
      <Text>剑南老窖</Text>
      </View>
      <View className="at-col">
      <AtAvatar className="avatar" circle image={ this.imgUrl + '80x80.png'}></AtAvatar>
      <Text>门店导航</Text>
      </View>
      <View className="at-col">
      <AtAvatar className="avatar" circle image={ this.imgUrl + '80x80.png'}></AtAvatar>
      <Text>合作餐厅</Text>
      </View>
      </View>

      {this.state && this.state.data && this.list2}

      </View>
    )
  }
}
