import React, {useEffect, useRef} from 'react';
import {useThree} from '@react-three/fiber';
import {TextureLoader} from 'three';
import * as THREE from 'three';
import galaxyBackground from './galaxy.jpg';

export const Camera = () => {
    const {camera, scene, invalidate} = useThree();
    const scrollRefX = useRef(0);
    const scrollRefY = useRef(0);
    const scrollRefZ = useRef(0);

    // show axes
    const helper = new THREE.GridHelper(1000, 100);
    // helper.rotation.x = Math.PI / 2;
    const axes = new THREE.AxesHelper(200);
    scene.add(helper);

  /*  useEffect(() => {
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);

        const loader = new TextureLoader();
        loader.load(galaxyBackground, (texture) => {
            scene.background = texture;
        });
    }, [camera, scene]);*/

    useEffect(
        () => {
            const onScroll = (e) => {
                e.preventDefault();

                const [radiusX, radiusY, radiusZ] = [10, 10, 10];

                if (e.metaKey || e.ctrlKey) {
                    // camera.position.z += e.deltaY * 0.1;
                    // e.currentTarget.scrollLeft += e.deltaX;

                    // set delta y to negative if scrolling up
                    // e.deltaY = e.deltaY > 0 ? -1 : 1;

                    scrollRefZ.current += e.deltaY * 0.005;
                    const zZ = radiusZ * scrollRefZ.current;
                    const xZ = radiusX * Math.sin(scrollRefX.current);
                    const yZ = radiusY * Math.sin(scrollRefY.current);
                    camera.position.set(xZ, yZ, zZ);

                    camera.lookAt(0, 0, 0);
                    if (scene.background) {
                        scene.background.offset += e.deltaY * 0.0001;
                    }
                    // return
                } else {
                    // invalidate();



                    // Update horizontal scroll
                    scrollRefX.current += e.deltaX * 0.005;
                    // const x = radiusX * Math.sin(Number(scrollRefX.current));
                    const x = radiusX * /*Math.sin(*/ scrollRefX.current /*);*/;
                    camera.position.set(x, camera.position.y, camera.position.z);

                    // Update vertical scroll
                    scrollRefY.current += e.deltaY * 0.005;
                    // const y = radiusY * Math.sin(Number(scrollRefY.current));
                    const y = radiusY * /*Math.sin(*/ scrollRefY.current /*);*/;
                    camera.position.set(camera.position.x, y, camera.position.z);

                    camera.lookAt(0, 0, 0);

                    // Move the background texture
                    if (scene.background) {
                        scene.background.offset.x -= e.deltaX * 0.0001;
                        scene.background.offset.y += e.deltaY * 0.0001;
                    }

                    invalidate();
                }
            };

            window.addEventListener('wheel', onScroll, {passive: false});

            return () => {
                window.removeEventListener('wheel', onScroll);
            };
        },
        [camera, invalidate, scene]
    );

    return null;
};
