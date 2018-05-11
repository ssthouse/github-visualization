// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import store from './store/index'
import HTTP from './plugin/axios'
import * as d3 from 'd3'
import leancloud from './components/dao/leancloud'

Vue.use(VueResource)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$axios = HTTP
Vue.prototype.$d3 = d3
Vue.prototype.$leancloud = leancloud

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
