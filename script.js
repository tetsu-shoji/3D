// シーン・カメラ・レンダラーの基本セットアップ
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

// ARボタンを追加
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

// 簡単なライト
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
scene.add(light);

// glTFローダーで潮見モデルを読み込み
const loader = new THREE.GLTFLoader();
loader.load(
  'shiomi_city.glb',
  (gltf) => {
    const model = gltf.scene;

    // スケール調整（必要に応じて変更）
    model.scale.set(0.01, 0.01, 0.01);

    // 少し持ち上げて机の上に置くイメージ
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

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
