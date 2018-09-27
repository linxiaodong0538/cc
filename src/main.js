// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/utils/init'
import store from '@/store'
import '@/styles/global/index.scss'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import '@/styles/vant/index.scss'

Vue.config.productionTip = false

Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
