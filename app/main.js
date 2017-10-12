/**
 * Created by gewangjie on 2017/10/12
 */
var device = {
    radius: 100,
    alpha: 0,
    beta: 0,
    gamma: 90,
    left_x: 0,
    left_y: 100,
    left_z: 0,
    right_x: 0,
    right_y: 100,
    right_z: 0
};

var scene_left = new THREE.Scene();
var camera_left = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight / 2, .1, 1000);

var scene_right = new THREE.Scene();
var camera_right = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight / 2, .1, 1000);

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
scene_left.add(cube);

var cubeMaterialArray_1 = [];
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0xff3333}));
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0xff8833}));
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0xffff33}));
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0x33ff33}));
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0x3333ff}));
cubeMaterialArray_1.push(new THREE.MeshBasicMaterial({color: 0x8833ff}));
var cubeMaterials_1 = new THREE.MeshFaceMaterial(cubeMaterialArray_1);
var cubeGeometry_1 = new THREE.CubeGeometry(15, 15, 15, 1, 1, 1);
var cube_1 = new THREE.Mesh(cubeGeometry_1, cubeMaterials_1);
cube_1.position.set(0, 0, 0);
scene_right.add(cube_1);

var light = new THREE.PointLight(0xffffff);
light.position.set(0, 250, 0);
scene_left.add(light);
//    scene_right.add(light);


var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene_left.add(ambientLight);
//    scene_right.add(ambientLight);

var axes = new THREE.AxisHelper(100);
scene_left.add(axes);

var axes_1 = new THREE.AxisHelper(100);
scene_right.add(axes_1);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene_left.add(spotLight);
//    scene_right.add(spotLight);

function render() {
    move();
    document.getElementById("camera_left").innerHTML = '(' + device.left_x + ',' + device.left_y + ',' + device.left_z + ')';
    document.getElementById("camera_right").innerHTML = '(' + device.right_x + ',' + device.right_y + ',' + device.right_z + ')';

    camera_left.position.set(device.left_x, device.left_y, device.left_z);
    camera_right.position.set(device.right_x, device.right_y, device.right_z);

    camera_left.lookAt(scene_left.position);
    camera_right.lookAt(scene_right.position);

    renderer_left.render(scene_left, camera_left);
    renderer_right.render(scene_right, camera_right);

    window.requestAnimationFrame(render);
}
render();

function move() {
    //y轴坐标
    if (device.gamma < 0) {
        /* y = R * cos(gamma);gamma转弧度*/
        device.left_y = device.radius * Math.cos(angleToRadian(device.gamma));
    } else {
        /* y = -R * cos(gamma);gamma转弧度*/
        device.left_y = -1 * device.radius * Math.cos(angleToRadian(device.gamma));
    }
    device.right_y = device.left_y;

    //球形比例 (R-|y|)/R
    var scale = (device.radius - Math.abs(device.left_y)) / device.radius;
    //gamma -90～90过渡
    if (device.gamma < 0) {
        device.alpha = device.alpha - 180;
    }
    device.alpha = (device.alpha + 360) % 360;

    //左屏
    /* x = R * cos(alpha) * scale */
    device.left_x = device.radius * Math.cos(angleToRadian(device.alpha)) * scale;
    /* z = -R * sin(alpha) * scale */
    device.left_z = -1 * device.radius * Math.sin(angleToRadian(device.alpha)) * scale;
    device.left_x = Math.round(device.left_x);
    device.left_y = Math.round(device.left_y);
    device.left_z = Math.round(device.left_z);

    //右屏
    var right_alpha = (device.alpha + 15 + 360) % 360;
    /* x = R * cos(alpha) * scale */
    device.right_x = device.radius * Math.cos(angleToRadian(right_alpha)) * scale;
    /* z = -R * sin(alpha) * scale */
    device.right_z = -1 * device.radius * Math.sin(angleToRadian(right_alpha)) * scale;
    device.right_x = Math.round(device.right_x);
    device.right_y = Math.round(device.right_y);
    device.right_z = Math.round(device.right_z);
}

function angleToRadian(angle) {
    var radian = angle / 180 * Math.PI;
    return radian;
}


if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        device.alpha = Math.round(event.alpha);
        device.beta = Math.round(event.beta);
        device.gamma = Math.round(event.gamma);
        document.getElementById("alpha").innerHTML = device.alpha;
        document.getElementById("beta").innerHTML = device.beta;
        document.getElementById("gamma").innerHTML = device.gamma;
    }, false);
} else {
    alert('您的设备不支持');
}
