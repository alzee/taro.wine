import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { Env } from '../../env/env'
import Taro from '@tarojs/taro'
import { AtButton, AtList, AtListItem} from "taro-ui"
import { Taxon } from '../../Taxon'

export default class Withdrawdetail extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  id: int
  entity = {}

  componentWillMount () { }

  componentDidMount () {
    this.id = this.instance.router.params.id
    const self = this;
    Taro.request({
      url: Env.apiUrl + 'withdraws/' + this.id,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      this.entity = res.data
      console.log(this.entity)
      console.log(this.entity.applicant)
      console.log(this.entity.approver)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='withdrawDetail'>
      { this.state &&
      <AtList>
      <AtListItem title='申请方' extraText={this.entity.applicant.name} />
      <AtListItem title='审核方' extraText={this.entity.approver.name} />
      <AtListItem title='申请金额' extraText={this.entity.amount / 100} />
      <AtListItem title='实际到账' extraText={this.entity.actualAmount / 100} />
      <AtListItem title='日期' extraText={this.entity.date} />
      <AtListItem title='状态' extraText={Taxon.status[this.entity.status]} />
      <AtListItem title='备注' extraText={this.entity.note} />
      </AtList>
      }
      </View>
    )
  }
}
