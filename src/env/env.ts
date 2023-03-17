import Taro from '@tarojs/taro'

let baseUrl
let envVer = Taro.getAccountInfoSync().miniProgram.envVersion
console.log(envVer)

switch (envVer) {
  case 'develop':
    // baseUrl = 'https://127.0.0.1:8000/'
    // baseUrl = 'http://localhost:8000/'
    baseUrl = 'https://jiu.itove.com/'
    break
  case 'trial':
    baseUrl = 'https://jiu.itove.com/'
    break
  case 'release':
    baseUrl = 'https://hbljk.cn/';
    break
}

export const Env = {
  baseUrl: baseUrl,
  apiUrl: baseUrl + 'api/',
  imgUrl: baseUrl + 'img/',
  wxqrUrl: baseUrl + 'wxqr',
  storageKey: 'user',
  ver: '3.2.2'
}
