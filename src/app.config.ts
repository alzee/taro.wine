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
    'pages/voucherNew/index',
    'pages/orgDetail/index',
    'pages/orderDetail/index',
    'pages/returnDetail/index',
    'pages/retailDetail/index',
    'pages/retailReturnDetail/index',
    'pages/withdrawDetail/index',
    'pages/storeDetail/index',
    'pages/dineDetail/index',
    'pages/fuck/index',
    'pages/fuck1/index',
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
        pagePath: 'pages/fuck/index',
        text: '首页',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
      {
        pagePath: 'pages/fuck1/index',
        text: '机构',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
      {
        pagePath: 'pages/index/index',
        text: '首页',
        // iconPath:
        // selectedIconPath: // 40kb, 81px*81px
      },
      // {
      //   pagePath: 'pages/org/index',
      //   text: '机构',
      //   // iconPath:
      //   // selectedIconPath: // 40kb, 81px*81px
      // },
      // { // 2
      //   pagePath: "pages/product/index",
      //   text: "产品",
      // },
      // { // 3
      //   "pagePath": "pages/orders/index",
      //   "text": "订单",
      // },
      // { // 4
      //   "pagePath": "pages/returns/index",
      //   "text": "退货",
      // },
      // { // 5
      //   "pagePath": "pages/withdraw/index",
      //   "text": "提现",
      // },
      // { // 6
      //   "pagePath": "pages/retail/index",
      //   "text": "零售",
      // },
      // { // 7
      //   "pagePath": "pages/dine/index",
      //   "text": "餐饮",
      // },
      // { // 8
      //   "pagePath": "pages/store/index",
      //   "text": "门店",
      // },
      // {
      //   pagePath: 'pages/me/index',
      //   text: '我的',
      //   // iconPath:
      //   // selectedIconPath: // 40kb, 81px*81px
      // },
    ]
  }
})
