import * as THREE from 'three.js'
import * as D3 from 'd3'
import env from './util/env'

import fontPath from '../assets/fonts/gentilis_regular.typeface.json'
const OrbitControls = require('three-orbit-controls')(THREE)

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
    // this method need network
    // this.initScene()
    this.loadFont_()
  }

  initScene_() {
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
    this.camera.position.z = 350
    this.camera.position.y = 50
    this.camera.position.x = 50
    this.camera.lookAt(0, 0, 0)
    this.controls = new OrbitControls(this.camera, contaienrElement)

    // add light
    var light = new THREE.AmbientLight(0x404040, 1) // soft white light
    this.scene.add(light)
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.7)
    spotLight.position.set(0, 0, 200)
    spotLight.lookAt(0, 0, 0)
    this.scene.add(spotLight)
    this.addGround_()
    // load text related resource
    this.loadText()
    // TODO test use charMap cache
    this.loadAlphabetGeoMap()
    this.addAxisForDev_()
    this.animate_()
  }

  animate_() {
    requestAnimationFrame(() => this.animate_())
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  addAxisForDev_() {
    if (env.isDevMode()) {
      let axes = new THREE.AxisHelper(100)
      this.scene.add(axes)
    }
  }

  addGround_() {
    var geometry = new THREE.PlaneGeometry(350, 350, 32)
    var material = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,
      side: THREE.DoubleSide
    })
    var plane = new THREE.Mesh(geometry, material)
    plane.position.z = -100
    this.scene.add(plane)
  }

  loadAlphabetGeoMap() {
    this.charGeoMap = new Map()
    this.charWidthMap = new Map()
    const chars =
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-./?'
    chars.split('').forEach(char => {
      const textGeo = new THREE.TextGeometry(char, {
        font: this.font,
        size: 1.4,
        height: 0.04
      })
      textGeo.computeBoundingBox()
      const width = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x
      this.charGeoMap.set(char, textGeo)
      this.charWidthMap.set(char, width)
    })
    console.log(this.charGeoMap)
  }

  loadFont_() {
    const loader = new THREE.FontLoader()
    loader.load(fontPath, response => {
      this.font = response
    })
  }

  loadText() {
    this.textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.textGroup = new THREE.Group()
    this.textGroup.position.z = 0
    this.scene.add(this.textGroup)
  }

  /**
   * main function exposed
   */
  drawProjects(reporitoryList) {
    this.initScene_()
    this.reporitoryList = reporitoryList

    // initial scale
    this.layoutSize = 500
    const sceneSize = 280
    // use d3 to calculate the position of each circle
    this.calcluate3DLayout_()
    this.volumeScale = D3.scaleLinear()
      .domain([0, this.layoutSize])
      .range([0, sceneSize])
    this.indexScale = D3.scaleLinear()
      .domain([0, this.layoutSize])
      .range([-sceneSize / 2, sceneSize / 2])

    this.addTextsToScene()
    this.addBallsToScene_()
    // this.addMergedBallsToScene()
  }

  calcluate3DLayout_() {
    const pack = D3.pack()
      .size([this.layoutSize, this.layoutSize])
      .padding(5)
    const rootData = D3.hierarchy({
      children: this.reporitoryList
    }).sum(d => Math.pow(d.count, 1 / 3))
    this.data = pack(rootData).leaves()
  }

  addTextsToScene() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    const texts = D3.select(this.virtualElement)
      .selectAll('text')
      .data(this.data)
    texts
      .enter()
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        self.addTextWithCharGroup(
          datum.data.name,
          self.indexScale(datum.x),
          self.indexScale(datum.y),
          self.volumeScale(datum.r)
        )
      })
      .append('text')
  }

  /**
   *
   * @param {number} xIndex
   * @param {number} yIndex
   * @param {number} size
   */
  addText(text, xIndex, yIndex, radius) {
    console.log('add text to scene')
    let textGeo = new THREE.TextGeometry(text, {
      font: this.font,
      size: 1.4,
      height: 0.1
    })
    let textMesh = new THREE.Mesh(textGeo, this.textMaterial)
    if (!textMesh.geometry.boundingBox) {
      textMesh.geometry.computeBoundingBox()
    }

    const textWidth =
      textMesh.geometry.boundingBox.max.x - textMesh.geometry.boundingBox.min.x
    textMesh.position.set(xIndex - textWidth / 2, yIndex, radius + 2)
    this.textGroup.add(textMesh)
  }

  addTextWithCharGroup(text, xIndex, yIndex, radius) {
    const group = new THREE.Group()
    const chars = text.split('')

    let totalLen = 0
    chars.forEach(char => {
      if (!this.charWidthMap.get(char)) {
        totalLen += 1
        return
      }
      totalLen += this.charWidthMap.get(char)
    })
    const offset = totalLen / 2

    for (let i = 0; i < chars.length; i++) {
      const curCharGeo = this.charGeoMap.get(chars[i])
      if (!curCharGeo) {
        xIndex += 2
        continue
      }
      const curMesh = new THREE.Mesh(curCharGeo, this.textMaterial)
      curMesh.position.set(xIndex - offset, yIndex, radius + 2)
      group.add(curMesh)
      xIndex += this.charWidthMap.get(chars[i])
    }
    this.scene.add(group)
  }

  generateBallMesh_(xIndex, yIndex, radius, name) {
    var geometry = new THREE.SphereGeometry(radius, 32, 32)
    var sphere = new THREE.Mesh(geometry, this.ballMaterial)
    sphere.position.set(xIndex, yIndex, 0)
    return sphere
  }

  addBallsToScene_() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    this.ballMaterial = new THREE.MeshNormalMaterial({ color: 0x554db6ac })
    const circles = D3.select(this.virtualElement)
      .selectAll('circle')
      .data(this.data)
    circles
      .enter()
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        self.scene.add(
          self.generateBallMesh_(
            self.indexScale(datum.x),
            self.indexScale(datum.y),
            self.volumeScale(datum.r),
            i
          )
        )
      })
      .append('circle')
  }

  /**
   * @deprecated
   * even slower than addBallsToScene() due to merge function call
   */
  addMergedBallsToScene_() {
    const self = this
    if (!this.virtualElement) {
      this.virtualElement = document.createElement('svg')
    }
    const ballMeshList = []
    this.ballMaterial = new THREE.MeshNormalMaterial({ color: 0x554db6ac })
    const circles = D3.select(this.virtualElement)
      .selectAll('circle')
      .data(this.data)
    circles
      .enter()
      .each(function(d, i) {
        const datum = D3.select(this).datum()
        ballMeshList.push(
          self.generateBallMesh_(
            self.indexScale(datum.x),
            self.indexScale(datum.y),
            self.volumeScale(datum.r),
            i
          )
        )
      })
      .append('circle')

    // merge all ball geo & and them to scene
    const parentGeo = new THREE.CylinderGeometry(1, 1, 0, 16)
    ballMeshList.forEach(ballMesh => {
      ballMesh.updateMatrix()
      parentGeo.merge(ballMesh.geometry, ballMesh.matrix)
    })
    const parentMesh = new THREE.Mesh(parentGeo, this.ballMaterial)
    this.scene.add(parentMesh)
  }
}

export default GithubViewThree
