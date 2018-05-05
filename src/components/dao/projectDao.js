import store from '@/store/index'
import http from '@/plugin/axios'
import RepositoryBean from '@/store/userinfo/bean/repositoryBean'

export default class ProjectDao {
  constructor() {
    this.store = store
  }

  getRepositoryBeanListFromQuery(data) {
    if (!data) {
      return
    }
    const repositoryBeanList = []
    const nodes = data.user.repositories.nodes
    for (let i = 0; i < nodes.length; i++) {
      const curRepositpry = nodes[i]
      repositoryBeanList.push(
        new RepositoryBean(
          curRepositpry.name,
          curRepositpry.ref.target.history.totalCount
        )
      )
    }
    return repositoryBeanList
  }

  getAllProjects() {
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
              name
              ref(qualifiedName: "master") {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
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
          avatarUrl: user.avatarUrl
        })
        this.store.commit(
          'updateRepositoryBeanList',
          this.getRepositoryBeanListFromQuery(response.data.data)
        )
      })
      .catch(response => {
        console.log('~~~~~~~~~~~~~~~~error get all projects')
      })
  }
}
