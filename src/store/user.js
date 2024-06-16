/**
 * @desc 用户状态管理
 */
const user = {
  state: {
    loginUser: {
      userName: '未登录',
      userRole: null,
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload
    },
    userLogout(state) {
      state.loginUser = {
        userName: '未登录',
        userRole: null,
      }
    },
  },
}

export default user
