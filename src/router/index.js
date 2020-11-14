import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router)

export default new Router({
    //给<router-link>自带的点击就添加的类router-link-active起别名
    linkActiveClass: 'active',
    routes: [{
        path: '/goods',
        component: goods
    }, {
        path: '/ratings',
        component: ratings
    }, {
        path: '/seller',
        component: seller
    }, {
        path: '/',
        redirect: '/goods'
    }]
})