import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Poster extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () {
    const self = this;

    const data = {
      "page": "pages/index/index",
      "scene": "a=1",
      // "check_path": true,
      // "env_version": "release"
    }
    Taro.request({
      method: 'POST',
      data: data,
      // url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0&order%5Bid%5D=asc',
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN'
      success: function (res) { }) }
    }).then((res) =>{
      console.log(res)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='poster'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
