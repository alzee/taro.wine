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
  isLoding: boolean = true;


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
        success: function (res) {
        self.setState({data: res.data})
            //console.log(res.data);
            //console.log(this.nodes)
            //console.log(res.data[0])
        }
    }).then((res) =>{
this.nodes = res.data;
    console.log(this.nodes);
    console.log(this.nodes[0].img);
    this.isLoding = false;
  this.render();
    }
  )
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
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
      <SwiperItem>

      <View className='demo-text-1'><Image src={img1}></Image></View>
      </SwiperItem>
      <SwiperItem>
      <View className='demo-text-1'><Image src={img1}></Image></View>
      </SwiperItem>
      <SwiperItem>
      <View className='demo-text-1'><Image src={img1}></Image></View>
      </SwiperItem>
      </Swiper>

		<View className='at-row highlight1'>
            <View className="at-col">
                <AtAvatar className="avatar" circle size="small" image={ this.state && this.state.data && this.imgUrl+ this.nodes[0].img}></AtAvatar>
                <Text>推荐1</Text>
            </View>
            <View className="at-col">
                <AtAvatar circle size="small" image={img2}></AtAvatar>
                <Text>推荐2</Text>
            </View>
            <View className="at-col">
                <AtAvatar circle size="small" image={img2}></AtAvatar>
                <Text>推荐3</Text>
            </View>
            <View className="at-col">
                <AtAvatar circle size="small" image={img2}></AtAvatar>
                <Text>推荐4</Text>
            </View>
        </View>

        <View className="highlight2">
            <Image className='img' src={img1}>11</Image>
        </View>
        <View className="highlight2">
            <Image className='img' src={img1}>11</Image>
        </View>

      </View>
      )
  }
}
