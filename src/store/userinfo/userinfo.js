const UserInfo = {
  state: {
    avatarUrl: 'https://avatars3.githubusercontent.com/u/10973821?v=4',
    follwerList: [],
    followingList: [],
    repositoryBeanList: []
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.avatarUrl = userInfo.avatarUrl
    },
    updateRepositoryBeanList(state, repositoryBeanList) {
      state.repositoryBeanList = repositoryBeanList
    }
  },
  actions: {}
}

export default UserInfo
