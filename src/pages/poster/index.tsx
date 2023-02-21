import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'

export default class Poster extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.setState({uid: res.data.uid})
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      }
    })
  }

  downloadImg () {
    let url = Env.imgUrl + 'poster/' + this.state.uid + '.jpg'
    Taro.downloadFile({
      url,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            Taro.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='poster'>
        <Image 
        className='at-article__img' 
        src={ this.state && Env.imgUrl + 'poster/' + this.state.uid + '.jpg'}
        mode='widthFix' />
        <Button className='btn' onClick={this.downloadImg.bind(this)}>保存海报</Button>
      </View>
    )
  }
}
