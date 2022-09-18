import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { HttpService } from '../../services/http.service'

export default class Index extends Component<PropsWithChildren> {
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
  isLogged: false;

  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }

  componentWillMount () { }

  componentDidMount () {
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
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        console.log(res.data)
        if (res.data.uid == 0) {
          console.log('need to login');
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
      },
      fail: res => {
        console.log('fuck')
      },
    });
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

    { this.isLogged ||
      <AtActionSheet isOpened>
        <AtActionSheetItem>
        <AtButton type="primary" size="small" onClick={this.navTo('wxlogin')}>微信登录</AtButton>
        <Text className="text" onClick={this.navTo('login')}>机构登录</Text>
        </AtActionSheetItem>
        <AtActionSheetItem>
        </AtActionSheetItem>
        </AtActionSheet>
    }
      </View>
      )
  }
}
