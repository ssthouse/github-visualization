<template>
  <div>
    <v-btn @click="update">Update</v-btn>

    <div id="projectViewContainer">
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
      height: 700,
      areaScale: null,
      textScale: null,
      simulation: null,
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
        .range([6, 24])

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
          .call(self.enableDragFunc())
        repositoryCircles.exit().remove()

        const texts = self.div.selectAll('span').data(self.repositoryList)
        texts
          .enter()
          .append('span')
          .merge(texts)
          .text(d => d.name)
          .style('font-size', d => self.textScale(d.count) + 'px')
          .style('left', d => d.x - self.areaScale(d.count) * 1.5 / 2 + 'px')
          .style('top', d => d.y - self.textScale(d.count) / 2 + 'px')
          .style('width', d => self.areaScale(d.count) * 1.5 + 'px')
        texts.exit().remove()
      }

      // start simulation
      const widthStr = this.div.style('width')
      this.width = parseFloat(widthStr.substr(0, widthStr.length - 2))
      this.simulation = this.$d3
        .forceSimulation(this.repositoryList)
        .force('charge', this.$d3.forceManyBody())
        .force(
          'collide',
          this.$d3.forceCollide().radius(d => this.areaScale(d.count) + 3)
        )
        .force('forceX', this.$d3.forceX(this.width / 2).strength(0.05))
        .force('forceY', this.$d3.forceY(this.height / 2).strength(0.05))
        .on('tick', tick)

      this.enableDragFunc()
    },
    enableDragFunc() {
      return this.$d3
        .drag()
        .on('start', d => {
          if (!this.$d3.event.active) this.simulation.alphaTarget(0.3).restart()
          d.fx = this.$d3.event.x
          d.fy = this.$d3.event.y
        })
        .on('drag', d => {
          d.fx = this.$d3.event.x
          d.fy = this.$d3.event.y
        })
        .on('end', d => {
          if (!this.$d3.event.active) this.simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
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
@svg-height: 700px;
#projectViewContainer {
  width: 100%;
  height: @svg-height;
  position: relative;

  #projectViewSvg {
    width: 100%;
    height: @svg-height;

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
    height: @svg-height;

    span {
      position: absolute;
      display: block;
      word-wrap: break-word;
      color: white;
      pointer-events: none;
    }
  }
}
</style>