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
    'pages/productDetail/index',
    'pages/qr/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    selectedColor: '#000000',
    list: [
      { // 0
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": './icon/home.png',
        "selectedIconPath": './icon/home-fill.png'
      },
      { // 1
        "pagePath": "pages/org/index",
        "text": "门店",
        "iconPath": './icon/company.png',
        "selectedIconPath": './icon/company-fill.png'
      },
      { // 3
        "pagePath": "pages/orders/index",
        "text": "订单",
        "iconPath": './icon/order.png',
        "selectedIconPath": './icon/order-fill.png'
      },
      { // 9
        "pagePath": "pages/me/index",
        "text": "我",
        "iconPath": './icon/account.png',
        "selectedIconPath": './icon/account-fill.png'
      },
    ]
  }
})
