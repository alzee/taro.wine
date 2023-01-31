import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Button, Checkbox, CheckboxGroup, Navigator, Image } from '@tarojs/components'
import { Input as input } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'
import { Input } from '@nutui/nutui-react-taro';

export default class Consumerinfo extends Component<PropsWithChildren> {
  cid: int
  storageData = {}
  state = {
    btnDisabled: true,
    isNew: true,
  }

  componentDidMount () { 
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.cid = res.data.cid
        this.storageData = res.data
        Taro.request({
          url: Env.apiUrl + 'consumers/' + this.cid,
        }).then((res) => {
          if (res.data.phone !== undefined && res.data.name !== undefined) {
            this.setState({
              btnDisabled: false,
              isNew: false
            })
          }
          this.setState({
            consumer: res.data,
            avatarUrl: Env.imgUrl + 'avatar/' + res.data.avatar
          })
        })
      }
    })
  }

  formSubmit = e => {
    let data = e.detail.value

    if (data.name == '') {
      Taro.showToast({
        title: '请填写姓名',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (data.phone == '') {
      Taro.showToast({
        title: '请填写电话',
        icon: 'error',
        duration: 2000
      })
      return
    }

    this.storageData.name = data.name
    this.storageData.phone = data.phone
    this.storageData.avatar = data.avatar
    Taro.setStorage({
      key: Env.storageKey,
      data: this.storageData
    });
    
    // upload and get url
    let avatarUploaded = 'default.jpg'
    data.avatar = avatarUploaded

    Taro.request({
      method: 'PATCH',
      data: data,
      url: Env.apiUrl + 'consumers/' + this.cid,
      header: {
        'content-type': 'application/merge-patch+json'
      }
    }).then((res) =>{
      Taro.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(
            () => {
              Taro.reLaunch({url: '/pages/me/index'})
            }, 500
          )
        }
      })
    })
  }

  checkboxChange(e){
    let s
    if (e.detail.value[0] == 'checked') {
      s = false
    } else {
      s = true
    }
    this.setState({
      btnDisabled: s
    })
  }

  onChooseAvatar = (e) =>{
    this.setState({
      avatarUrl: e.detail.avatarUrl,
    })
  }

  render () {
    return (
      <View className='consumerInfo main'>
      <View className='hint'>
        { this.state.isNew &&
        <Text>请完善姓名及电话</Text>
        }
      </View>

      { this.state.consumer &&
      <Form className='form'
      onSubmit={this.formSubmit}
      >
      <Button class='avatar-wrapper' openType='chooseAvatar' onChooseAvatar={this.onChooseAvatar}>
        <Image class='avatar' src={this.state.avatarUrl}></Image>
      </Button>
        <Input 
          name='name' 
          type='text' 
          label='姓名'
          defaultValue={this.state.consumer.name}
        />
        <View className='input'>
        <Text className='label'>昵称</Text>
        <input 
          name='nick' 
          type='nickname' 
          label='昵称'
          value={this.state.consumer.nick}
        />
        </View>
        <Input 
          name='phone' 
          type='text' 
          label='电话'
          defaultValue={this.state.consumer.phone}
          border={false}
        />

        { this.state.isNew &&
        <View className='d-flex'>
        <CheckboxGroup onChange={this.checkboxChange.bind(this)}>
        <Checkbox value='checked'></Checkbox>
        </CheckboxGroup>
        我已阅读并同意<Navigator url='/pages/node/policy'>《用户协议》</Navigator>
        </View>
        }
        <Button className='btn' formType='submit' disabled={this.state.btnDisabled}>提交</Button>
      </Form>
      }
      </View>
    )
  }
}
