import Vue from 'vue'
import Vuex from 'vuex'
import GitlabConfig from './gitlab-config.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    gitlabConfig: GitlabConfig
  }
})

export default store
