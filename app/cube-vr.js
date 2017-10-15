/**
 * Created by gewangjie on 2017/10/12
 */
const windowW = window.innerWidth;
const windowH = window.innerHeight;
const wrapperEl = document.getElementsByClassName('model-show')[0];
const leftEl = document.getElementById('left');
const rightEl = document.getElementById('right');

// 初始场景和左右摄像机
var scene = new THREE.Scene(),
    camera_left = new THREE.PerspectiveCamera(45, windowW / windowH / 2, .1, 1000),
    camera_right = camera_left.clone();

var renderer_left = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
// renderer_left.setClearColor(new THREE.Color(0x000000, 1.0));
renderer_left.setSize(windowW / 2, windowH);
// renderer_left.shadowMapEnabled = true;
leftEl.appendChild(renderer_left.domElement);

var renderer_right = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
// renderer_right.setClearColor(new THREE.Color(0x000000, 1.0));
renderer_right.setSize(windowW / 2, windowH);
// renderer_right.shadowMapEnabled = true;
rightEl.appendChild(renderer_right.domElement);

// 初始化立方体，并加入场景
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

// 设置灯光
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

// 坐标系
var axes = new THREE.AxisHelper(100);
scene.add(axes);

VRControls(scene, camera_left, camera_right, render, 100);

function render() {
    renderer_left.render(scene, camera_left);
    renderer_right.render(scene, camera_right);
}

// 开启全屏
fullscreen() && requestFullscreen(wrapperEl);