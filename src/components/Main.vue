<template>
  <div>
    <div>
      <v-btn @click="showProjects">show projects</v-btn>
    </div>
    <v-avatar
      :tile="false"
      size="120px"
      class="grey lighten-4"
    >
      <img :src="avatarUrl" alt="avatar">
    </v-avatar>

    <project-plot></project-plot>
  </div>
</template>

<script>
import ProjectPlot from './ProjectPlot'
import ProjectDao from './dao/project-dao'

export default {
  name: 'Main',
  components: { 'project-plot': ProjectPlot },
  data() {
    return {
      projectDao: new ProjectDao()
    }
  },
  computed: {
    avatarUrl() {
      return this.$store.state.userinfo.avatarUrl
    }
  },
  methods: {
    showProjects() {
      this.projectDao.getAllProjects()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
