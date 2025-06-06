/**
 * Imports
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Loading manager
 */
const loadingManger = new THREE.LoadingManager()

loadingManger.onStart =() =>
{
  console.log('On Start')
}

loadingManger.onLoaded =() => 
{
  console.log('On Loaded')
}

loadingManger.onProgress =() =>
{
  console.log('On Progress')
}







/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loadingManger)
const colortexture = textureLoader.load('/static/textures/door/color.jpg')
const alphatexture = textureLoader.load('/static/textures/door/alpha.jpg')
const heighttexture = textureLoader.load('/static/textures/door/height.jpg')
const normaltexture = textureLoader.load('/static/textures/door/normal.jpg')
const ambientOcclusiontexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
const metalnesstexture = textureLoader.load('/static/textures/door/metalness.jpg')
const roughnesstexture = textureLoader.load('/static/textures/door/roughness.jpg')








//transform texture
colortexture.repeat.x = 2
colortexture.repeat.y = 2

colortexture.wrapS = THREE.RepeatWrapping
colortexture.wrapT = THREE.RepeatWrapping







/**
 * Functions
 */
window.addEventListener('resize', () => {
  //size reset
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //camera aspect update
  pCamera.aspect = sizes.width / sizes.height

  //camera update
  pCamera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})






/**
 * Global Declarations
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
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
  new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
  new THREE.MeshBasicMaterial({
    map: colortexture,
    side: THREE.DoubleSide,
    wireframe: false
  })
)
cube1.position.y = 0
scene.add(cube1)



//sphere for #Material
const material = new THREE.MeshBasicMaterial({ color: 'red' })

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)






/**
 * Camera setup
 */
const pCamera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
pCamera.position.set(0, 0, 5)
scene.add(pCamera)








/**
 * Canvas setup
 */
const canvas = document.querySelector('.webgl')








/**
 * Renderer setup
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, pCamera)







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
const orbitController = new OrbitControls(pCamera, canvas)
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
  .add(cube1, 'visible')










/**
 * Animation
 */

const animate = () => {

  renderer.render(scene, pCamera)
  orbitController.update()
  window.requestAnimationFrame(animate)
}
animate()


