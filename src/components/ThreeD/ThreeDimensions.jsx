import * as THREE from 'three';
import ShapeGrid from "./ShapeGrid";


export const ThreeDimensions = (props) => {

    const {synthInstances} = props;

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;


    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);

    const outlineMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
    const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
    // outlineMesh.position = mesh.position;
    outlineMesh.scale.multiplyScalar(1.05);
    // scene.add(outlineMesh);

    scene.add(mesh);

     // add a light source
    const light = new THREE.AmbientLight( 1, 10);

    // set scene background
    // scene.background = new THREE.Color(0x000000);
    scene.background = new THREE.Color("gray");

    light.position.set(0, 0, 0);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    // stroke outline of cube


    // animation
    function animation(time) {
        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;
        renderer.render(scene, camera);
    }

    return (
        <div>

        </div>
    )
}