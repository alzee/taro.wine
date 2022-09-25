export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/me/index',
    'pages/org/index',
    'pages/orders/index',
    'pages/returns/index',
    'pages/voucher/index',
    'pages/withdraw/index',
    'pages/retail/index',
    'pages/orderRestaurant/index',
    'pages/myInfo/index',
    'pages/wxlogin/index',
    'pages/login/index',
    'pages/chooseLogin/index',
    'pages/node/index',
    'pages/product/index',
    'pages/store/index',
    'pages/dine/index',
    'pages/orgNew/index',
    'pages/orderNew/index',
    'pages/returnNew/index',
    'pages/retailNew/index',
    'pages/retailReturnNew/index',
    'pages/dineNew/index',
    'pages/withdrawNew/index',
    'pages/orgDetail/index',
    'pages/orderDetail/index',
    'pages/returnDetail/index',
    'pages/retailDetail/index',
    'pages/retailReturnDetail/index',
    'pages/withdrawDetail/index',
    'pages/storeDetail/index',
    'pages/dineDetail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
      {
        pagePath: 'pages/org/index',
        text: '机构',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
    ]
  }
})
