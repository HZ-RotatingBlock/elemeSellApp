import Vue from 'vue'
import Router from 'vue-router'
// import VHeader from '@/views/header/header'
import VGoods from '@/views/goods/goods'
import VRatings from '@/views/ratings/ratings'
import VSeller from '@/views/seller/seller'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: VGoods
    },
    {
      path: '/goods',
      name: 'goods',
      component: VGoods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: VRatings
    },
    {
      path: '/seller',
      name: 'seller',
      component: VSeller
    }
  ]
})
