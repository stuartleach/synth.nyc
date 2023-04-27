import React, {useState, useEffect} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {Mesh, MeshBasicMaterial, Sphere, TextureLoader, SphereGeometry} from 'three';
import {GridCube, GridRing, GridRoundedBox, GridSphere} from './GridSphere';
import {Camera} from './Camera';

import * as THREE from 'three';

import galaxyBackground from './PIA12348~orig.jpg';

import {extend} from '@react-three/fiber'
import {OrbitControls, TransformControls} from 'three-stdlib'

extend({OrbitControls, TransformControls})

const Skybox = () => {
    const { scene, gl } = useThree();
    const loader = new TextureLoader();
    const texture = loader.load(galaxyBackground);

    // useEffect(() => {
    //     gl.setClearColor('black');
    // }, [gl]);

    const material = new MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        depthWrite: false,
    });

    const geometry = new SphereGeometry(500, 64, 64);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    return null;
};

export const SphereGrid = () => {
    const [spheres, setSpheres] = useState(() => {
        const initialSpheres = [];
        const gridSizeX = 4;
        const gridSizeY = 4;
        const gridSizeZ = 1;
        const offsetX = gridSizeX / 2 - 0.5;
        const offsetY = gridSizeY / 2 - 0.5;
        const offsetZ = gridSizeZ / 2 - 0.5;
        for (let x = 0; x < gridSizeX; x++) {
            for (let y = 0; y < gridSizeY; y++) {
                for (let z = 0; z < gridSizeZ; z++) {

                    // if any of the coordinates are not 0 or the respective grid length, skip
                    const [xAxis, yAxis, zAxis] = [x - offsetX, y - offsetY, z - offsetZ];

                    const newSphere = {
                        position: [xAxis, yAxis, zAxis],
                        color: 'navy',
                        key: `sphere-${x}-${y}-${z}`,
                    }

                    initialSpheres.push(newSphere);
                }
            }
        }
        return initialSpheres;
    });


    const handleClick = (sphereRef) => {
        // const currentColor = sphereRef.current.material.color.getHexString();

        const newColor = sphereRef.current.material.color.getHexString() === "000080" ? 'white' : "navy";
        // const randomColor = Math.floor(Math.random() * 16777215);

        sphereRef.current.material.color.set(newColor);
    };



    return (
        <Canvas>
            <Camera/>
            {/*<Background/>*/}
            <pointLight position={[1, 5, 5]}/>

            <pointLight position={[10, 1, 5]}/>

            {/*<feSpotLight position={[10, 10, 10]}/>*/}
            <ambientLight color="green" intensity={1}/>
            {/*<ambientLight color="red" intensity={1}/>*/}
            {/*<ambientLight color="blue" intensity={1}/>*/}
            <Skybox />
            <GridCube position={[1, 1, 1]} onClick={handleClick}
                      color={'red'}
            />
            <GridRing position={[2, 2, 2]} onClick={handleClick} color={'red'} />
            <GridRoundedBox position={[2, 2, 2]} onClick={handleClick} color={'black'} />
            {spheres.map((sphere) => (
                <GridSphere
                    key={sphere.key}
                    position={sphere.position}
                    color={sphere.color}
                    onClick={handleClick}
                />

            ))}
        </Canvas>
    );
};

export default SphereGrid;
