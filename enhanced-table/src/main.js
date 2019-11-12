import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import EnhancedTable from '@/components/EnhancedTable'
import api from '@/common/api'
Vue.use(ElementUI)
// Vue.component('EnhancedTable', EnhancedTable)
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
