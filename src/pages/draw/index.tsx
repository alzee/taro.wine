import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Draw extends Component<PropsWithChildren> {

  componentDidMount () { }

  onLoad(query) {
    let q = decodeURIComponent(query.q)
    console.log('onLoad show q: ' + q)
    console.log(query);
  }

  render () {
    return (
      <View className='draw'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
