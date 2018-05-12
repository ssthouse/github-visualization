<template>
  <div class="main">
    <!-- usernam input form -->
    <v-layout row wrap>
      <v-flex md4 offset-md4>
        <div class="flex-row">
          <v-text-field label="github usename" v-model="username" class="input-group--focused"></v-text-field>
          <v-btn @click="showProjects">show</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <!-- action list -->
    <v-layout row wrap>
      <v-flex md4 offset-md4 xs12>
        <v-card style="width: 100%;">
          <v-card-title primary-title class="action-title">Support actions:</v-card-title>
          <div style="display: flex; flex-direction: column">
            <v-chip selected>Zoom by mouse wheel</v-chip>
            <v-chip selected>Circles can be draged</v-chip>
          </div>
        </v-card>
      </v-flex>
      <v-flex md4 offset-md4 xs12 style="margin-top: 20px; margin-bottom: 20px;">
        <v-avatar :tile="false" size="120px" class="grey lighten-4">
          <img :src="avatarUrl" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>

    <users-card :userList="followingUserList"></users-card>

    <!-- user's project view -->
    <project-view></project-view>
  </div>
</template>

<script>
import ProjectView from './ProjectView'
import UsersCard from './UsersCard'
import ProjectDao from './dao/projectDao'
import userRecorder from './dao/userRecorder'
import env from '@/components/util/env'

export default {
  name: 'Main',
  components: { 'project-view': ProjectView, 'users-card': UsersCard },
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
    },
    followingUserList() {
      return this.$store.state.userinfo.followingUserList
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
<style scoped lang="less">
.main {
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .action-title {
    font-size: 24px;
  }

  .card {
    padding: 16px;
  }
}
</style>
