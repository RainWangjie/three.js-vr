/**
 * Created by gewangjie on 2017/10/15
 */

/**
 * Created by gewangjie on 2017/10/12
 */
const windowW = window.innerWidth;
const windowH = window.innerHeight;
const leftEl = document.getElementById('left');
const rightEl = document.getElementById('right');

// 初始场景和左右摄像机
var scene = new THREE.Scene(),
    camera_left = new THREE.PerspectiveCamera(45, windowW / windowH / 2, .1, 1000),
    camera_right = camera_left.clone();

var renderer_left = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
renderer_left.setSize(windowW / 2, windowH);
leftEl.appendChild(renderer_left.domElement);

var renderer_right = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
renderer_right.setSize(windowW / 2, windowH);
rightEl.appendChild(renderer_right.domElement);

// 初始化模型，并加入场景

var model = '',
    model_option = [2.5, 0, 45, 0, 0, -350, 0];
//obj+mtl
THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
var mtlLorder = new THREE.MTLLoader();
mtlLorder.setBaseUrl('http://7xs7nv.com1.z0.glb.clouddn.com/');
mtlLorder.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
mtlLorder.crossOrigin = '*';
mtlLorder.setMaterialOptions({
    side: THREE.DoubleSide
//        wrap: THREE.MirroredRepeatWrapping,
//        normalizeRGB: true
});
mtlLorder.load('FnqyU2wQrrikslw8gReTEsh4Zo4r', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('http://7xs7nv.com1.z0.glb.clouddn.com/');
    objLoader.load('FiWYanO_zpK41vG4saNCEg-eSuuI', function (obj_model) {
        model = obj_model;
        model.scale.set(model_option[0] * .6, model_option[0] * .6, model_option[0] * .6);
        model.rotation.x = model_option[1] / 180 * Math.PI;
        model.rotation.y = model_option[2] / 180 * Math.PI;
        model.rotation.z = model_option[3] / 180 * Math.PI;
        model.position.set((model_option[4] * .6) || 0, (model_option[5] * .6) || 0, (model_option[6] * .6) || 0);
        scene.add(model);
        alert('请旋转手机，并放入cardboard');
    }, onProgress, onError);
});
var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};
var onError = function (xhr) {
};

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

VRControls(scene, camera_left, camera_right, render, 200);

function render() {
    renderer_left.render(scene, camera_left);
    renderer_right.render(scene, camera_right);
}