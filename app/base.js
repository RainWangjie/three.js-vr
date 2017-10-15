/**
 * Created by gewangjie on 2017/10/14
 */

function VRControls(scene, camera_left, camera_right, render, radius) {
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
            device.beta = Math.round(event.beta, 2);
            device.gamma = Math.round(event.gamma, 2);
            //gamma -90～90过渡
            if (device.gamma < 0) {
                device.alpha = (Math.round(event.alpha, 2) + 180) % 360;
            } else {
                device.alpha = Math.round(event.alpha, 2);
            }
        }, false);
    } else {
        alert('您的设备不支持');
    }

    var device = {
        radius: radius,
        alpha: 0,
        beta: 0,
        gamma: 90,
        left_x: 0,
        left_y: 200,
        left_z: 0,
        right_x: 0,
        right_y: 200,
        right_z: 0,
        zoom: 1
    };

    function angleToRadian(angle) {
        return angle / 180 * Math.PI;
    }

    function myRender() {
        move();

        camera_left.position.set(device.left_x, device.left_y, device.left_z);
        camera_right.position.set(device.right_x, device.right_y, device.right_z);

        camera_left.lookAt(scene.position);
        camera_right.lookAt(scene.position);

        render();

        window.requestAnimationFrame(myRender);
    }

    myRender();

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

        //左屏
        /* x = R * cos(alpha) * scale */
        device.left_x = device.radius * Math.cos(angleToRadian(device.alpha)) * scale;
        /* z = -R * sin(alpha) * scale */
        device.left_z = -1 * device.radius * Math.sin(angleToRadian(device.alpha)) * scale;
        device.left_x = Math.round(device.left_x, 2);
        device.left_y = Math.round(device.left_y, 2);
        device.left_z = Math.round(device.left_z, 2);

        //document.getElementById('camera').innerHTML = '(' + device.left_x + ',' + device.left_y + ',' + device.left_z + ')';
        //右屏
        var right_alpha = (device.alpha + 15) % 360;
        /* x = R * cos(alpha) * scale */
        device.right_x = device.radius * Math.cos(angleToRadian(right_alpha)) * scale;
        /* z = -R * sin(alpha) * scale */
        device.right_z = -1 * device.radius * Math.sin(angleToRadian(right_alpha)) * scale;
        device.right_x = Math.round(device.right_x, 2);
        device.right_y = Math.round(device.right_y, 2);
        device.right_z = Math.round(device.right_z, 2);
    }
}

//判断是否全屏
function fullscreen() {
    return document.fullscreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        false;
}

//全屏
function requestFullscreen(elem) {
    console.log('触发全屏');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullScreen) {
        // 对 Chrome 特殊处理，
        // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
        if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
        else {
            elem.webkitRequestFullScreen();
        }
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
}

//退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}
