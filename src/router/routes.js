import HomeView from '@/views/HomeView'
import TestView from '@/views/TestView'
import BasicLayout from '@/layouts/BasicLayout.vue'
import UserLayout from '@/layouts/UserLayout'
import UserLoginView from '@/views/user/UserLoginView'
import UserRegisterView from '@/views/user/UserRegisterView'
import AdminView from '@/views/AdminView'
import ACCESS_ENUM from '@/access/accessEnum'
import UserSpace from '@/views/user/UserSpace'
import FileView from '@/views/file/index'

/**
 * 导航栏菜单页
 */
export const appRouter = [
  { path: 'home', name: '主页', component: HomeView },
  { path: 'file', name: '文件', component: FileView },
  { path: 'test', name: '测试页', component: TestView },
]

export const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/file',
    children: appRouter,
  },
  {
    path: '/403',
    name: '无权限',
    component: () => import('@/views/error/403.vue'),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/*',
    name: '未找到',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hideInMenu: true,
    },
  },
]
