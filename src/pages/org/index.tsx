import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Org extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  agencies = []
  stores = []
  restaurants = []
  query: string = '?page=1'
  list = []
  list1 = []
  list2 = []
  role: int;
  latitude: float
  longitude: float

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
      s = s.toFixed(1) + 'km' //保留两位小数
      console.log('经纬度计算的距离:' + s)
      return s
  }

  componentDidMount () { 
    const self = this;

    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
      }
    })

    Taro.getStorage({
      key: 'coord',
      success: res => {
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
      }
    })

    Taro.request({
      url: Env.apiUrl + 'orgs' + this.query,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      let orgs = res.data
      console.log(orgs)
      for (let i in orgs) {
        switch (orgs[i].type) {
          case 1:
            this.agencies = [...this.agencies, orgs[i]]
            break;
          case 2:
            this.stores = [...this.stores, orgs[i]]
            break;
          case 3:
            this.restaurants = [...this.restaurants, orgs[i]]
            break;
        }
      }

      for (let i in this.stores) {
        this.list.push(
          <AtListItem
          onClick={() => {if (this.role == 4 || this.role == -1) this.openMap(this.stores[i].latitude, this.stores[i].longitude); else this.navToDetail(this.stores[i].id)}}
          title={this.stores[i].name}
          note={this.stores[i].address}
          // extraText={self.getDistance(self.latitude, self.longitude, self.stores[i].latitude, self.stores[i].longitude)}
          extraText={this.getDistance(self.latitude, self.longitude,self.stores[i].latitude, self.stores[i].longitude)}
          thumb={Env.imgUrl + 'storefront.png'}
          arrow='right'
          />
        )
      }
      for (let i in this.restaurants) {
        this.list1.push(
          <AtListItem
          // onClick={() => this.navToDetail(this.restaurants[i].id)}
          onClick={() => {if (this.role == 4 || this.role == -1) this.openMap(this.restaurants[i].latitude, this.restaurants[i].longitude); else this.navToDetail(this.restaurants[i].id)}}
          title={this.restaurants[i].name}
          note={this.restaurants[i].address}
          extraText={this.getDistance(self.latitude, self.longitude,self.restaurants[i].latitude, self.restaurants[i].longitude)}
          thumb={Env.imgUrl + 'storefront.png'}
          arrow='right'
          />
        )
      }
      for (let i in this.agencies) {
        this.list2.push(
          <AtListItem
          onClick={() => this.navToDetail(this.agencies[i].id)}
          title={this.agencies[i].name}
          note={this.agencies[i].address}
          // extraText='详细信息'
          thumb={Env.imgUrl + 'storefront.png'}
          arrow='right'
          />
        )
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      seg: 0,
    }
  }

  handleClick (value) {
    this.setState({
      seg: value
    })
  }

  navTo(page: string) {
    Taro.navigateTo({ url: 'pages/' + page + '/index' })
  }

  openMap(latitude, longitude){
    Taro.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }

  navToDetail(id){
    Taro.navigateTo({url: '/pages/orgDetail/index?id=' + id})
  }

  orgNew(orgType: int){
    Taro.navigateTo({url: '/pages/orgNew/index?type=' + orgType})
  }

  render () {
    let tabList = []
    if (this.role == 0) {
      tabList = [
        { title: '门店' },
        { title: '餐厅' },
        { title: '代理商' },
      ]
    } else {
      tabList = [
        { title: '门店' },
        { title: '餐厅' },
      ]
    }
    return (
      <View className='org'>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
        { this.role == 1 &&
        <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.orgNew(0)}>新增门店</AtButton>
        }
          <AtList>
          { this.list }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
        { this.role == 1 &&
        <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.orgNew(1)}>新增餐厅</AtButton>
        }
          <AtList>
          { this.list1 }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={2} >
        <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.orgNew(2)}>新增代理商</AtButton>
          <AtList>
          { this.list2 }
          </AtList>
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}
