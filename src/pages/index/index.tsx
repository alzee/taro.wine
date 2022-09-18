import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import Taro from '@tarojs/taro'
import img1 from './img/400x220.png'
import img2 from './img/80x80.png'

export default class Index extends Component<PropsWithChildren> {
  baseUrl = 'https://127.0.0.1:8000/';
  apiUrl = this.baseUrl + 'api/nodes/';
  imgUrl = this.baseUrl + 'uploads/';
  nodes = [];
  nodes0 = [];
  nodes1 = [];
  nodes2 = [];
  list0 = [];
  list1 = [];
  list2 = [];

  componentWillMount () { }

  componentDidMount () {
    const self = this;
    Taro.request({
        url: this.apiUrl,
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
                <SwiperItem>
                <View className=''>
                <Image src={ this.imgUrl + this.nodes0[i].img }></Image>
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
                  <View className="highlight2">
                  <Image className='img' src={this.imgUrl + this.nodes2[i].img}></Image>
                  <Text className="text">
                  {this.nodes2[i].title}
                  </Text>
                  </View>
                  );
            }
          }
          })
  }

  componentWillUnmount () { }

  componentDidShow () { }

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

        {this.state && this.state.data && this.list2}
      </View>
      )
  }
}
