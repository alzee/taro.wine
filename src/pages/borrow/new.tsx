import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './new.scss'

export default class Borrow extends Component<PropsWithChildren> {
  state = {}

  componentDidMount () { }

  render () {
    return (
      <View className='borrow'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
