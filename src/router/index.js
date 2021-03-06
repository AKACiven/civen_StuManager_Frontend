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
    path: '/Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/Register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    meta: {
      title: '主页',
      icon: 'form'
    },
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: 'HomePage', icon: 'el-icon-s-home' }
      }
    ]
  },

  {
    path: '/Student',
    name: '学生管理',
    component: Layout,
    hidden: false,
    meta: { title: '学生管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'Update',
        name: 'Update',
        component: () => import('@/views/student/stuUpdate'),
        meta: { title: '更新学生信息', icon: 'el-icon-user-solid' }
      }
    ]
  },

  {
    path: '/Department',
    name: '院系统计',
    component: Layout,
    hidden: false,
    redirect: '/Department/GradeScale',
    meta: { title: '院系统计', icon: 'el-icon-star-on' },
    children: [
      {
        path: 'GradeScale',
        name: 'GradeScale',
        component: () => import('@/views/department/scale'),
        meta: { title: '总体成绩', icon: 'el-icon-s-platform' }
      },
      {
        path: 'GradeRank',
        name: 'GradeRank',
        component: () => import('@/views/department/rank'),
        meta: { title: '系排名', icon: 'el-icon-s-data' }
      }
    ]
  },

  {
    path: '/Course',
    name: '课程',
    component: Layout,
    hidden: false,
    redirect: '/Course/CourseScale',
    meta: { title: '课程', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'CourseScale',
        name: 'CourseScale',
        component: () => import('@/views/course/coursetable'),
        meta: { title: '课程总览', icon: 'el-icon-menu' }
      },
      {
        path: 'InCourse',
        name: 'InCourse',
        component: () => import('@/views/course/incourse'),
        meta: { title: '录入成绩', icon: 'el-icon-s-release' }
      },
      {
        path: 'OutCourse',
        name: 'OutCourse',
        component: () => import('@/views/course/outcourse'),
        meta: { title: '添加学生', icon: 'el-icon-circle-plus' }
      }
    ]
  },

  {
    path: '/test',
    name: 'Test',
    component: Layout,
    hidden: true,
    meta: { title: 'Test', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'time',
        name: 'time',
        component: () => import('@/views/test/time'),
        meta: { title: 'test', icon: 'el-icon-s-home' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
