import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Fuck1 extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='fuck1'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
