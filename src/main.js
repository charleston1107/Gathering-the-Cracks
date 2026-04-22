import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scrollY = 0;
let targetScrollY = 0;
window.addEventListener('scroll', () => {
  targetScrollY = window.scrollY;
});


const scene = new THREE.Scene()
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x67DA7A})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
const camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth/window.innerHeight,
    0.1,
    300)
//camera.position.set(-5,3,15)
const t0 = document.body.getBoundingClientRect().top
camera.position.z = t0*-0.01;
camera.position.x = t0*-0.0002;
camera.position.y = t0*-0.0002;

cubeMesh.position.set(5,0,0)

const loader = new GLTFLoader();
loader.load('/Bacheng1_test1_merged3.glb', (gltf) => {
  const model = gltf.scene;

  model.position.set(4,-2,-10);
  model.rotateY(Math.PI);

  scene.add(model);
}, undefined, (err) => {
  console.error(err);
});

loader.load('/images_2.glb', (gltf) => {
  const model = gltf.scene;

  model.position.set(1,3,5);
  model.rotateX(Math.PI/2);

  scene.add(model);
}, undefined, (err) => {
  console.error(err);
});

const canvas = document.querySelector('canvas.mythreejs')
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
//document.body.appendChild( renderer.domElement );
renderer.setClearColor(0xffffff); // background

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);



const pointLight = new THREE.PointLight(0xff719c, 60);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
pointLight.position.set(-3,3,2)

const pointLight1 = new THREE.PointLight(0xffad2a, 60);
pointLight1.position.set(3,3,-2);

const pointLight2 = new THREE.PointLight(0xffad2a, 60);
pointLight2.position.set(15,3,-7);

Array(200).fill().forEach(addStar)





scene.add(camera)
//scene.add(cubeMesh)
scene.add(pointLight, ambientLight)
scene.add(pointLight1, pointLight2)
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(300,70)
//scene.add(lightHelper, gridHelper)


function moveCamera()
{
  //const t = document.body.getBoundingClientRect().top
  cubeMesh.rotation.x += 0.01;
  cubeMesh.rotation.y += 0.015;
  cubeMesh.rotation.z += 0.02;

  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}
//document.body.onscroll = moveCamera
//using another method to do scrolling, so commented out.

function animate() {

  //cubeMesh.rotation.x += 0.01;
  //cubeMesh.rotation.y += 0.01;

  renderer.render( scene, camera );
  controls.update();
  

  scrollY += (targetScrollY - scrollY) * 0.1;

  // Map scroll to camera motion
  camera.position.z = 30 + scrollY * -0.01;
  //camera.position.x = scrollY * 0.0005;
  //camera.position.y = scrollY * 0.0002;

  controls.update();
  renderer.render(scene, camera);

}

function addStar()
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xe2ffeb});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star);
}

console.log(cubeMesh)
console.log(scene)
console.log(window)
