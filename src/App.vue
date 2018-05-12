<template>
  <div id="app">
    <v-content>
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
  margin-top: 60px;
}
</style>
