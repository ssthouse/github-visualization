<template>
  <div>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field label="github usename" v-model="username" class="input-group--focused"></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-btn @click="showProjects">show projects</v-btn>
      </v-flex>
    </v-layout>
    <v-avatar :tile="false" size="120px" class="grey lighten-4">
      <img :src="avatarUrl" alt="avatar">
    </v-avatar>

    <project-plot></project-plot>
  </div>
</template>

<script>
import ProjectPlot from './ProjectView'
import ProjectDao from './dao/projectDao'
import userRecorder from './dao/userRecorder'
import env from '@/components/util/env'

export default {
  name: 'Main',
  components: { 'project-plot': ProjectPlot },
  data() {
    return {
      projectDao: new ProjectDao(),
      username: '',
      userRecorder
    }
  },
  computed: {
    avatarUrl() {
      return this.$store.state.userinfo.avatarUrl
    }
  },
  methods: {
    showProjects() {
      this.$store.commit('updateUsername', this.username)
      this.projectDao.getAllProjects()
      this.userRecorder.addRecord(this.username)
    }
  },
  created() {
    env.setEnv(process.env)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
