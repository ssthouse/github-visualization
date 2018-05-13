import store from '@/store/index'
import http from '@/plugin/axios'
import RepositoryBean from '@/store/userinfo/bean/repositoryBean'
import UserBean from '@/store/userinfo/bean/userBean'

export default class ProjectDao {
  constructor() {
    this.store = store
  }

  getRepositoryBeanListFromQuery(data) {
    if (!data) {
      return []
    }
    const repositoryBeanList = []
    const nodes = data.user.repositories.nodes
    for (let i = 0; i < nodes.length; i++) {
      const curRepositpry = nodes[i]
      if (!curRepositpry.ref) {
        continue
      }
      repositoryBeanList.push(
        new RepositoryBean(
          curRepositpry.name,
          curRepositpry.ref.target.history.totalCount,
          curRepositpry.isFork
        )
      )
    }
    return repositoryBeanList
  }

  getFollowingUserList(data) {
    if (!data) {
      return []
    }
    const followingUserList = []
    const nodes = data.user.following.nodes
    for (let i = 0; i < nodes.length; i++) {
      const curUser = nodes[i]
      followingUserList.push(
        new UserBean(curUser.id, curUser.login, curUser.name, curUser.avatarUrl)
      )
    }
    return followingUserList
  }

  getFollowerUserList(data) {
    if (!data) {
      return
    }
    const followerUserList = []
    const nodes = data.user.followers.nodes
    for (let i = 0; i < nodes.length; i++) {
      const curUser = nodes[i]
      followerUserList.push(
        new UserBean(curUser.id, curUser.login, curUser.name, curUser.avatarUrl)
      )
    }
    return followerUserList
  }

  getAllProjects() {
    const username = this.store.state.userinfo.username
    const queryJson = {
      query: `query {
        user(login: "${username}") {
          avatarUrl
          name
          followers(first: 100) {
            nodes {
              avatarUrl
              name
              id
              login
            }
          }
          following(first: 100) {
            nodes {
              avatarUrl
              name
              id
              login
            }
          }
          repositories(first: 100){
            totalCount
            pageInfo{
              hasNextPage
              endCursor
            }
            nodes{
              id
              name
              isFork
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
        this.store.commit('updateUserInfo', {
          avatarUrl: user.avatarUrl
        })
        this.store.commit(
          'updateRepositoryBeanList',
          this.getRepositoryBeanListFromQuery(response.data.data)
        )
        this.store.commit(
          'updateFollowerUserList',
          this.getFollowerUserList(response.data.data)
        )
        this.store.commit(
          'updateFollowingUserList',
          this.getFollowingUserList(response.data.data)
        )
      })
      .catch(response => {
        console.log('~~~~~~~~~~~~~~~~error get all projects')
      })
  }

  loadUserRepositoryList(username) {
    const queryJson = {
      query: `query {
        user(login: "${username}") {
          repositories(first: 100){
            totalCount
            pageInfo{
              hasNextPage
              endCursor
            }
            nodes{
              id
              name
              isFork
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
    return new Promise((resolve, reject) => {
      http
        .post('', JSON.stringify(queryJson))
        .then(response => {
          const repositoryList = this.getRepositoryBeanListFromQuery(
            response.data.data
          )
          resolve(repositoryList)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
