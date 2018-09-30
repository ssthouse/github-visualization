<template>
  <div class="main">
    <!-- usernam input form -->
    <v-layout row wrap>
      <v-flex md6 offset-md3>
        <div class="flex-row">
          <v-text-field label="github usename" v-model="username" class="input-group--focused"></v-text-field>
          <v-btn @click="showProjects">show</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>

      <!-- action list -->
      <v-flex md6 offset-md3 xs12>
        <v-card style="width: 100%;">
          <v-card-title primary-title class="action-title">Support actions:</v-card-title>
          <div style="display: flex; flex-direction: column">
            <v-chip selected>
              <strong>Zoom by mouse wheel</strong>
            </v-chip>
            <v-chip selected>
              <strong>Circles can be draged</strong>
            </v-chip>
            <v-chip selected>
              <strong>Click following user's avatar to see their repositories</strong>
            </v-chip>
            <v-chip selected>
              <strong>Hover on circle to see repository commit number</strong>
            </v-chip>

            <h3 style="margin-top: 20px;">
              <strong>Hint: username is the last part of your github profile page:</strong>
              <br/>
              <strong>eg: https://github.com/ssthouse ==> ssthouse</strong>
            </h3>
          </div>
        </v-card>
      </v-flex>

      <!-- avatar -->
      <v-flex md4 offset-md4 xs12 style="margin-top: 20px; margin-bottom: 20px;">
        <v-avatar :tile="false" size="120px" class="grey lighten-4">
          <img :src="avatarUrl" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>

    <!-- follwing user list -->
    <users-card :userList="followingUserList" @selectUser="selectUser"></users-card>

    <v-switch label="Use 3D" v-model="use3D"></v-switch>

    <div>
      <!-- user's project view -->
      <project-view v-show="!use3D" :repositoryList="repositoryList"></project-view>
      <!-- github view in 3d -->
      <github-view-3d v-show="use3D" :repositoryList="repositoryList3D"></github-view-3d>
    </div>
  </div>
</template>

<script>
import ProjectView from './ProjectView'
import githubView3D from './3dGithubView'
import UsersCard from './UsersCard'
import ProjectDao from './dao/projectDao'
import userRecorder from './dao/userRecorder'
import env from './util/env'
import MockData from './util/mockData'

export default {
  name: 'Main',
  components: {
    'project-view': ProjectView,
    'github-view-3d': githubView3D,
    'users-card': UsersCard
  },
  data() {
    return {
      projectDao: new ProjectDao(),
      username: '',
      userRecorder,
      repositoryList: [],
      repositoryList3D: [],
      use3D: env.isDevMode()
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
      this.updateUrl(this.username)
      this.$store.commit('updateUsername', this.username)
      this.projectDao.getAllProjects()
      this.userRecorder.addRecord(this.username)
    },
    selectUser(username) {
      this.projectDao
        .loadUserRepositoryList(username)
        .then(repositoryList => {
          this.repositoryList = JSON.parse(JSON.stringify(repositoryList))
          this.repositoryList3D = JSON.parse(JSON.stringify(repositoryList))
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUrl(username) {
      this.$router.push({ name: 'main', query: { user: username } })
    },
    initUsernameFromUrl() {
      if (
        !this.$router.currentRoute.query ||
        !this.$router.currentRoute.query.user
      ) {
        return
      }
      const userInUrl = this.$router.currentRoute.query.user
      this.username = userInUrl
    }
  },
  watch: {
    '$store.state.userinfo.repositoryBeanList': {
      handler: function(newVal) {
        this.repositoryList = JSON.parse(JSON.stringify(newVal))
        this.repositoryList3D = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  },
  mounted() {
    if (this.username) {
      this.showProjects()
    }
    // is dev mode ? set mock data
    if (env.isDevMode()) {
      this.repositoryList = MockData.getRepositoryList()
      this.repositoryList3D = MockData.getRepositoryList()
    }
  },
  created() {
    env.setEnv(process.env)
    this.initUsernameFromUrl()
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
