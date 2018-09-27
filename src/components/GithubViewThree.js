import * as THREE from 'three.js'

class GithubViewThree {
  constructor(containerId) {
    this.containerId = containerId
  }

  start() {
    var contaienrElement = document.getElementById(this.containerId)
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(
      contaienrElement.getBoundingClientRect().width,
      contaienrElement.getBoundingClientRect().height
    )
    contaienrElement.appendChild(renderer.domElement)

    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    var cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }
}

export default GithubViewThree
