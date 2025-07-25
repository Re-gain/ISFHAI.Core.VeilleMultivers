// veille.js
import { veilleData } from './veilleData.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.150.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 50;

// Créer les systèmes stellaires à partir de veilleData
const rayonBase = 20;
veilleData.systemes.forEach((systeme, index) => {
  const angle = (index / veilleData.systemes.length) * Math.PI * 2;
  const x = Math.cos(angle) * rayonBase;
  const z = Math.sin(angle) * rayonBase;

  // Soleil
  const soleilGeo = new THREE.SphereGeometry(2, 32, 32);
  const soleilMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const soleil = new THREE.Mesh(soleilGeo, soleilMat);
  soleil.position.set(x, 0, z);
  scene.add(soleil);

  // Planètes
  const nbPlanetes = systeme.planetes.length;
  systeme.planetes.forEach((planete, i) => {
    const anglePlanete = (i / nbPlanetes) * Math.PI * 2;
    const px = x + Math.cos(anglePlanete) * 4;
    const pz = z + Math.sin(anglePlanete) * 4;

    const planeteGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const planeteMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
    const sphere = new THREE.Mesh(planeteGeo, planeteMat);
    sphere.position.set(px, 0, pz);

    // Stocke la fiche pour interaction
    sphere.userData.fiche = planete.fiche;

    // Interaction clic
    sphere.callback = () => window.open(planete.fiche, '_blank');
    scene.add(sphere);
  });
});

// Raycaster pour interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0 && intersects[0].object.callback) {
    intersects[0].object.callback();
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
