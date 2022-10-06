import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env/env'
import { AtNavBar } from 'taro-ui'

export default class Node extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  state = {};

  // constructor () {
  //   super(...arguments)
  //   this.state = {
  //   }
  // }
  
  componentDidMount () {
    let id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'nodes/' + id,
      success: function (res) { self.setState({node: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='at-article'>

      { this.state.node &&
      <View>
      <View className='at-article__h1'>
      {this.state.node.title}
      </View>
      <View className='at-article__info'>
      {this.state.node.date}
      </View>
      <Image 
      className='at-article__img' 
      src={ this.state.node.img && Env.imgUrl + 'node/' + this.state.node.img}
      mode='widthFix' />
      <View className='at-article__content'>
      <View dangerouslySetInnerHTML={{__html: this.state.node.body}} className='at-article__section'>
      </View>
      </View>
      </View>
      }
      </View>
    )
  }
}
