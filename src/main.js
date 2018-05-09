import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Vuelazyload from 'vue-lazyload'
import 'common/scss/index.scss' // 遗漏导入index.scss

Vue.config.productionTip = false
Vue.use(Vuelazyload)
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
