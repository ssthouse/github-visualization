<template>
  <div>
    Config page:
    <v-text-field label="domain:" :value="domain"></v-text-field>
    <v-text-field label="secretToken:" :value="secretToken"></v-text-field>
    <v-btn @click="testConnection()">Test connection</v-btn>
  </div>
</template>

<script>
import ProjectDao from './dao/project-dao'

export default {
  name: 'Config',
  data() {
    return {
      projectDao: new ProjectDao(),
      domain: 'http://product-ci',
      secretToken: '-Xu7Geu11Uz95k6dQLjE'
    }
  },
  http: {
    headers: {
      PrivateToken: 'Basic -Xu7Geu11Uz95k6dQLjE'
    }
  },
  methods: {
    testConnection() {
      this.projectDao.getAllProjects()
      // console.log('test connection')

      // this.$http
      //   .get(this.domain + '/api/v4' + '/projects/all', {
      //     params: {
      //       private_token: '-Xu7Geu11Uz95k6dQLjE'
      //     }
      //   })
      //   .then(
      //     response => {
      //       console.log(response.body)
      //     },
      //     errResponse => {
      //       console.log('list projects fail')
      //     }
      //   )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
