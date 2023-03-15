import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './settle.scss'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'
import Taro from '@tarojs/taro'
import { Taxon } from '../../Taxon'

export default class Settle extends Component<PropsWithChildren> {

  instance = Taro.getCurrentInstance();
  id: int // settle Id
  uid: int
  state = {
    disabled: false
  }

  componentDidMount () {
    let params = this.instance.router.params
    this.id = params.id

    Taro.request({
      url: Env.apiUrl + 'settles/' + this.id
    })
    .then(res => {
      let settled = false
      if (res.data.status === 1) {
        settled = true
      }
      this.setState({
        productName: res.data.product.name,
        salesmanName: res.data.salesman.name,
        settled
      })
    })
  }

  settle = () => {
    this.setState({disabled: true})
    let data = {}
    data.status = 1
    Taro.request({
      method: 'PATCH',
      url: Env.apiUrl + 'settles/' + this.id,
      data,
      header: {
        'content-type': 'application/merge-patch+json'
      }
    })
    .then(res => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000
        })
        .then(() => {
          setTimeout(
            () => {
              Taro.switchTab({url: '/pages/me/index'})
            }, 500
          )
        })
      } else {
        this.setState({disabled: false})
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }

  back(){
    Taro.switchTab({url: '/pages/me/index'})
  }

  render () {
    return (
      <View className='settle'>
      { this.state.settled && 
        <>
        <View className='msg'>
        <Text>请勿重复核销</Text>
        </View>
        <Button className='btn' onClick={this.back}>返回</Button>
        </>
      }


      { this.state.settled === false &&
        <>
        <View className='msg'>
        <View> 产品: {this.state.productName} x 1 </View>
        <View> 业务员: {this.state.salesmanName} </View>
        </View>
        <Button className='btn' onClick={this.settle} disabled={this.state.disabled}>确定核销</Button>
        </>
      }

      </View>
    )
  }
}
