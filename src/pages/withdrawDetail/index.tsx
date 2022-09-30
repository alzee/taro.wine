import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'
import { fmtDate } from '../../fmtDate'

export default class Withdrawdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  oid: int
  entity = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.oid = res.data.org.id
      },
      fail: res => {
        console.log('fuck')
      },
    });

    Taro.request({
      url: Env.apiUrl + 'withdraws/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.entity = res.data
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  approve(action: int){
    self = this
    console.log(action)
    let a = ['', '', '', '', '拒绝', '通过']
    Taro.showModal({
      title: '提示',
      content: '确认' + a[action] + '?',
      success: function (res) {
        if (res.confirm) {
          console.log('confirmed')
          Taro.showToast({
            title: '完成',
            icon: 'success',
            duration: 2000,
            complete: () => Taro.navigateBack()
          })
          Taro.request({
            method: 'PATCH',
            url: Env.apiUrl + 'withdraws/' + self.id,
            data: {status: action},
            header: {
              'content-type': 'application/merge-patch+json'
            }
          }).then((res) =>{})
        } else if (res.cancel) {
          console.log('cancelled')
        }
      }
    })
  }

  render () {
    return (
      <View className='withdrawDetail'>
      { this.state &&
      <AtList>
      <AtListItem title='申请方' extraText={this.entity.applicant.name} />
      <AtListItem title='审核方' extraText={this.entity.approver.name} />
      <AtListItem title='申请金额' extraText={this.entity.amount / 100} />
      <AtListItem title='实际到账' extraText={this.entity.actualAmount / 100} />
      <AtListItem title='日期' extraText={fmtDate(this.entity.date)} />
      <AtListItem title='状态' extraText={Taxon.status[this.entity.status]} />
      <AtListItem title='备注' extraText={this.entity.note} />
      </AtList>
      }
      { this.entity.status > 0 &&
      <View className='btn-wrapper'>
        <Button className='btn' type='default' disabled>{Taxon.status[this.entity.status]}</Button>
      </View>
      }
      { this.entity.status == 0 &&  this.entity.approver.id == this.oid &&
      <View className='btn-wrapper'>
      <Button className='btn' type='primary' onClick={() => this.approve(5)}>通过</Button>
      <Button className='btn' type='warn' onClick={() => this.approve(4)}>拒绝</Button>
      </View>
      }
      </View>
    )
  }
}
