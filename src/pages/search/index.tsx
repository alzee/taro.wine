import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Search extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  keyword = this.instance.router.params.q
  latitude: float
  longitude: float
  state = {
    seg: 0,
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: 'coord',
      success: res => {
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
      }
    })
    this.getOrgs(2)
    this.getOrgs(3)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  switchSeg (value) {
    this.setState({
      seg: value
    })
  }

  Rad(d) { 
    //根据经纬度判断距离
    return d * Math.PI / 180.0;
  }

  getDistance(lat1, lng1, lat2, lng2) {
      // lat1用户的纬度
      // lng1用户的经度
      // lat2商家的纬度
      // lng2商家的经度
      var radLat1 = this.Rad(lat1);
      var radLat2 = this.Rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.Rad(lng1) - this.Rad(lng2);
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(1)
      return Number(s)
  }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/orgDetail/index?id=' + id})
  }

  getOrgs(type) {
    let that = this
    let query = '?upstream.display=true&type=' + type + '&name=' + this.keyword
    Taro.request({
      url: Env.apiUrl + 'orgs' + query,
      success: function (res) { that.setState({data: res.data}) }
    }).then((res) =>{
      console.log(res.data)
      let orgs = res.data
      let list = []
      for (let i of orgs) {
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(i.id)}
          title={i.name}
          note={i.address}
          extraText={this.getDistance(that.latitude, that.longitude,i.latitude, i.longitude) + 'km'}
          thumb={Env.imgUrl + 'org/thumbnail/' + i.img}
          arrow='right'
          className='list-item'
          />
        )
      }
      if (type == 2) {
        that.setState({
          list1: list
        })
      }
      if (type == 3) {
        that.setState({
          list2: list
        })
      }
    })
  }

  render () {
    let tabList = [
      { title: '门店' },
      { title: '餐厅' },
    ]
    return (
      <View className='search'>
      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.switchSeg.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
          <AtList>
          { this.state.list1 }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
          <AtList>
          { this.state.list2 }
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
