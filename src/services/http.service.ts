import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export class HttpService {
  get(api: string) {
    return Taro.request({
      url: Env.apiUrl + api,
      success: function (res) { self.setState({data: res.data}) }
    })
  }

  post(api: string, data: any) {
  }

  patch(api: string, data: any) {
  }

}
