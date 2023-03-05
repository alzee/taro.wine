import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtIcon } from "taro-ui"

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

export default class Productdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  pid: int
  nid: int
  node = {}
  product = {}
  state = {}

  componentDidMount () {
    this.nid = this.instance.router.params.nid
    this.pid = this.instance.router.params.pid
    const self = this;
    if (this.nid === undefined) {
      Taro.request({
        url: Env.apiUrl + 'products/' + this.pid,
      }).then((res) =>{
          self.setState({entity: res.data})
      })
    } else {
      Taro.request({
        url: Env.apiUrl + 'nodes/' + this.nid,
        success: function (res) {}
      }).then((res) =>{
        self.setState({
          node: res.data,
          entity: res.data.product
        }) 
        this.node = res.data
        this.product = res.data.product
        this.pid = this.product.id
        if (this.node.body === undefined) {
          self.setState({body: this.product.intro})
        } else {
          self.setState({body: this.node.body})
        }
      })
    }
  }

  search(){
    Taro.navigateTo({ url: '/pages/search/index?p=' + this.pid })
  }

  render () {
    return (
      <View className='productDetail'>
      { this.state.entity &&
        <>
      <Image className='pic' mode='widthFix' src={Env.imgUrl + 'product/' + this.state.entity.img} />
      <View className='price'>
        <Text className='unitPrice'>
        ¥{this.state.entity.unitPricePromo / 100} 元
        </Text>
        <Text className='unitPricePromo'>
        ¥{this.state.entity.unitPrice / 100} 元
        </Text>
      </View>

      <View className='title'>
      {this.state.entity.name}
      </View>

      <View className='space'></View>

      <View className='spec'>
      <View className='item'>
      <Text className='label'> 编号 </Text>
      {this.state.entity.sn}
      </View>
      <View className='item'>
      <Text className='label'> 规格 </Text>
      {this.state.entity.spec}
      </View>
      </View>

      <View className='space'></View>

      <View className='node'>
      <View className='at-article__content'>
      { this.state.body &&
        <View dangerouslySetInnerHTML={{__html: this.state.body}} className='at-article__section'>
      </View>
      }
      </View>
      </View>

      <View className='bottom'>
      <View className='left'>
      <View className='' onClick={this.search.bind(this)}>
      <Image className='img' src={Env.imgUrl + 'icon/shop.svg'} />
      </View>
      <View className='text'> 店铺 </View>
      </View>
      <Button className='right btn' size='mini' onClick={this.search.bind(this)}>立即购买</Button>
      </View>
      </>
      }
      </View>
    )
  }
}
