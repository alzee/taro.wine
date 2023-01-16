import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import { Taxon } from '../../Taxon'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtIcon } from "taro-ui"
import checkIcon from '../../icon/check-circle-fill.svg'
import shopIcon from '../../icon/shop.svg'

export default class Productdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'products/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

	search(){
    // console.log(this.id)
    Taro.navigateTo({ url: '/pages/search/index?p=' + this.id })
  }

  render () {
    return (
      <View className='productDetail'>
      { this.state.entity &&
        <>
      <Image className='pic rounded' mode='aspectFill' src={Env.imgUrl + 'product/' + this.state.entity.img} />
      <View className='price'>
        <View className='amount'>
        {this.state.entity.price / 100} 元
        </View>
        <View className='note'>
          <Text className='text'>
          已售22件
          </Text>
        <AtIcon value='heart-2' size='15' color='#ff3333'></AtIcon>
        </View>
      </View>

      <View className='title'>
        {this.state.entity.name}
      </View>
      
      <View className='spec'>
        <View className='item'>
          <Text className='label'> 编号 </Text>
          {this.state.entity.sn}
        </View>
        <View className='item'>
          <Text className='label'> 规格 </Text>
          {this.state.entity.spec}
        </View>
        <View className='item'>
          <Text className='label'> 随赠代金券 </Text>
          <Text className='voucher'>
          {this.state.entity.voucher / 100} 元
          </Text>
        </View>
      </View>

      <View className='attr'>
        <View className='item'>
        <Image className='img' src={checkIcon} />
        免邮费
        </View>
        <View className='item'>
        <Image className='img' src={checkIcon} />
        正品保障
        </View>
        <View className='item'>
        <Image className='img' src={checkIcon} />
        7天无理由退货
        </View>
      </View>

      <View className='review'>
        <View className='section'> 商品评价 (88)</View>
        <View className='content'> 云想衣裳花想容，春风拂槛露华浓。</View>
        <View className='note'> 用户user1 发布于12月30日</View>
        <View className='star'>
          <AtIcon value='star-2' size='15' color='#ff3333'></AtIcon>
          <AtIcon value='star-2' size='15' color='#ff3333'></AtIcon>
          <AtIcon value='star-2' size='15' color='#ff3333'></AtIcon>
          <AtIcon value='star-2' size='15' color='#ff3333'></AtIcon>
          <AtIcon value='star-2' size='15' color='#ff3333'></AtIcon>
          <Text> 5.0分</Text>
        </View>
      </View>

      <View className='bottom'>
        <View className='left'>
          <View className='' onClick={this.search.bind(this)}>
            <Image className='img' src={shopIcon} />
          </View>
          <View className='text'> 店铺 </View>
        </View>
        <Button className='right' size='mini' onClick={this.search.bind(this)}>立即购买</Button>
      </View>
        </>
      
      /*
      <AtList>
      <AtListItem title='产品名称' extraText={this.state.entity.name} />
      <AtListItem title='产品编号' extraText={this.state.entity.sn} />
      <AtListItem title='产品规格' extraText={this.state.entity.spec} />
      <AtListItem title='产品价格' extraText={this.state.entity.price / 100} />
      <AtListItem title='产品库存' extraText={this.state.entity.stock} />
      <AtListItem title='随赠代金券' extraText={this.state.entity.voucher / 100} />
      </AtList>
     */
      }
      </View>
    )
  }
}
