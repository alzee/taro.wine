import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'

export default class Scan extends Component<PropsWithChildren> {

  onLoad(query) {
    let q = decodeURIComponent(query.q)
    console.log(q)
    // this.setState({referrerId: uid})
  }

  componentDidMount () {
  }

  render () {
    return (
      <View className='scan'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
