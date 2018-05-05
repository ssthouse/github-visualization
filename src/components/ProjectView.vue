<template>
  <div>
    <v-btn @click="update">Update</v-btn>

    <div style="width: 100%; height: 500px; position: relative;">
      <svg id="projectViewSvg"></svg>
      <div id="projectViewDiv"></div>
    </div>

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
      g: null,
      areaScale: null,
      textScale: null,
      div: null
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
      this.div = this.$d3.select('#projectViewDiv')
    },
    startDisplay() {
      this.areaScale = this.$d3
        .scaleSqrt()
        .domain([
          this.$d3.min(this.repositoryList, d => d.count),
          this.$d3.max(this.repositoryList, d => d.count)
        ])
        .range([20, 80])

      this.textScale = this.$d3
        .scaleSqrt()
        .domain([
          this.$d3.min(this.repositoryList, d => d.count),
          this.$d3.max(this.repositoryList, d => d.count)
        ])
        .range([4, 24])

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
          .attr('r', d => self.areaScale(d.count))
        repositoryCircles.exit().remove()

        const texts = self.div.selectAll('span').data(self.repositoryList)
        texts
          .enter()
          .append('span')
          .merge(texts)
          .text(d => d.name)
          .style('font-size', d => self.textScale(d.count) + 'px')
          .style('left', d => d.x - 25 + 'px')
          .style('top', d => d.y - 10 + 'px')
        texts.exit().remove()
      }

      // start simulation
      this.$d3
        .forceSimulation(this.repositoryList)
        .force('charge', this.$d3.forceManyBody())
        .force(
          'collide',
          this.$d3.forceCollide().radius(d => this.areaScale(d.count) + 3)
        )
        .force('forceX', this.$d3.forceX(300).strength(0.5))
        .force('forceY', this.$d3.forceY(200).strength(0.5))
        .on('tick', tick)
    },
    update() {
      this.initChartContainer()
      this.startDisplay()
    }
  },
  mounted() {
    console.log('get data in mounted state' + this.repositoryList)
    window.vue = this
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
    font-size: 6px;
    fill: white;
    text-anchor: middle;
    font-family: 'Arial';
  }
}

#projectViewDiv {
  width: 100%;
  height: 500px;

  span {
    position: absolute;
    display: block;
    width: 50px;
    word-wrap: break-word;
    color: white;
  }
}
</style>
