import { Component, PropsWithChildren } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env/env'
import { AtNavBar } from 'taro-ui'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

export default class Node extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  state = {};

  componentDidMount () {
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'nodes?itemsPerPage=1&tags=3',
      success: function (res) { self.setState({node: res.data[0]}) }
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
      <View className='at-article__content'>
      <View dangerouslySetInnerHTML={{__html: this.state.node.body}} className='at-article__section'>
      </View>
      </View>
      }
      </View>
    )
  }
}
