<template>
  <div>
    Config page:
    <v-text-field label="domain:" :value="domainName"></v-text-field>
    <v-text-field label="private token:" :value="privateToken"></v-text-field>
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
      domainName: this.$store.state.gitlabConfig.domainName,
      privateToken: this.$store.state.gitlabConfig.privateToken
    }
  },
  methods: {
    testConnection() {
      this.projectDao.getAllProjects()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
