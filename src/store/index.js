import Vue from 'vue'
import Vuex from 'vuex'
import gitlabConfig from './gitlab/gitlabConfig'
import userinfo from './userinfo/userinfo'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    gitlabConfig,
    userinfo
  }
})

export default store
