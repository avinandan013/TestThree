/**
 * Imports
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'lil-gui'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/static/textures/door/color.jpg')






/**
 * Functions
 */
window.addEventListener('resize',()=>{
  //size reset
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //camera aspect update
  pCamera.aspect = sizes.width/sizes.height

  //camera update
  pCamera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})






/**
 * Global Declarations
 */
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

//GUI declaration
const gui = new dat.GUI()





/**
 * Scene set up
 */
const scene = new THREE.Scene()






/**
 * Object and Mesh Setup
 */
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1,4,4,4),
  new THREE.MeshBasicMaterial({
    map: texture, 
    side: THREE.DoubleSide, 
    wireframe: false
  })
)
// scene.add(cube1)









/**
 * Camera setup
 */
const pCamera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,1000)
pCamera.position.set(0,0,5)
scene.add (pCamera)








/**
 * Canvas setup
 */
const canvas = document.querySelector('.webgl')








/**
 * Renderer setup
 */
const renderer = new THREE.WebGLRenderer({
  canvas : canvas,
  antialias : true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,pCamera)







/**
 * Helper set up (axes helper, camera helper)
 */
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


const pCameraHelper = new THREE.CameraHelper(pCamera)
scene.add(pCameraHelper)








/**
 * Orbit Controller
 */
const orbitController = new OrbitControls(pCamera,canvas)
orbitController.enableDamping = true
orbitController.dampingFactor = 0.01






/**
 * GUI debug functions
 */
gui
  .add(cube1.position, 'x')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('cube X')
gui
  .add(cube1.position, 'y')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('cube Y')
gui
  .add(cube1.position, 'z')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('cube Z')
gui
  .add(cube1.material, 'wireframe')
gui
  .addColor(cube1.material, 'color')
gui
  .add(cube1,'visible')
  









/**
 * Animation
 */

const animate = () => {
  
  renderer.render(scene,pCamera)
  orbitController.update()
  window.requestAnimationFrame(animate)
}
animate()


