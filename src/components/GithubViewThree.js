import * as THREE from 'three.js'
import * as D3 from 'd3'
const OrbitControls = require('three-orbit-controls')(THREE)

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
  }

  initScene() {
    var contaienrElement = document.getElementById(this.containerId)
    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor(0xeeeeee, 0.3)

    const width = contaienrElement.getBoundingClientRect().width
    const height = contaienrElement.getBoundingClientRect().height
    this.containerSize = Math.min(width, height)
    this.renderer.setSize(width, height)
    contaienrElement.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    this.camera.position.z = 200
    this.camera.position.y = 50
    this.camera.position.x = 50
    this.camera.lookAt(0, 0, 0)
    this.controls = new OrbitControls(this.camera)

    // add light
    var light = new THREE.AmbientLight(0x404040, 1) // soft white light
    this.scene.add(light)
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.7)
    spotLight.position.set(0, 0, 200)
    spotLight.lookAt(0, 0, 0)
    this.scene.add(spotLight)
    this.addGround()
    this.animate()
  }

  addGround() {
    var geometry = new THREE.PlaneGeometry(400, 400, 32)
    var material = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,
      side: THREE.DoubleSide
    })
    var plane = new THREE.Mesh(geometry, material)
    plane.position.z = -100
    this.scene.add(plane)
  }

  testAddCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    var cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  addBall(xIndex, yIndex, radius, name) {
    var geometry = new THREE.SphereGeometry(radius, 32, 32)
    var material = new THREE.MeshNormalMaterial({ color: 0x554DB6AC })
    var sphere = new THREE.Mesh(geometry, material)
    sphere.name = name
    this.scene.add(sphere)
    sphere.position.set(xIndex, yIndex, 0)
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  drawProjects(reporitoryList) {
    const self = this
    this.initScene()
    this.reporitoryList = reporitoryList

    // initial scale
    this.volumeScale = D3.scalePow()
      .exponent(1 / 3)
      .domain(D3.extent(this.reporitoryList, d => d.count))
      .range([2, 16])
    this.indexScale = D3.scaleLinear()
      .domain(D3.extent([0, 500]))
      .range([0, 100])

    this.addBallsToScene()
    // use d3 to calculate the position of each circle
    this.simulation = D3.forceSimulation(this.reporitoryList)
      .force('charge', D3.forceManyBody())
      .force(
        'collide',
        D3.forceCollide().radius(d => this.volumeScale(d.count) + 12)
      )
      .force('forceX', D3.forceX(0).strength(0.05))
      .force('forceY', D3.forceY(0).strength(0.05))
      .on('tick', function() {
        self.updateBallIndex()
      })
  }

  addBallsToScene() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    const circles = D3.select(this.virtualElement)
      .selectAll('circle')
      .data(this.reporitoryList)
    circles
      .enter()
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        self.addBall(
          self.indexScale(datum.x),
          self.indexScale(datum.y),
          self.volumeScale(datum.count),
          i
        )
      })
      .append('circle')
  }

  updateBallIndex() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    D3.select(this.virtualElement)
      .selectAll('circle')
      .data(this.reporitoryList)
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        self.scene.getObjectByName(i).position.x = self.indexScale(datum.x)
        self.scene.getObjectByName(i).position.y = self.indexScale(datum.y)
      })
  }
}

export default GithubViewThree
