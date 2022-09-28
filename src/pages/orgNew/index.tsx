import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Orgnew extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  type: int

  componentWillMount () { }

  componentDidMount () {
    this.type = this.instance.router.params.type
    const self = this;
  }

  formSubmit(){
    // post to http://localhost:8000/api/orgs
    // curl -X 'POST' \
    //   'http://localhost:8000/api/orgs' \
    //   -H 'accept: application/json' \
    //   -H 'Content-Type: application/json' \
    //   -d '{
    //   "name": "test",
    //   "contact": "t1",
    //   "phone": "t1",
    //   "address": "t1",
    //   "district": "t1",
    //   "type": 1,
    //   "voucher": 0,
    //   "discount": 0.95
    // }'
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log(this.type)
    return (
      <View className='orgNew'>
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
