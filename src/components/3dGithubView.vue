<template>
  <div class='container'>
    <div id="view-container">
    </div>
  </div>
</template>

<script>
import GithubViewThree from './GithubViewThree'

export default {
  data() {
    return {
      githubView: null,
      rendered: false
    }
  },
  props: ['repositoryList', 'visible'],
  methods: {
    logTest() {
      this.githubView.drawProjects(this.repositoryList)
    },
    clear() {
      this.githubView.clear()
    }
  },
  mounted() {
    if (!this.githubView) {
      this.githubView = new GithubViewThree('view-container')
    }
  },
  watch: {
    visible: function(newVal) {
      if (newVal && !this.rendered) {
        this.rendered = true
        setTimeout(() => {
          this.githubView.drawProjects(this.repositoryList)
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  #view-container {
    height: 700px;
    width: 100%;
  }
}
</style>
