import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Collect extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='collect'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
