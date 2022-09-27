import { Component } from 'react'
import Taro from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import { Env } from '../env/env'
import { Items } from './items'

import './index.scss'

export default class Index extends Component {
  USER_TABBAR = {
    head: [
      Items[0],
      Items[1],
      Items[3],
      Items[9],
    ],
    agency: [
      Items[0],
      Items[1],
      Items[3],
      Items[9],
    ],
    store: [
      Items[0],
      Items[3],
      Items[9],
    ],
    restaurant: [
      Items[0],
      Items[3],
      Items[9],
    ],
    consumer: [
      Items[0],
      Items[1],
      Items[9],
    ]
  }

  componentDidMount() {
    // let role = Taro.getStorageSync('role')
    // let list = []
    // switch (role) {
    //   case 1:
    //     list = this.USER_TABBAR.agency
    //   break
    //   case 2:
    //     list = this.USER_TABBAR.store
    //   break
    // }
    // this.setState({list: list})
  }

  constructor(){
    console.log(Items)
    super(...arguments)
    let role = Taro.getStorageSync(Env.storageKey).role
    // list = this.USER_TABBAR.agency
    // list = this.USER_TABBAR.store
    let list = []
    switch (role) {
      case 0:
        list = this.USER_TABBAR.head
        list[1].text = '代理商'
        break
      case 1:
        list = this.USER_TABBAR.agency
        break
      case 2:
        list = this.USER_TABBAR.store
        break
      case 3:
        list = this.USER_TABBAR.restaurant
        break
      case 4:
        list = this.USER_TABBAR.consumer
        break
      default:
        list = this.USER_TABBAR.consumer
    }
    console.log(role)
    console.log(list)

    // this.setState({list: list})

    this.state = {
      selected: 0,
      color: '#000000',
      selectedColor: '#000000',
      list: list
    }
    console.log(this.state)
  }

  state = {
    selected: 0,
    color: '#000000',
    selectedColor: '#000000',
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

  componentDidShow () {
    console.log('fuck')
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
