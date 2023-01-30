import { Component, PropsWithChildren } from 'react'
import { View, Text, Form, Input, Button, Picker, Checkbox, CheckboxGroup, Navigator, Image } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem, AtInput } from "taro-ui"
import { Taxon } from '../../Taxon'
import { AtCheckbox } from 'taro-ui'

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
    console.log(e);
    let data = e.detail.value
    data.avatar = this.state.avatarUploaded

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
    console.log(e);
    // upload and get url
    let avatarUploaded = 'default.jpg'
    this.setState({
      avatarUrl: e.detail.avatarUrl,
      avatarUploaded
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
        <AtInput 
        className="input"
          name='name' 
          type='text' 
          placeholder='姓名' 
          title='姓名'
          value={this.state.consumer.name}
        />
        <AtInput 
        className="input"
          name='nick' 
          type='nickname' 
          placeholder='' 
          title='昵称'
          value={this.state.consumer.nick}
        />
        <AtInput 
        className="input"
          name='phone' 
          type='text' 
          placeholder='电话' 
          title='电话'
          value={this.state.consumer.phone}
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
