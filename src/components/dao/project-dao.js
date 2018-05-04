import store from '@/store/index'
import http from '@/plugin/axios'

export default class ProjectDao {
  constructor() {
    this.store = store
  }

  getAllProjects() {
    const baseUrl = this.store.state.gitlabConfig.domainName
    const queryJson = {
      query: `query {
        user(login: "ssthouse") {
          avatarUrl
          name
          repositories(first: 100){
            totalCount
            pageInfo{
              hasNextPage
              endCursor
            }
            nodes{
              id
            }
          }
        }
      }`
    }
    http
      .post('', JSON.stringify(queryJson))
      .then(response => {
        const user = response.data.data.user
        // update data in vuex
        this.store.commit('updateUserInfo', {
          avatarUrl: user.avatarUrl,
          repositoryList: user.repositories.nodes
        })
      })
      .catch(response => {
        console.log('~~~~~~~~~~~~~~~~error get all projects')
      })
  }
}
