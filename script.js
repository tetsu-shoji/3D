// ESモジュールとして three.js を読み込む
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';

// シーン・カメラ・レンダラー
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// ARボタンを追加（これが表示されないとAR起動できない）
document.body.appendChild(
  ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
);

// ライト
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
scene.add(light);

// glTFモデル読み込み
const loader = new GLTFLoader();
loader.load(
  'shiomi_city.glb',
  (gltf) => {
    const model = gltf.scene;

    // スケール調整（必要に応じて変更）
    model.scale.set(0.01, 0.01, 0.01);

    // 少し前に配置
    model.position.set(0, 0, -0.3);

    scene.add(model);
  },
  (xhr) => {
    console.log(`Loading shiomi_city.glb: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
  },
  (error) => {
    console.error('Error loading shiomi_city.glb:', error);
  }
);

// リサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
