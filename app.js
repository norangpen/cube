import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

let scene, camera, renderer, cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const loader = new OBJLoader();
    loader.load('models/Cube.obj', function (object) {
        cube = object;
        scene.add(cube);
        cube.position.set(0, 0, 0);
    });

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    fetch('https://8a24-125-130-210-25.ngrok-free.app')
        .then(response => response.text())
        .then((data) => {
            if (cube) {
                if (data.trim() === '0') {
                    cube.rotation.y += 0.01; // Rotate clockwise
                } else {
                    cube.rotation.y -= 0.01; // Rotate counterclockwise
                }
            }
        });

    renderer.render(scene, camera);
}

init();

