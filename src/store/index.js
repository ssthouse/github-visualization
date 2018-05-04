import Vue from 'vue'
import Vuex from 'vuex'
import GitlabConfig from './gitlab_config.js'
import UserInfo from './user_info'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    gitlabConfig: GitlabConfig,
    userInfo: UserInfo
  }
})

export default store
