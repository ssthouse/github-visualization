<template>
  <div>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field label="github usename"
          v-model="username"
          class="input-group--focused"></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-btn @click="showProjects">show projects</v-btn>
        <v-btn @click="sendMail">Send mail</v-btn>
      </v-flex>
    </v-layout>
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
import ProjectPlot from './ProjectView'
import ProjectDao from './dao/projectDao'
import EmailSender from './util/emailSender'

export default {
  name: 'Main',
  components: { 'project-plot': ProjectPlot },
  data() {
    return {
      projectDao: new ProjectDao(),
      username: '',
      emailSender: new EmailSender()
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
    },
    sendMail(){
      this.emailSender.sendEmail('ssthouse@163.com', 'test subject', 'test body')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
