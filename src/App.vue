<template>
  <div id="app">
    <v-navigation-drawer id="drawerMenu" app>
      <v-toolbar flat>
        Gitlab Dashboard
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="switchComponent(item.to)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
     </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script>
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
