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
      return this.$store.state.userinfo.repositoryBeanList
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
