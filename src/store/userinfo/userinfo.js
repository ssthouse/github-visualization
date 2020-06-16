const UserInfo = {
  state: {
    username: 'ssthouse',
    avatarUrl:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
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
