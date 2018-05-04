<template>
  <div>
    <svg id="projectPlotSvg"></svg>
     <v-list>
      <template v-for="item in repositoryList">
        <div :key="item.id">
          <span>{{item.name}}</span>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ProjectPlot',
  data() {
    return {}
  },
  computed: {
    repositoryList() {
      return this.$store.state.userInfo.repositoryList
    }
  },
  mounted() {
    console.log(this.repositoryList)
    console.log(this.$d3.schemeSet1[1])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
