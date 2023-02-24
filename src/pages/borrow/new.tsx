import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Input, Picker } from '@tarojs/components'
import './new.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Borrow extends Component<PropsWithChildren> {
  state = {
    claims: {}
  }

  componentDidMount () { }

  pickerChange() {
  }

  formSubmit() {
  }

  render () {
    return (
      <View className='borrow'>
      <Form className='form'
      onSubmit={this.formSubmit.bind(this)}
      >
      <Picker mode='selector' range={this.state.claims} onChange={this.pickerChange}>
      <View className='input'>
      <Text className='label'>选择兑奖单</Text>
      {this.state.selectorChecked}
      </View>
      </Picker>
        <Button className='btn' formType='submit'>提交</Button>
      </Form>
      </View>
    )
  }
}
