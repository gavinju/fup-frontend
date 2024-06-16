import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ViewUI from 'view-design'
import directives from './directive/index'
import 'view-design/dist/styles/iview.css'
import VueClipboards from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(directives) // 自定义指令
Vue.use(ViewUI)
Vue.use(VueClipboards)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
