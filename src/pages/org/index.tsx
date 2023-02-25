import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtIcon } from 'taro-ui'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { Picker } from '@tarojs/components'

export default class Org extends Component<PropsWithChildren> {
  role: int;
  latitude: float
  longitude: float
  state = {
    cities: ['十堰'],
    industryRange: ['零售'],
    industries: [],
    citySelected: 0,
    industrySelected: 0,
    seg: 0,
    value: '',
    page: 1
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

  getOrgs(type: int) {
    let key: string
    if (type == 1) {
      key = 'agencyList'
    }
    if (type == 2) {
      key = 'storeList'
    }
    if (type == 3) {
      key = 'restaurantList'
    }
    let query = '?display=true&type=' + type
    query += '&area=' + this.state.cities[this.state.citySelected]
    query += '&industry=' + this.state.industries[Number(this.state.industrySelected)].id
    Taro.request({
      url: Env.apiUrl + 'orgs' + query,
      success: function (res) {}
    }).then((res) =>{
      let orgs = res.data
      let list = []
      for (let i of orgs) {
        i.distance = this.getDistance(this.latitude, this.longitude,i.latitude, i.longitude)
      }

      orgs.sort((a, b) => a.distance - b.distance)

      for (let i of orgs) {
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(i.id)}
          title={i.name}
          note={i.address}
          extraText={i.distance + 'km'}
          thumb={Env.imgUrl + 'org/thumbnail/' + i.img}
          arrow='right'
          className='list-item'
          />
        )
      }

      this.setState({[key]: list})
    })
  }

  componentDidMount () { 
    const self = this;

    Taro.getStorage({
      key: 'coord',
      success: res => {
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
      },
      fail: res => {
        console.log('get storage failed: coord');
      }
    })

    Taro.request({
      url: Env.apiUrl + 'cities',
    }).then((res) =>{
      let cities = []
      for (let i of res.data) {
        cities.push(i.name)
      }
      this.setState({cities})
    })

    Taro.request({
      url: Env.apiUrl + 'industries',
    }).then((res) =>{
      let industries = res.data
      let industryRange = []
      for (let i of res.data) {
        industryRange.push(i.name)
      }
      this.setState({industryRange})
      this.setState(
        {industries}, 
        () => {
          this.getOrgs(2)
          this.getOrgs(3)
          Taro.getStorage({
            key: Env.storageKey,
            success: res => {
              this.role = res.data.role
              if (this.role == 0 || this.role == 10) {
                this.getOrgs(1)
              }
            },
            fail: res => {
              console.log('pls login');
              // Taro.redirectTo({ url: '/pages/chooseLogin/index' })
            }
          })
        }
      )
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  switchSeg (value) {
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

  cityChange = e => {
    this.setState({
      citySelected: e.detail.value
    }, () => {
      this.getOrgs(2)
      this.getOrgs(3)
      this.getOrgs(1)
    })
  }

  industryChange = e => {
    this.setState({
      industrySelected: e.detail.value
    }, () => {
      this.getOrgs(2)
      this.getOrgs(3)
      this.getOrgs(1)
    })
  }

  searchBarChange(value) {
    this.setState({
      value: value
    })
  }

	search(){
    if (this.state.value != '') {
      Taro.navigateTo({ url: '/pages/search/index?q=' + this.state.value })
    }
  }

  render () {
    let tabList = []
    if (this.role == 0 || this.role == 10) {
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

      <View className='hightlight'>
      <View className='pickers'>
      <Picker className='picker' mode='selector' range={this.state.cities} onChange={this.cityChange}>
      {this.state.cities[this.state.citySelected]} <AtIcon value='chevron-down' size='12' color='#000'></AtIcon>
      </Picker>
      <Picker className='picker' mode='selector' range={this.state.industryRange} onChange={this.industryChange}>
      {this.state.industryRange[this.state.industrySelected]} <AtIcon value='chevron-down' size='12' color='#000'></AtIcon>
      </Picker>
      </View>
      <AtSearchBar className='search-bar'
        value={this.state.value}
        onChange={this.searchBarChange.bind(this)}
        onActionClick={this.search.bind(this)}
      />
      </View>

      <AtTabs current={this.state.seg} tabList={tabList} onClick={this.switchSeg.bind(this)}>
        <AtTabsPane current={this.state.seg} index={0}>
          <AtList>
          { this.state.storeList }
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.seg} index={1}>
          <AtList>
          { this.state.restaurantList }
          </AtList>
        </AtTabsPane>
        { (this.role == 0 || this.role == 10) &&
        <AtTabsPane current={this.state.seg} index={2} >
          <AtList>
          { this.state.agencyList }
          </AtList>
        </AtTabsPane>
        }
      </AtTabs>

      </View>
    )
  }
}
