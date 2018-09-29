import * as THREE from 'three.js'
import * as D3 from 'd3'

import fontPath from '../assets/fonts/gentilis_regular.typeface.json'
console.log(fontPath)
const OrbitControls = require('three-orbit-controls')(THREE)

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
    // this method need network
    this.loadFont()
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
    // load text related resource
    this.loadText()
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
    var material = new THREE.MeshNormalMaterial({ color: 0x554db6ac })
    var sphere = new THREE.Mesh(geometry, material)
    sphere.name = name
    this.scene.add(sphere)
    sphere.position.set(xIndex, yIndex, 0)
  }

  addTextsToScene() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    const texts = D3.select(this.virtualElement)
      .selectAll('text')
      .data(this.reporitoryList)
    texts
      .enter()
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        self.addText(
          datum.name,
          self.indexScale(datum.x),
          self.indexScale(datum.y),
          self.volumeScale(datum.count),
          'text' + i
        )
      })
      .append('text')
  }

  updateTextsIndex() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    D3.select(this.virtualElement)
      .selectAll('text')
      .data(this.reporitoryList)
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        const textMesh = self.scene.getObjectByName('text' + i)
        if (!textMesh.geometry.boundingBox) {
          textMesh.geometry.computeBoundingBox()
        }
        textMesh.position.x =
          self.indexScale(datum.x) -
          (textMesh.geometry.boundingBox.max.x -
            textMesh.geometry.boundingBox.min.x) /
            2
        textMesh.position.y = self.indexScale(datum.y)
      })
  }

  /**
   *
   * @param {number} xIndex
   * @param {number} yIndex
   * @param {number} size
   * @param {String} name name should be 'text' + index
   */
  addText(text, xIndex, yIndex, radius, name) {
    console.log('add text to scene')
    // some default setting:
    // let curveSegments = 4
    // let bevelThickness = 2
    // let bevelSize = 1.5
    // let bevelEnabled = true
    let textGeo = new THREE.TextGeometry(text, {
      font: this.font,
      size: 1,
      height: 0.04
      // curveSegments: curveSegments,
      // bevelThickness: bevelThickness,
      // bevelSize: bevelSize,
      // bevelEnabled: bevelEnabled
    })
    // textGeo.computeBoundingBox()
    // textGeo.computeVertexNormals()
    // textGeo = new THREE.BufferGeometry().fromGeometry(textGeo)
    let textMesh = new THREE.Mesh(textGeo, this.textMaterial)
    // textMesh.position.x = xIndex
    // textMesh.position.y = yIndex
    textMesh.position.z = radius + 1
    textMesh.name = name
    this.textGroup.add(textMesh)
  }

  loadText() {
    // this.textMaterials = [
    //   new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // for text
    //   new THREE.MeshPhongMaterial({ color: 0xffffff }) // for side
    // ]
    this.textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    this.textGroup = new THREE.Group()
    this.textGroup.position.z = 0
    this.scene.add(this.textGroup)
  }

  loadFont() {
    const loader = new THREE.FontLoader()
    loader.load(fontPath, response => {
      this.font = response
    })
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
    this.addTextsToScene()
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
        self.updateTextsIndex()
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
