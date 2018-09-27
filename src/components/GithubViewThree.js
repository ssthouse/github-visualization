import * as THREE from 'three.js'
import * as D3 from 'd3'

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
  }

  initScene() {
    var contaienrElement = document.getElementById(this.containerId)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0xeeeeee, 0.3)
    this.containerSize = contaienrElement.getBoundingClientRect().width
    this.renderer.setSize(this.containerSize, this.containerSize)
    contaienrElement.appendChild(this.renderer.domElement)
    // this.testAddCube()

    this.animate()
  }

  testAddCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    var cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  addBall(xIndex, yIndex) {
    var geometry = new THREE.SphereGeometry(0.08, 32, 32)
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    var sphere = new THREE.Mesh(geometry, material)
    this.scene.add(sphere)
    sphere.position.set(xIndex / 200, yIndex / 200, 0)
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.renderer.render(this.scene, this.camera)
  }

  drawProjects(reporitoryList) {
    const self = this
    this.initScene()
    this.reporitoryList = reporitoryList
    // console.log(this.reporitoryList)

    // use d3 to calculate the position of each circle
    this.simulation = D3.forceSimulation(this.reporitoryList)
      .force('charge', D3.forceManyBody())
      .force('collide', D3.forceCollide().radius(10))
      .force('forceX', D3.forceX(this.containerSize / 2).strength(0.05))
      .force('forceY', D3.forceY(this.containerSize / 2).strength(0.05))

    let virtualElement = document.createElement('svg')
    const circles = D3.select(virtualElement)
      .selectAll('circle')
      .data(this.reporitoryList)
    circles.enter().each(function() {
      const datum = D3.select(this).datum()
      self.addBall(datum.x, datum.y)
    })
  }
}

export default GithubViewThree
