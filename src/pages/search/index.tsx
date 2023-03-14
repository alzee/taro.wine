import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Search extends Component<PropsWithChildren> {
  instance = Taro.getCurrentInstance();
  keyword = this.instance.router.params.q
  pid = this.instance.router.params.p
  type = this.instance.router.params.t
  latitude: float
  longitude: float
  state = {
  }

  componentDidMount () {
    Taro.getStorage({
      key: 'coord',
      success: res => {
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
      },
      fail: res => {
        console.log('pls login');
      }
    })
    if (this.pid === undefined) {
      this.getOrgs()
    } else {
      this.getOrgsHaveProduct(this.pid)
    }
  }

  getOrgsHaveProduct(pid: int){
    Taro.request({
      url: Env.apiUrl + 'orgs-have-stock-of-product/' + pid,
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

      this.setState({list})
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

  getOrgs() {
    if (this.keyword === undefined) this.keyword = ''
    let query = '?display=true&name=' + this.keyword
    if (this.type !== undefined) {
      query += '&type= ' + this.type
    }
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

      this.setState({list})
    })
  }

  render () {
    return (
      <View className='search'>

        { this.state.list &&
          <>
          { this.state.list.length > 0 &&
          <AtList>
          { this.state.list }
          </AtList>

          ||

          <View className='no-result'>
          <Text>没有找到相应门店</Text>
          </View>
          }
          </>
        }

      </View>
    )
  }
}
