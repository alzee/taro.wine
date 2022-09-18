import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtForm, AtButton, AtInput } from 'taro-ui'

export default class Login extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='login'>
      <AtForm className='form'
      >
        <AtInput 
          name='value' 
          type='text' 
          placeholder='用户名' 
        />
        <AtInput 
          name='value' 
          type='password' 
          placeholder='密码' 
        />
        <AtButton size="small" type="primary" formType='submit'>提交</AtButton>
      </AtForm>
      </View>
    )
  }
}
