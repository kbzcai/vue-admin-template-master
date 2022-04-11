import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    meta: {title: '主看板', icon: 'dashboard'},
    children: [{
      path: '/dashboard1',
      name: 'Dashboard1',
      component: () => import('@/views/dashboard1/index'),
      meta: {title: '主看板1', icon: 'dashboard', roles: ['admin']}
    },
      {
        path: '/dashboard2',
        name: 'Dashboard2',
        component: () => import('@/views/dashboard2/index'),
        meta: {title: '主看板2', icon: 'dashboard', roles: ['editor']}
      },
      {
        path: '/dashboard3',
        name: 'Dashboard3',
        component: () => import('@/views/dashboard3/index'),
        meta: {title: '主看板3', icon: 'dashboard', roles: ['editor']}
      }
    ]
  },
  {
    path: '/produce',
    component: Layout,
    name: 'Produce',
    meta: {title: '生产管理', icon: 'el-icon-s-custom'},
    children: [
      {
        path: 'workingPlan',
        name: 'WorkingPlan',
        component: () => import('@/views/workingPlan/index'),
        meta: {title: '开始生产', icon: 'el-icon-monitor'}
      },
      {
        path: 'plan',
        name: 'Plan',
        component: () => import('@/views/plan/index'),
        meta: {title: '计划管理', icon: 'el-icon-bangzhu'}
      },
      {
        path: 'unqualified',
        name: 'Unqualified',
        component: () => import('@/views/unqualified/index'),
        meta: {title: '补焊管理', icon: 'el-icon-s-order'}
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    name: 'Form',
    meta: {title: '物料管理', icon: 'el-icon-s-management'},
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/form/index'),
        meta: {title: '产品查询', icon: 'el-icon-search'}
      },
      {
        path: 'bom',
        name: 'Bom',
        component: () => import('@/views/bom/index'),
        meta: {title: '物料查询', icon: 'el-icon-search'}
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/equipmentinfo',
    name: 'equipment',
    meta: {title: '设备管理', icon: 'el-icon-s-cooperation'},
    children: [
      {
        path: 'equipmentinfo',
        name: 'Equipmentinfo',
        component: () => import('@/views/equipmentinfo/index'),
        meta: {title: '设备信息', icon: 'el-icon-document'}
      },
      {
        path: 'plcinfo',
        name: 'Plcinfo',
        component: () => import('@/views/plcinfo/index'),
        meta: {title: 'PLC信息', icon: 'el-icon-cpu'}
      },
      {
        path: 'faultinfo',
        name: 'Faultinfo',
        component: () => import('@/views/faultinfo/index'),
        meta: {title: '故障信息', icon: 'el-icon-error'}
      },
      {
        path: 'repairinfo',
        name: 'repairinfo',
        component: () => import('@/views/repairinfo/index'),
        meta: {title: '维修信息', icon: 'el-icon-first-aid-kit'}
      },
      {
        path: 'stationinfo',
        name: 'stationinfo',
        component: () => import('@/views/stationinfo/index'),
        meta: {title: '工位信息', icon: 'el-icon-s-claim'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: '设备状态', icon: 'el-icon-s-data'}
      }
    ]
  },
  {
    path: '/station',
    component: Layout,
    redirect: '/station/stationonetstatus',
    name: 'station',
    meta: {title: '工作线状态', icon: 'el-icon-s-platform'},
    children: [
      {
        path: 'stationonetstatus',
        name: 'stationonetstatus',
        component: () => import('@/views/stationonestatus/index'),
        meta: {title: '线路1', icon: 'el-icon-data-analysis'}
      },
      {
        path: 'stationtwotstatus',
        name: 'stationtwotstatus',
        component: () => import('@/views/stationtwostatus/index'),
        meta: {title: '线路2', icon: 'el-icon-data-analysis'}
      },
      {
        path: 'stationthreestatus',
        name: 'stationthreestatus',
        component: () => import('@/views/stationthreestatus/index'),
        meta: {title: '线路3', icon: 'el-icon-data-analysis'}
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {title: 'Example', icon: 'el-icon-s-help'},
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: {title: 'Table', icon: 'table'}
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: {title: 'Tree', icon: 'tree'}
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
