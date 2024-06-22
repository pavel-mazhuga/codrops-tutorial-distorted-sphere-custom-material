import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';

const canvasWrapper = document.querySelector('.js-canvas-wrapper');

const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
canvasWrapper?.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.IcosahedronGeometry(1.3, 200);

const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    silent: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#fff', 5);
scene.add(directionalLight);

const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#af00ff') },
    uGradientStrength: { value: 1 },
    uSpeed: { value: 1.1 },
    uNoiseStrength: { value: 0.29 },
    uDisplacementStrength: { value: 0.41 },
    uFractAmount: { value: 4 },
    uRemapPower: { value: [0.07, 0.73] },
};

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

function render() {
    // material.uniforms.uTime.value = clock.elapsedTime;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(render);

function onResize() {
    const isMobile = matchMedia('(max-width: 1199px)').matches;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.set(0, 0, isMobile ? 9 : 5);
    camera.updateProjectionMatrix();
}

onResize();
window.addEventListener('resize', onResize);
