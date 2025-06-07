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
const doorColortexture = textureLoader.load('/static/textures/door/color.jpg')
const alphatexture = textureLoader.load('/static/textures/door/alpha.jpg')
const heighttexture = textureLoader.load('/static/textures/door/height.jpg')
const normaltexture = textureLoader.load('/static/textures/door/normal.jpg')
const ambientOcclusiontexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
const metalnesstexture = textureLoader.load('/static/textures/door/metalness.jpg')
const roughnesstexture = textureLoader.load('/static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/static/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/static/textures/gradients/3.jpg')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter






//transform texture
doorColortexture.repeat.x = 2
doorColortexture.repeat.y = 2

doorColortexture.wrapS = THREE.RepeatWrapping
doorColortexture.wrapT = THREE.RepeatWrapping







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
    map: doorColortexture,
    side: THREE.DoubleSide,
    wireframe: false
  })
)
cube1.position.y = 0
// scene.add(cube1)



//sphere for #Material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColortexture
// material.side = THREE.DoubleSide

// material.transparent = true

// material.alphaMap = alphatexture
// material.alphaMap = alphatexture


// Mesh Normal Material
// const material = new THREE.MeshNormalMaterial
// material.flatShading = true
// material.wireframe = true

//Mesh MatcapMaterial
// const material = new THREE.MeshMatcapMaterial
// material.matcap = matcapTexture

//Mesh Depth Material
// const material = new THREE.MeshDepthMaterial

//Mesh Lambert Material (we need lights for it)
// const material = new THREE.MeshLambertMaterial()

//Mesh Phong Material (less performance)
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 199
// material.specular = new THREE.Color(0xff0000)

//Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
 
//Mesh Standard Material
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.5

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material,
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)








/**
 * Light set up
 */

const ambientLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff,20)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 1
scene.add(pointLight)


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

const clock = new THREE.Clock()

const animate = () => {

  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.x = 0.1 * elapsedTime
  plane.rotation.x = 0.1 * elapsedTime
  torus.rotation.x = 0.1 * elapsedTime

  sphere.rotation.y = 0.15 * elapsedTime
  plane.rotation.y = 0.15 * elapsedTime
  torus.rotation.y = 0.15 * elapsedTime

  renderer.render(scene, pCamera)
  orbitController.update()
  window.requestAnimationFrame(animate)
}
animate()


