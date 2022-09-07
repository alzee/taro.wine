import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtAvatar } from 'taro-ui'

export default class Me extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='me'>
        <View className="at-row top">
		<AtAvatar className="avatar" circle image="https://jdc.jd.com/img/200"></AtAvatar>
        <View className="name">
        <Text className='main'>用户名</Text>
        <Text className='secondary'>角色</Text>
        </View>
        <View className="voucher">
        <Text className='main'>500</Text>
        <Text className='secondary'>代金券</Text>
        </View>
        </View>

      <AtList>
      <AtListItem
      title='代金券'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem
      title='我的订单'
      arrow='right'
      thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
      />
      <AtListItem
      title='我的退货'
      // note='描述信息'
      arrow='right'
      thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
      />
      <AtListItem
      title='我的提现'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem
      title='门店销售'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem
      title='餐厅消费'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem
      title='我的信息'
      // note='描述信息'
      // extraText='详细信息'
      arrow='right'
      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      </AtList>

      </View>
      )
  }
}
