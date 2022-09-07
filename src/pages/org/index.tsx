import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'

export default class Org extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='org'>
        <Text>Hello world!</Text>

        <AtTabBar
        fixed
        tabList={[
        { title: '首页', iconType: 'home' },
        { title: '机构', iconType: 'link' },
        { title: '我', iconType: 'user' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
        />
      </View>
    )
  }
}
