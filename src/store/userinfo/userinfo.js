const UserInfo = {
  state: {
    avatarUrl: 'https://avatars3.githubusercontent.com/u/10973821?v=4',
    follwerList: [],
    followingList: [],
    repositoryList: []
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      console.log(state)
      state.avatarUrl = userInfo.avatarUrl
      state.repositoryList = userInfo.repositoryList
    }
  },
  actions: {}
}

export default UserInfo
