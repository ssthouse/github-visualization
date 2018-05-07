const UserInfo = {
  state: {
    username: 'ssthouse',
    avatarUrl: 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png',
    follwerList: [],
    followingList: [],
    repositoryBeanList: []
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.avatarUrl = userInfo.avatarUrl
    },
    updateUsername(state, username) {
      state.username = username
    },
    updateRepositoryBeanList(state, repositoryBeanList) {
      state.repositoryBeanList = repositoryBeanList
    }
  },
  actions: {}
}

export default UserInfo
