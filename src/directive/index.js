import hasRole from './permission/hasRole'

const install = function (Vue) {
  Vue.directive('role', hasRole)
}

export default install
