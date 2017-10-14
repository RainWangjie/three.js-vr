/**
 * Created by gewangjie on 2017/10/12
 */

var scene = new THREE.Scene();
var camera_left = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight / 2, .1, 1000);

var camera_right = camera_left.clone();

var renderer_left = new THREE.WebGLRenderer();
renderer_left.setClearColor(new THREE.Color(0x000000, 1.0));
renderer_left.setSize(window.innerWidth / 2, window.innerHeight);
renderer_left.shadowMapEnabled = true;
document.getElementById('left').appendChild(renderer_left.domElement);

var renderer_right = new THREE.WebGLRenderer();
renderer_right.setClearColor(new THREE.Color(0x000000, 1.0));
renderer_right.setSize(window.innerWidth / 2, window.innerHeight);
renderer_right.shadowMapEnabled = true;
document.getElementById('right').appendChild(renderer_right.domElement);

var cubeMaterialArray = [];
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xff3333}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xff8833}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0xffff33}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x33ff33}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x3333ff}));
cubeMaterialArray.push(new THREE.MeshBasicMaterial({color: 0x8833ff}));
var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
var cubeGeometry = new THREE.CubeGeometry(15, 15, 15, 1, 1, 1);
var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
cube.position.set(0, 0, 0);
scene.add(cube);

var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, -100);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1).normalize();
scene.add(directionalLight);
//3个聚光灯
var spotLight_1 = new THREE.SpotLight(0xffffff);
spotLight_1.position.set(-353, -353, 500);
spotLight_1.castShadow = true;
scene.add(spotLight_1);
var spotLight_2 = new THREE.SpotLight(0xffffff);
spotLight_2.position.set(-130, 483, 300);
spotLight_2.castShadow = true;
scene.add(spotLight_2);
var spotLight_3 = new THREE.SpotLight(0xffffff);
spotLight_3.position.set(483, -130, 300);
spotLight_3.castShadow = true;
scene.add(spotLight_3);

var axes = new THREE.AxisHelper(100);
scene.add(axes);

VRControls(camera_left, scene, camera_right, scene, render, 200);

function render() {
    renderer_left.render(scene, camera_left);
    renderer_right.render(scene, camera_right);
}