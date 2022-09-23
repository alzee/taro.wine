import home from './icon/home.png'
import homeFill from './icon/home-fill.png'
import wine from './icon/wine-bottle.png'
import wineFill from './icon/wine-bottle-fill.png'
import company from './icon/company.png'
import companyFill from './icon/company-fill.png'
import order from './icon/order.png'
import orderFill from './icon/order-fill.png'
import cart from './icon/cart.png'
import cartFill from './icon/cart-fill.png'
import store from './icon/store.png'
import storeFill from './icon/store-fill.png'
import account from './icon/account.png'
import accountFill from './icon/account-fill.png'
import discounts from './icon/discounts.png'
import discountsFill from './icon/discounts-fill.png'
import dine from './icon/dine.png'
import dineFill from './icon/dine-fill.png'

export const Items = [
      { // 0
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": home,
        "selectedIconPath": homeFill
      },
      { // 1
        "pagePath": "/pages/org/index",
        "text": "机构",
        "iconPath": company,
        "selectedIconPath": companyFill
      },
      { // 2
        "pagePath": "/pages/product/index",
        "text": "产品",
        "iconPath": wine,
        "selectedIconPath": wineFill
      },
      { // 3
        "pagePath": "/pages/orders/index",
        "text": "订单",
        "iconPath": order,
        "selectedIconPath": orderFill
      },
      { // 4
        "pagePath": "/pages/returns/index",
        "text": "退货",
        // "iconPath": "/image/index_dark.png",
        // "selectedIconPath": "/image/index_light.png"
      },
      { // 5
        "pagePath": "/pages/withdraw/index",
        "text": "提现",
        "iconPath": discounts,
        "selectedIconPath": discountsFill
      },
      { // 6
        "pagePath": "/pages/retail/index",
        "text": "零售",
        "iconPath": cart,
        "selectedIconPath": cartFill
      },
      { // 7
        "pagePath": "/pages/dine/index",
        "text": "餐饮",
        "iconPath": dine,
        "selectedIconPath": dineFill
      },
      { // 8
        "pagePath": "/pages/store/index",
        "text": "门店",
        "iconPath": store,
        "selectedIconPath": storeFill
      },
      { // 9
        "pagePath": "/pages/me/index",
        "text": "我",
        "iconPath": account,
        "selectedIconPath": accountFill
      },
]
