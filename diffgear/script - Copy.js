//create a scene
const scene = new THREE.Scene();

//create a camera
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.z = 5;

//create an object
const geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0xfffff,
  wireframe: false,
});
var cube = new THREE.Mesh(geometry, material);

//add the object to scene
scene.add(cube);

//create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//animation loop
const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.02;
  renderer.render(scene, camera);
};

animate();

document.body.appendChild(renderer.domElement);