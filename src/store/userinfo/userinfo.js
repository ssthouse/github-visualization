const UserInfo = {
  state: {
    username: 'ssthouse',
    avatarUrl:
      'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png',
    follwerUserList: [],
    followingUserList: [],
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
    },
    updateFollowingUserList(state, userList) {
      state.followingUserList = userList
    },
    updateFollowerUserList(state, userList) {
      state.follwerUserList = userList
    }
  },
  actions: {}
}

export default UserInfo
