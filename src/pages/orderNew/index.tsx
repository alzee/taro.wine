import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Ordernew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();

  componentWillMount () { }

  componentDidMount () {
    // this.type = this.instance.router.params.type
    const self = this;
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='orderNew'>
      <Form className='form'
      onSubmit={this.formSubmit}
      >
        <Input 
        className="input"
          name='name' 
          type='text' 
          placeholder='名称' 
        />
        <Input 
        className="input"
          name='contact' 
          type='text' 
          placeholder='联系人' 
        />
        <Input 
        className="input"
          name='phone' 
          type='number' 
          placeholder='电话' 
        />
        <Input 
        className="input"
          name='address' 
          type='text' 
          placeholder='地址' 
        />
        <Input 
        className="input"
          name='district' 
          type='text' 
          placeholder='区域' 
        />
        <Button type='default' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
