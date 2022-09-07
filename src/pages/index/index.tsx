import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtTabBar, AtIcon } from 'taro-ui'

export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtAvatar type='primary'></AtAvatar>
        <AtTabBar
        fixed
        tabList={[
        { title: '首页', iconType: 'home' },
        { title: '机构', iconType: 'link' },
        // { title: '订单', iconType: 'list' },
        // { title: '退货', iconType: 'list' },
        // { title: '代金券', iconType: 'heart' },
        // { title: '提现', iconType: 'money' },
        { title: '我', iconType: 'user' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
        />
      </View>
    )
  }
}
