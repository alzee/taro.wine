import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import Taro from '@tarojs/taro'
import img1 from './img/400x220.png'
import img2 from './img/80x80.png'

interface Data {
  [propName: string]: any;
}

export default class Index extends Component<PropsWithChildren> {
  baseUrl = 'https://127.0.0.1:8000/';
  apiUrl = this.baseUrl + 'api/nodes/';
  imgUrl = this.baseUrl + 'uploads/';
  nodes = [];

  componentWillMount () { }

  componentDidMount () {
    const self = this;
    Taro.request({
        url: this.apiUrl,
        data: {
          x: '',
          y: ''
        },
        that: this,
        success: function (res) { self.setState({data: res.data}) }
        }).then((res) =>{
          this.nodes = res.data;
          })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let nodes0 = [];
    let nodes1 = [];
    let nodes2 = [];
    let list0 = [];
    let list1 = [];
    let list2 = [];
    for (let i in this.nodes) {
      if (this.nodes[i].tag == 0) {
        nodes0.push(this.nodes[i]);
      }
      if (this.nodes[i].tag == 1) {
        nodes1.push(this.nodes[i]);
      }
      if (this.nodes[i].tag == 2) {
        nodes2.push(this.nodes[i]);
      }
    }
    for (let i in nodes0) {
      if (i < 3) {
        list0.push(
            <SwiperItem>
            <View className='demo-text-1'><Image src={ this.imgUrl + nodes0[i].img }></Image></View>
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
    for (let i in nodes2) {
      if (i < 2) {
        list2.push(
        <View className="highlight2">
            <Image className='img' src={this.imgUrl + nodes2[i].img}>11</Image>
        </View>
            );
      }
    }
    return (
      <View className='index'>
        <AtSearchBar
        actionName='搜一下'
        />

        <Swiper
        className='swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        // vertical
        circular
        indicatorDots
        autoplay>
        {list0}
        </Swiper>

        <View className='at-row highlight1'>
          <View className="at-col">
              <AtAvatar className="avatar" circle size="small" image={ this.imgUrl + '80x80.png'}></AtAvatar>
              <Text>门店</Text>
          </View>
          <View className="at-col">
              <AtAvatar className="avatar" circle size="small" image={ this.imgUrl + '80x80.png'}></AtAvatar>
              <Text>餐厅</Text>
          </View>
          <View className="at-col">
              <AtAvatar className="avatar" circle size="small" image={ this.imgUrl + '80x80.png'}></AtAvatar>
              <Text>推荐</Text>
          </View>
          <View className="at-col">
              <AtAvatar className="avatar" circle size="small" image={ this.imgUrl + '80x80.png'}></AtAvatar>
              <Text>生活</Text>
          </View>
        </View>

        {list2}
      </View>
      )
  }
}
