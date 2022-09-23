import { Component } from 'react'
import Taro from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import { Env } from '../env/env'

import './index.scss'

export default class Index extends Component {
  USER_PAGE = {
    memberTabbarList : [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/image/index_dark.png",
        "selectedIconPath": "/image/index_light.png"
      },
      {
        "pagePath": "/pages/search/index",
        "text": "订单",
        "iconPath": "/image/search_dark.png",
        "selectedIconPath": "/image/search_light.png"
      },
      {
        "pagePath": "/pages/member/index",
        "text": "我的",
        "iconPath": "/image/member_dark.png",
        "selectedIconPath": "/image/member_light.png"
      }
    ],
    adminTabbarList : [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/image/index_dark.png",
        "selectedIconPath": "/image/index_light.png"
      },
      {
        "pagePath": "/pages/search/index",
        "text": "订单",
        "iconPath": "/image/search_dark.png",
        "selectedIconPath": "/image/search_light.png"
      },
      {
        "pagePath": "/pages/admin/index",
        "text": "管理",
        "iconPath": "/image/admin_dark.png",
        "selectedIconPath": "/image/admin_light.png"
      },
      {
        "pagePath": "/pages/member/index",
        "text": "我的",
        "iconPath": "/image/member_dark.png",
        "selectedIconPath": "/image/member_light.png"
      }
    ]
  }

  componentDidMount() {
    // let role = Taro.getStorageSync('role')
    // let list = []
    // switch (role) {
    //   case 1:
    //     list = this.USER_PAGE.memberTabbarList
    //   break
    //   case 2:
    //     list = this.USER_PAGE.adminTabbarList
    //   break
    // }
    // this.setState({list: list})
  }

  constructor(){
    super(...arguments)
    let role = Taro.getStorageSync(Env.storageKey).role
    // list = this.USER_PAGE.memberTabbarList
    // list = this.USER_PAGE.adminTabbarList
    let list = []
    switch (role) {
      case 1:
        console.log('user')
        list = this.USER_PAGE.memberTabbarList
      break
      case 2:
        console.log('admi')
        list = this.USER_PAGE.adminTabbarList
      break
    }
    console.log(role)
    console.log(list)

    // this.setState({list: list})

    this.state = {
      selected: 0,
      color: '#000000',
      selectedColor: '#DC143C',
      list: list
    }
    console.log(this.state)
  }

  state = {
    selected: 0,
    color: '#000000',
    selectedColor: '#DC143C',
    list: []
  }

  switchTab(index, url) {
    this.setSelected(index)
    Taro.switchTab({ url })
  }

  setSelected (idx: number) {
    this.setState({
      selected: idx
    })
  }

  render() {
    const { list, selected, color, selectedColor } = this.state
    console.log(this.state)

    return (
      <CoverView className='tab-bar'>
        <CoverView className='tab-bar-border'></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView key={index} className='tab-bar-item' onClick={this.switchTab.bind(this, index, item.pagePath)}>
              <CoverImage src={selected === index ? item.selectedIconPath : item.iconPath} />
              <CoverView style={{ color: selected === index ? selectedColor : color }}>{item.text}</CoverView>
            </CoverView>
          )
        })}
      </CoverView>
    )
  }
}
