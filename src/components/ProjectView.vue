<template>
  <div>
    <v-btn @click="update">Update</v-btn>
    <svg id="projectViewSvg"></svg>
     <v-list>
      <template v-for="item in repositoryList">
        <div :key="item.id">
          <span>{{`${item.name}   ~   ${item.count}`}}</span>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ProjectPlot',
  data() {
    return {
      g: null
    }
  },
  computed: {
    repositoryList() {
      return this.$store.state.userinfo.repositoryBeanList
    }
  },
  methods: {
    initChartContainer() {
      if (this.g) {
        return
      }
      const svg = this.$d3.select('#projectViewSvg')
      this.g = svg.append('g')
    },
    startDisplay() {
      const self = this
      const tick = function() {
        const repositoryCircles = self.g
          .selectAll('circle')
          .data(self.repositoryList)
        repositoryCircles
          .enter()
          .append('circle')
          .merge(repositoryCircles)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.count / 5)
        repositoryCircles.exit().remove()

        const texts = self.g.selectAll('text').data(self.repositoryList)
        texts
          .enter()
          .append('text')
          .merge(texts)
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .text(d => d.name)
        texts.exit().remove()
      }

      const simulation = this.$d3
        .forceSimulation(this.repositoryList)
        .force('charge', this.$d3.forceManyBody())
        .force('collide', this.$d3.forceCollide().radius(d => d.count / 5))
        .force('forceX', this.$d3.forceX(200))
        .force('forceY', this.$d3.forceY(200))
        .on('tick', tick)
    },
    update() {
      this.initChartContainer()
      this.startDisplay()
    }
  },
  mounted() {
    console.log('get data in mounted state' + this.repositoryList)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#projectViewSvg {
  width: 100%;
  height: 500px;

  circle {
    fill: teal;
  }

  text {
    fill: white;
    stroke: white;
    font-size: 11px;
    text-anchor: middle;
  }
}
</style>
