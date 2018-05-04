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
            viewer {
                login
                name
            }
        }`
    }
    http
      .post('', JSON.stringify(queryJson))
      .then(response => {
        console.log(response.data)
      })
      .catch(response => {
        console.log('~~~~~~~~~~~~~~~~error get all projects')
      })
  }
}
