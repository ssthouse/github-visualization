<template>
  <div class='container'>
    <div id="view-container">
    </div>
    <v-btn @click='logTest'>show projects</v-btn>
  </div>
</template>

<script>
import GithubViewThree from './GithubViewThree'

export default {
  data() {
    return {
      githubView: new GithubViewThree('view-container')
    }
  },
  props: ['repositoryList'],
  methods: {
    logTest() {
      // console.log(this.repositoryList)
      this.githubView.drawProjects(this.repositoryList)
    }
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  #view-container {
    height: 500px;
    width: 100%;
  }
}
</style>
