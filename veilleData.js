// main.js
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.3;

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffcc00 })
);
scene.add(sun);

const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x3fdad8 });
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

const labels = document.getElementById('labels');
const modal = document.getElementById('modal');

import { veilleData } from './veilleData.js';
const planets = [];

veilleData.systemes.forEach((system, sIndex) => {
  system.planetes.forEach((entry, i) => {
    const geo = new THREE.SphereGeometry(0.3, 32, 32);
    const planet = new THREE.Mesh(geo, planetMaterial.clone());
    const orbitRadius = 2.5 + i * 0.9 + sIndex * 3;
    planet.userData = {
      angle: Math.random() * Math.PI * 2,
      radius: orbitRadius,
      label: entry.nom,
      fiche: entry.fiche
    };
    planet.scale.set(0, 0, 0);
    scene.add(planet);
    planets.push(planet);

    const label = document.createElement('div');
    label.className = 'label';
    label.innerText = entry.nom;
    labels.appendChild(label);
    planet.userData.labelElement = label;
  });
});

camera.position.z = isMobile ? 10 : 7;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    modal.innerHTML = `<h2>${planet.userData.label}</h2><iframe src="${planet.userData.fiche}" width="100%" height="400px"></iframe>`;
    modal.classList.add('active');
  }
});

document.getElementById('toggleTheme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.style.getPropertyValue('--color-bg') === '#0b0f1a') {
    root.style.setProperty('--color-bg', '#f4f4f4');
    root.style.setProperty('--color-fg', '#111');
  } else {
    root.style.setProperty('--color-bg', '#0b0f1a');
    root.style.setProperty('--color-fg', '#aef');
  }
  document.body.style.backgroundColor = root.style.getPropertyValue('--color-bg');
});

function animate() {
  requestAnimationFrame(animate);
  planets.forEach((planet, idx) => {
    if (planet.scale.x < 1) {
      const s = planet.scale.x + 0.02;
      planet.scale.set(s, s, s);
    }
    planet.userData.angle += 0.002 + idx * 0.0003;
    planet.position.x = Math.cos(planet.userData.angle) * planet.userData.radius;
    planet.position.z = Math.sin(planet.userData.angle) * planet.userData.radius;

    const vector = planet.position.clone().project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    if (planet.userData.labelElement) {
      planet.userData.labelElement.style.left = `${x}px`;
      planet.userData.labelElement.style.top = `${y}px`;
    }
  });
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
