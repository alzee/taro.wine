export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/org/index',
    'pages/me/index',
    'pages/orders/index',
    'pages/ordersNew/index',
    'pages/returns/index',
    'pages/returnsNew/index',
    'pages/voucher/index',
    'pages/withdraw/index',
    'pages/withdrawNew/index',
    'pages/retail/index',
    'pages/orderRestaurant/index',
    'pages/myInfo/index',
    'pages/wxlogin/index',
    'pages/login/index',
    'pages/chooseLogin/index',
    'pages/node/index',
    'pages/product/index',
    'pages/dine/index',
    'pages/store/index',
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
