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
const geometry = new THREE.BoxGeometry(0.4, 2, 2); //gears side
const geometry2 = new THREE.BoxGeometry(2, 2, 0.4); //gears front
const geometry3 = new THREE.BoxGeometry(3.8, 0.8, 0.2); //gear holder
const geometry4 = new THREE.BoxGeometry(0.2, 0.8, 3.2); //gear holder sides
const geometry5 = new THREE.BoxGeometry(2.2, 0.2, 0.4); //shaft


var material  = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: false, });
var material2 = new THREE.MeshBasicMaterial({ color: 0xff00f, wireframe: false, });
var material3  = new THREE.MeshBasicMaterial({ color: 0xf00ff, wireframe: false, });

var rad = 1.5708; //90deg
var dist = 1.7; //distance btwn gears 

//gear A
var gearAtooth1 = new THREE.Mesh(geometry, material);
var gearAtooth2 = new THREE.Mesh(geometry, material);
var gearAtooth3 = new THREE.Mesh(geometry, material);
var gearAtooth4 = new THREE.Mesh(geometry, material);
gearAtooth2.rotation.x += rad/2;
gearAtooth3.rotation.x -= rad/4;
gearAtooth4.rotation.x += rad/4;
var gearA = new THREE.Group();
gearA.add(gearAtooth1);
gearA.add(gearAtooth2);
gearA.add(gearAtooth3);
gearA.add(gearAtooth4);
gearA.position.x = dist;

//gear B
var gearBtooth1 = new THREE.Mesh(geometry, material);
var gearBtooth2 = new THREE.Mesh(geometry, material);
var gearBtooth3 = new THREE.Mesh(geometry, material);
var gearBtooth4 = new THREE.Mesh(geometry, material);
gearBtooth2.rotation.x += rad/2;
gearBtooth3.rotation.x -= rad/4;
gearBtooth4.rotation.x += rad/4;
var gearB = new THREE.Group();
gearB.add(gearBtooth1);
gearB.add(gearBtooth2);
gearB.add(gearBtooth3);
gearB.add(gearBtooth4);
gearB.position.x = -1*dist;

//gear C
var gearCtooth1 = new THREE.Mesh(geometry2, material);
var gearCtooth2 = new THREE.Mesh(geometry2, material);
var gearCtooth3 = new THREE.Mesh(geometry2, material);
var gearCtooth4 = new THREE.Mesh(geometry2, material);
gearCtooth2.rotation.z += rad/2;
gearCtooth3.rotation.z -= rad/4;
gearCtooth4.rotation.z += rad/4;
gearCtooth1.position.z = -1*dist+0.3;
gearCtooth2.position.z = -1*dist+0.3;
gearCtooth3.position.z = -1*dist+0.3;
gearCtooth4.position.z = -1*dist+0.3;
var gearC = new THREE.Group();
gearC.add(gearCtooth1);
gearC.add(gearCtooth2);
gearC.add(gearCtooth3);
gearC.add(gearCtooth4);

//gear holder
var holder1 = new THREE.Mesh(geometry3, material2);
var holder2 = new THREE.Mesh(geometry4, material2);
var holder3 = new THREE.Mesh(geometry4, material2);
holder1.position.set( 0, 0, -dist );
holder2.position.set( dist+0.3,  0, 0);
holder3.position.set( -dist-0.3, 0, 0);
const holder = new THREE.Group();
holder.add( holder1 );
holder.add( holder2 );
holder.add( holder3 );

//shaft
var shaftA1 = new THREE.Mesh(geometry5, material3);
var shaftA2 = new THREE.Mesh(geometry5, material3);
shaftA2.rotation.x += rad;
shaftA1.position.set( 2.5, 0, 0 );
shaftA2.position.set( 2.5, 0, 0 );
var shaftA = new THREE.Group();
shaftA.add(shaftA1);
shaftA.add(shaftA2);

var shaftB1 = new THREE.Mesh(geometry5, material3);
var shaftB2 = new THREE.Mesh(geometry5, material3);
shaftB2.rotation.x += rad;
shaftB1.position.set( -2.5, 0, 0 );
shaftB2.position.set( -2.5, 0, 0 );
var shaftB = new THREE.Group();
shaftB.add(shaftB1);
shaftB.add(shaftB2);


//add the object to scene
scene.add( gearA );
scene.add( gearB );
scene.add( gearC );
scene.add( holder );
scene.add( shaftA );
scene.add( shaftB );

//create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


//animation loop
const animate = () => {
  requestAnimationFrame(animate);
  
  var dirA = 1;  var dirB = 1;  var dirC = 1;  var dirH = 1;
  if(document.getElementById('geara').value=='reverse') dirA = -1;
  if(document.getElementById('gearb').value=='reverse') dirB = -1;
  if(document.getElementById('gearc').value=='reverse') dirC = -1;
  if(document.getElementById('carr').value=='reverse') dirH = -1;
  if(document.getElementById('geara').value=='stop') dirA = 0;
  if(document.getElementById('gearb').value=='stop') dirB = 0;
  if(document.getElementById('gearc').value=='stop') dirC = 0;
  if(document.getElementById('carr').value =='stop') dirH = 0;

  //camera tilt
  if(document.getElementById('cam').value=='up')
	camera.rotation.x += 0.1;
  if(document.getElementById('cam').value=='down')
	camera.rotation.x -= 0.1;
  if(document.getElementById('cam').value=='left')
	camera.rotation.y -= 0.1;
  if(document.getElementById('cam').value=='right')
	camera.rotation.y += 0.1;
  document.getElementById('cam').value = '';

  
  gearA.rotation.x += dirA*0.01;
  gearB.rotation.x += dirB*0.01*-1;
  gearC.rotation.z += dirC*0.01;
  gearC.rotation.x += dirH*0.01;
  holder.rotation.x += dirH*0.01;
  shaftA.rotation.x += dirA*0.01;
  shaftB.rotation.x += dirB*0.01*-1;

  renderer.render(scene, camera);
};

animate();

document.body.appendChild(renderer.domElement);