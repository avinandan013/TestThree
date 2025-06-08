import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Texture loader
 */
const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('/static/textures/matcaps/3.png')
const cubetextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubetextureLoader.load([
  '/static/textures/environmentMaps/3/px.jpg',
  '/static/textures/environmentMaps/3/nx.jpg',
  '/static/textures/environmentMaps/3/py.jpg',
  '/static/textures/environmentMaps/3/ny.jpg',
  '/static/textures/environmentMaps/3/pz.jpg',
  '/static/textures/environmentMaps/3/nz.jpg',
])



/**
 * Font Loader
 */

const donuts = []
const dices = []
const starVertices = []

const fontLoader = new FontLoader
fontLoader.load(
    '/static/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry = new TextGeometry(
            'Avinandan',
            {
                font : font,
                size : 0.5,
                height : 0.2,
                depth : 0.2,
                curveSegments : 12,
                bevelEnabled : true,
                bevelThickness: 0.03,
                bevelSize : 0.02,
                bevelOffset : 0,
                bevelSegment: 5
            }
        )
        textGeometry.center()
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x -0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y -0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z -0.02) * 0.5
        // )

        //Donut material
        const material = new THREE.MeshMatcapMaterial({
            matcap
        })

        //Dice material
        const material2 = new THREE.MeshStandardMaterial()
        material2.metalness = 1
        material2.roughness = 0
        material2.envMap = environmentMapTexture

        const material3 = new THREE.MeshNormalMaterial({ wireframe : true})
        

        //Star material
        const starMaterial = new THREE.PointsMaterial({
            color : 0xffffff,
            size: 0.7,
            sizeAttenuation : true 
        })

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        console.time('donut')
        const donutGeometry = new THREE.TorusGeometry(0.5,0.3,20,45)

        for(let i=0; i<80; i++){
            const donut = new THREE.Mesh(donutGeometry,material2)

            // donut.position.x = (Math.random() - 0.5) * 12
            // donut.position.y = (Math.random() - 0.5) * 12
            // donut.position.z = (Math.random() - 0.5) * 12

            let x, y, z;
            do {
                x = (Math.random() - 0.5) * 24
                y = (Math.random() - 0.5) * 12
                z = (Math.random() - 0.5) * 12
            } 
            while (Math.sqrt(x * x + y * y + z * z) < 3.5)

            donut.position.set(x, y, z)

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale,scale,scale)

            scene.add(donut)
            donuts.push(donut)
        }
        console.timeEnd('donut')


        const diceGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)

        

        for (let i=0;i<10; i++){
            const dice = new THREE.Mesh(
                diceGeometry,
                material3
            )

            

            dice.position.x = (Math.random() - 0.5) * 13
            dice.position.y = (Math.random() - 0.5) * 13
            dice.position.z = (Math.random() - 0.5) * 13

            dice.rotation.x = Math.random() * Math.PI
            dice.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            dice.scale.set(scale,scale,scale)

            scene.add (dice)
            dices.push (dice)

        }


        const starGeometry = new THREE.BufferGeometry()

        for (let i = 0; i<1000; i++){
            const x = (Math.random() - 0.5) * 1000
            const y = (Math.random() - 0.5) * 1000
            const z = (Math.random() - 0.5) * 1000

            starVertices.push(x,y,z)
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

        const stars = new THREE.Points(starGeometry,starMaterial)
        scene.add(stars)

        // scene.add(new THREE.Mesh(
        //     new THREE.PolyhedronGeometry(),
        //     material3
        // ))

    }
)


/**
 * Resize function
 */
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    pCamera.aspect = sizes.width/sizes.height
    pCamera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})



/**
 * Material
 */
const material = new THREE.MeshStandardMaterial()

/**
 * Scene
 */
const scene = new THREE.Scene()




/**
 * Mesh
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
    
)




/**
 * Sizes
 */

const sizes ={
    width : window.innerWidth,
    height : window.innerHeight
}


/**
 * camera
 */
const pCamera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,2000)

pCamera.position.z = 5



/**
 * Scene add
 */
scene.add(pCamera)

/**
 * Canvas
 */
const canvas = document.querySelector('.webgl')


/**
 * Orbit controller
 */
const orbitController = new OrbitControls(pCamera,canvas)
orbitController.enableDamping = true
orbitController.dampingFactor = 0.01

/**
 * Light
 */
const pointLight = new THREE.PointLight(0xffffff,1)
pointLight.position.set(-1,0,1.5)
scene.add(pointLight)



/**
 * helper 
 */
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
// cube.add(new THREE.AxesHelper())

// const PointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(PointLightHelper)




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas : canvas,
    antialias : true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render (scene,pCamera)







/**
 * debug UI
 */
const gui = new dat.GUI()

const meshFolder = gui.addFolder('Mesh Properties')
const cubeFolder = meshFolder.addFolder('Cube Properties')
const lightFolder = gui.addFolder('Light Properties')
const positionFolder = lightFolder.addFolder('Position')

meshFolder
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .name('Overall roughness')
meshFolder
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .name('Overall metalness')
meshFolder
    .add(cube, 'visible')

cubeFolder
    .addColor(cube.material, 'color')
cubeFolder
    .add(cube.position, 'x')
    .min(-5)
    .max(5)
    .name ('Position x')
cubeFolder
    .add(cube.position, 'y')
    .min(-5)
    .max(5)
    .name ('Position y')
cubeFolder
    .add(cube.position, 'z')
    .min(-5)
    .max(5)
    .name ('Position z')


positionFolder
    .add(pointLight.position, 'x')
    .min(-5)
    .max(5)
    .name('Light x')
positionFolder
    .add(pointLight.position, 'y')
    .min(-5)
    .max(5)
    .name('Light y')
positionFolder
    .add(pointLight.position, 'z')
    .min(-5)
    .max(5)
    .name('Light z')
lightFolder
    .add(pointLight, 'intensity')
    .min(0)
    .max(50)
    .step(1)

// gui.close()












/**
 * Animate
 */
const clock = new THREE.Clock()

const animate=()=>{
    const elapsedTime = clock.getElapsedTime()

//donut animation
    donuts.forEach((donut) =>{
        donut.rotation.x = elapsedTime
    })

//dice animation
    dices.forEach((dice)=>{
        dice.rotation.x = -elapsedTime
    })

    //stars animation

    pCamera.rotation.y = Math.sin(elapsedTime) * 2
    pCamera.lookAt(0,0,0)
    
    orbitController.update()
    renderer.render(scene,pCamera)
    window.requestAnimationFrame(animate)
}
animate()