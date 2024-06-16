import store from '@/store'
import ACCESS_ENUM from '@/access/accessEnum'
import checkAccess from '@/access/checkAccess'

/**
 * v-role 角色权限
 * @example: v-role="['admin','user']"
 */
export default {
  inserted(el, binding) {
    const { value } = binding
    let loginUser = store.state.user.loginUser

    if (Array.isArray(value) && value.length > 0) {
      const roles = value

      const hasRole = () => {
        if (checkAccess(loginUser, ACCESS_ENUM.ADMIN)) {
          return true
        }
        if (!loginUser.userRole || !roles.includes(loginUser.userRole)) {
          return false
        }
        return true
      }

      if (!hasRole()) {
        el.parentNode?.removeChild(el)
      }
    }
  },
}
