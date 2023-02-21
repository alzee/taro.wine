import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
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
  uid: int
  rid: int
  state = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        this.rid = res.data.role
        if (this.rid == 4) {
          this.uid = res.data.uid
        } else {
          this.oid = res.data.org.id
        }
      },
      fail: res => {
        console.log('pls login');
        Taro.redirectTo({ url: '/pages/chooseLogin/index' })
      },
    });

    Taro.request({
      url: Env.apiUrl + 'withdraws/' + this.id,
      success: function (res) { self.setState({entity: res.data}) }
    }).then((res) =>{
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  approve(action: int){
    self = this
    console.log(action)
    let a = ['', '', '', '通过', '拒绝', '打款']
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
            complete: () => Taro.redirectTo({url: '/pages/withdraw/index'})
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
      { this.state.entity &&
      <AtList>
      { this.rid == 4 &&
      <AtListItem title='顾客' extraText={this.state.entity.customer.name} />
      }
      { this.rid != 4 &&
      <AtListItem title='申请方' extraText={this.state.entity.applicant.name} />
      }
      <AtListItem title='审核方' extraText={this.state.entity.approver.name} />
      <AtListItem title='申请金额' extraText={this.state.entity.amount / 100} />
      <AtListItem title='实际到账' extraText={this.state.entity.actualAmount / 100} />
      <AtListItem title='日期' extraText={fmtDate(this.state.entity.date)} />
      <AtListItem title='状态' extraText={Taxon.status[this.state.entity.status]} />
      <AtListItem title='备注' extraText={this.state.entity.note} />
      <View className='img-wrapper'>
      <Image src={Env.imgUrl + 'withdraw/' + this.state.entity.img} />
      </View>
      </AtList>
      }
      <View className='btn-wrapper'>
      { this.state.entity && this.state.entity.status > 0 &&
        <Button className='btn' type='default' disabled>{Taxon.status[this.state.entity.status]}</Button>
      }
      { this.state.entity && this.state.entity.status == 3 && this.rid == 0 &&
        <Button className='btn' type='primary' onClick={() => this.approve(5)}>打款</Button>
      }
      </View>
      { this.state.entity && this.state.entity.status == 0 && this.state.entity.approver.id == this.oid &&
      <View className='btn-wrapper'>
      <Button className='btn' type='primary' onClick={() => this.approve(3)}>通过</Button>
      <Button className='btn' type='warn' onClick={() => this.approve(4)}>拒绝</Button>
      </View>
      }
      </View>
    )
  }
}
