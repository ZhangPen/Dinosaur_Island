import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 主路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: 'home', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// 左侧路由列表
// 设置权限roles: ['admin']--只有admin才能看到
export const asyncRoutes = [
  {
    path: '/mallType',
    component: Layout,
    redirect: '/mallType/dinosaurMall',
    alwaysShow: true,
    name: '商城类型',
    meta: {
      title: 'mallType',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'dinosaurMall',
        component: () => import('@/views/mallType/dinosaurMall'),
        name: 'Dinosaur Mall',
        meta: { title: 'dinosaurMall' }
      },
      {
        path: 'memberMall',
        component: () => import('@/views/mallType/memberMall'),
        name: 'Member Mall',
        meta: { title: 'memberMall' }
      },
      {
        path: 'functionMall',
        component: () => import('@/views/mallType/functionMall'),
        name: 'Function Mall',
        meta: { title: 'functionMall' }
      },
      {
        path: 'propertyMall',
        component: () => import('@/views/mallType/propertyMall'),
        name: 'Property Mall',
        meta: { title: 'propertyMall' }
      },
      {
        path: 'teamMall',
        component: () => import('@/views/mallType/teamMall'),
        name: 'Team Mall',
        meta: { title: 'teamMall' }
      },
      {
        path: 'otherMall',
        component: () => import('@/views/mallType/otherMall'),
        name: 'Other Mall',
        meta: { title: 'otherMall' }
      }
    ]
  },
  {
    path: '/skinMall',
    component: Layout,
    redirect: '/skinMall/ordinarySkin',
    alwaysShow: true,
    name: '皮肤商城',
    meta: {
      title: 'skinMall',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'ordinarySkin',
        component: () => import('@/views/skinMall/ordinarySkin'),
        name: 'Ordinary Skin',
        meta: { title: 'ordinarySkin' }
      },
      {
        path: 'braveSkin',
        component: () => import('@/views/skinMall/braveSkin'),
        name: 'Brave Skin',
        meta: { title: 'braveSkin' }
      },
      {
        path: 'epicSkin',
        component: () => import('@/views/skinMall/epicSkin'),
        name: 'Epic Skin',
        meta: { title: 'epicSkin' }
      }
    ]
  },
  // 购买记录
  {
    path: '/purchaseRecord',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/purchaseRecord/index'),
        name: 'Purchase Record',
        meta: { title: 'purchaseRecord', icon: 'el-icon-tickets' }
      }
    ]
  },
  // 用户团队
  {
    path: '/teamOfUsers',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teamOfUsers/index'),
        name: 'Team Of Users',
        meta: { title: 'teamOfUsers', icon: 'el-icon-wind-power' }
      }
    ]
  },
  // 账单管理
  {
    path: '/billManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/billManagement/index'),
        name: 'Bill Management',
        meta: { title: 'billManagement', icon: 'el-icon-document-copy' }
      }
    ]
  },
  // 商品管理
  {
    path: '/commodityManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/commodityManagement/index'),
        name: 'Commodity Management',
        meta: { title: 'commodityManagement', icon: 'el-icon-shopping-cart-full' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
