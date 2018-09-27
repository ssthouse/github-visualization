import * as THREE from 'three.js'

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
  }

  start() {
    var contaienrElement = document.getElementById(this.containerId)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0xeeeeee, 0.3)
    this.renderer.setSize(
      contaienrElement.getBoundingClientRect().width,
      contaienrElement.getBoundingClientRect().height
    )
    contaienrElement.appendChild(this.renderer.domElement)
    this.testAddCube()

    this.animate()
  }

  testAddCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    var cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.renderer.render(this.scene, this.camera)
  }
}

export default GithubViewThree
