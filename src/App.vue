<template>
  <div id="app">
    <v-content>
      <v-toolbar style="margin-bottom: 32px;">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Github Visualization</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat href="https://github.com/ssthouse">
            <v-avatar size=42>
              <img src="https://avatars3.githubusercontent.com/u/10973821?s=460&v=4">
            </v-avatar>
            <span style="margin-left:8px;">About me</span>
          </v-btn>
          <v-btn flat href="https://github.com/ssthouse/github-visualization">
            <v-avatar size=42>
              <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png">
            </v-avatar>
            Source Code</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script>
import env from '@/components/util/env'

export default {
  name: 'App',
  data() {
    return {
      items: [
        { title: 'Config', icon: 'dashboard', to: 'config' },
        { title: 'Main', icon: 'question_answer', to: 'main' }
      ]
    }
  },
  methods: {
    switchComponent(newRouter) {
      this.$router.push(newRouter)
    }
  },
  mounted() {
    env.setEnv(process.env)
  }
}
</script>

<style>
#drawerMenu {
  background-color: #eeeeee;
  display: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: inherit;
}
</style>
