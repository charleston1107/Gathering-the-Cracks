import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Raycaster, Vector2 } from "three";



const scene = new THREE.Scene()
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x67DA7A})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.position.set(0,3,-3)
cubeMesh.userData = { url: "index.html" };
//scene.add(cubeMesh)

const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x67DA7A})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
//scene.add(sphereMesh);
sphereMesh.position.set(-3,1,-3);
sphereMesh.userData = { url: "photos.html" };

const camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth/window.innerHeight,
    0.1,
    300);
scene.add(camera);
camera.position.set(0,2,4);
camera.rotateX(Math.PI/6);

const raycaster = new Raycaster();
const mouse = new Vector2();




const loader = new GLTFLoader();

loader.load('/assets/3d/HdrSkyOvercast001_JPG_1K.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});




loader.load('/Bacheng1_test1_merged3.glb', (gltf) => {
  const model = gltf.scene;

  model.position.set(-5,-6,-10);
  model.rotation.y = Math.PI;   // rotates 180° around Z axis

  scene.add(model);
}, undefined, (err) => {
  console.error(err);
});


let bricks=null;
let brickOriginalY = 0;
loader.load('/bricks1.glb', (gltf) => {
  bricks = gltf.scene;
  bricks.position.set(-15,-6,-35);
  brickOriginalY = bricks.position.y;
  scene.add(bricks);

  bricks.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "demolition.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});
//bricks.userData = { url: "demolition.html" };

let noodles = null;
let noodlesOriginalY = 0;
loader.load('/noodles-2.glb', (gltf) => {
  noodles = gltf.scene;
  noodles.position.set(8,-2,-11);
  noodlesOriginalY = noodles.position.y;
  scene.add(noodles);
  noodles.traverse((child) => {
    if (child.isMesh) {
      //child.userData = { url: "restaurant.html" };
      child.userData = { url: "restaurant.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});


let icecream = null;
let icecreamOriginalY = 0;
loader.load('/icecream3.glb', (gltf) => {
  icecream = gltf.scene;
  icecream.position.set(12,-5,-25);
  icecreamOriginalY = icecream.position.y;
  scene.add(icecream);
  icecream.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "icecreamshop.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});

let fish = null;
let fishOriginalY = 0;
loader.load('/fish4-2.glb', (gltf) => {
  fish = gltf.scene;
  fish.position.set(-3,-7,-9);
  fishOriginalY = fish.position.y;
  scene.add(fish);
  fish.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "market.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});


let buttonBoat = null;
let buttonBoatOriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonBoat = gltf.scene;
  buttonBoat.position.set(-4.5,-3,-20);
  buttonBoat.rotateY(-Math.PI/2);
  buttonBoatOriginalY = buttonBoat.position.y;
  scene.add(buttonBoat);
  buttonBoat.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "river.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});

 
let buttonRice = null;
let buttonRiceOriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonRice = gltf.scene;
  buttonRice.position.set(-13,5,-45);
  buttonRice.rotateY(-Math.PI/2);
  buttonRiceOriginalY = buttonRice.position.y;
  scene.add(buttonRice);
  buttonRice.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "ricebarn.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});


let buttonDog = null;
let buttonDogOriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonDog = gltf.scene;
  buttonDog.position.set(24,-4,-16);
  buttonDog.rotateY(-Math.PI/2);
  buttonDogOriginalY = buttonDog.position.y;
  scene.add(buttonDog);
  buttonDog.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "puppy.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});

/**  
let buttonBridge = null;
let buttonBridgeOriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonBridge = gltf.scene;
  buttonBridge.position.set(7,-2,-20);
  buttonBridge.rotateY(-Math.PI/2);
  buttonBridgeOriginalY = buttonBridge.position.y;
  scene.add(buttonBridge);
  buttonBridge.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "market.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});
*/

let buttonTin1 = null;
let buttonTin1OriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonTin1 = gltf.scene;
  buttonTin1.position.set(19,-2,-28);
  buttonTin1.rotateY(-Math.PI/2);
  buttonTin1OriginalY = buttonTin1.position.y;
  scene.add(buttonTin1);
  buttonTin1.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "fangfake.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});

let buttonTin2 = null;
let buttonTin2OriginalY = 0;
loader.load('/button.glb', (gltf) => {
  buttonTin2 = gltf.scene;
  buttonTin2.position.set(-19,-2,-28);
  buttonTin2.rotateY(-Math.PI/2);
  buttonTin2OriginalY = buttonTin2.position.y;
  scene.add(buttonTin2);
  buttonTin2.traverse((child) => {
    if (child.isMesh) {
      child.userData = { url: "tinhouse.html" };
    }
  });

}, undefined, (err) => {
  console.error(err);
});


// Create the gradient material
const gradientMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Color(0x98bda2) },
    color2: { value: new THREE.Color(0xffffff) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  depthWrite: false,
});

const bgGeometry = new THREE.PlaneGeometry(2, 2);
const bgMesh = new THREE.Mesh(bgGeometry, gradientMaterial);
bgMesh.frustumCulled = false; // always visible

// Create a separate scene for the background
const backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.Camera();
backgroundScene.add(bgMesh);





const canvas = document.querySelector('canvas.map3dscene')
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setClearColor(0x98bda2,0); // background


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);



const pointLight = new THREE.PointLight(0xFFFFFF, 20);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
pointLight.position.set(0,5,-20);
const pointLight1 = new THREE.PointLight(0xffad2a, 150);
pointLight1.position.set(-5,5,-10);
const pointLight2 = new THREE.PointLight(0xff4e6f, 150);
pointLight2.position.set(-7,5,-30);
const pointLight3 = new THREE.PointLight(0xFFFFFF, 60);
pointLight3.position.set(6,5,-25);

scene.add(pointLight, pointLight1,pointLight2);
scene.add(ambientLight);



//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(300,70)
//scene.add(lightHelper, gridHelper)

const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  if (bricks) {
    bricks.position.y = Math.sin(t) * 0.6 + brickOriginalY;
  }
  if(noodles)
  {
    noodles.position.y = Math.sin(t+Math.PI/6) * 0.6 + noodlesOriginalY;
  }
  if(icecream)
  {
    icecream.position.y = Math.sin(t-Math.PI/2) * 0.6 + icecreamOriginalY;
  }
  if(fish)
  {
    fish.position.y = Math.sin(t+2*Math.PI/3) * 0.6 + fishOriginalY -0.1;
  }
  if(buttonBoat)
  {
    buttonBoat.position.y = Math.sin(t-2*Math.PI/3) * 0.6 + buttonBoatOriginalY -0.1;
  }
  if(buttonRice)
  {
    buttonRice.position.y = Math.sin(t+Math.PI/4) * 0.6 + buttonRiceOriginalY -0.1;
  }
  if(buttonDog)
  {
    buttonDog.position.y = Math.sin(t+2*Math.PI/6) * 0.6 + buttonDogOriginalY;
  }
  /**  
  if(buttonBridge)
  {
    buttonBridge.position.y = Math.sin(t) * 0.6 + buttonBridgeOriginalY;
  }
  */
  if(buttonTin1)
  {
    buttonTin1.position.y = Math.sin(t-Math.PI/2) * 0.6 + buttonTin1OriginalY;
  }
  if(buttonTin2)
  {
    buttonTin2.position.y = Math.sin(t+Math.PI/3) * 0.6 + buttonTin2OriginalY -0.1;
  }
  renderer.autoClear = false;
  renderer.clear();
  renderer.render(backgroundScene, backgroundCamera);
  renderer.render( scene, camera );
  controls.update();

}


window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  loader.classList.add("hidden"); // triggers CSS fade-out
  setTimeout(() => loader.remove(), 1500); // removes it completely after fade
});



// Listen for clicks
window.addEventListener("click", (event) => {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Find intersections with clickable objects
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clicked = intersects[0].object;

    if (clicked.userData.url) {
      window.location.href = clicked.userData.url;
    }
  }
});



console.log('Bricks loaded:', bricks);if (bricks) {
    bricks.position.y = Math.sin(t) * 0.1 + originalY;
  }
  