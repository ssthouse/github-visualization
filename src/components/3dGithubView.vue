<template>
  <div id="view-container">
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
  methods: {},
  mounted() {
    this.githubView.start()
  }
}
</script>

<style scoped>
#view-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}
</style>
