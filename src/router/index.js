import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '@/store'
import ACCESS_ENUM from '@/access/accessEnum'
import checkAccess from '@/access/checkAccess'
import { LoadingBar } from 'view-design'
import { getUserLogin } from '@/api/user'

Vue.use(VueRouter)

/**
 * 无需用户登录态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/user/register', '/user/login'];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  // console.log(to.path)
  // 排除登录页和注册页等白名单发送请求
  if(NO_NEED_LOGIN_WHITE_LIST.includes(to.path)){
    next()
    return
  }
  LoadingBar.start()
  // console.log("登陆用户信息", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser
  // // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    getUserLogin().then((loginRes) => {
      if (loginRes.code === 0) {
        store.commit('updateUser', loginRes.data)
        loginUser = store.state.user.loginUser
      }
    })
  }
  const needAccess = to.meta.access ?? ACCESS_ENUM.NOT_LOGIN
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next('/403')
      return
    }
  }
  LoadingBar.finish()
  next()
})

export default router
