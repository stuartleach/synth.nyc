import React, {useState, useEffect} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {Mesh, MeshBasicMaterial, Sphere, TextureLoader, SphereGeometry} from 'three';
import {Cloud, GridCloud, GridCube, GridRing, GridRoundedBox, GridSphere} from './GridSphere';
import {RoundedBox} from '@react-three/drei'
import {Camera} from './Camera';
import * as Tone from 'tone';

import * as THREE from 'three';

import galaxyBackground from './PIA12348~orig.jpg';

import {extend} from '@react-three/fiber'
import {OrbitControls, TransformControls} from 'three-stdlib'
import {GradientTexture} from "@react-three/drei";
import MeshStandardNodeMaterial from "three/addons/nodes/materials/MeshStandardNodeMaterial";
// import {Tone} from "tone/Tone/core/Tone";

extend({OrbitControls, TransformControls})

const Skybox = () => {
    const {scene, gl} = useThree();
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
        // new array that combines a letter of a note with an octave
        const notes = []
        const octaves = [2, 3, 4, 5, 6];
        const letters = ["C", "D", "E", "F", "G", "A", "B"];
        octaves.forEach(octave => {
            letters.forEach(letter => {
                notes.push(letter + octave)
            })
        })
        // const notes = new Array.from({length: 36}, (v, i) => {})
        // const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6",]; // Add more notes if needed
        let noteIndex = 0;
        for (let x = 0; x < gridSizeX; x++) {
            for (let y = 0; y < gridSizeY; y++) {
                for (let z = 0; z < gridSizeZ; z++) {

                    // if any of the coordinates are not 0 or the respective grid length, skip
                    let [xAxis, yAxis, zAxis] = [x - offsetX, y - offsetY, z - offsetZ];
                    /*  if (xAxis !== 0 && xAxis !== gridSizeX - 1 && yAxis !== 0 && yAxis !== gridSizeY - 1 && zAxis !== 0 && zAxis !== gridSizeZ - 1) {
                          continue;
                      }*/

                    // add more spacing
                    const spacing = 1;
                    const [xAxisSpacing, yAxisSpacing, zAxisSpacing] = [xAxis * spacing, yAxis * spacing, zAxis * spacing];
                    [xAxis, yAxis, zAxis] = [xAxisSpacing, yAxisSpacing, zAxisSpacing];

                    const newSphere = {
                        position: [xAxis, yAxis, zAxis],
                        color: 'navy',
                        key: `sphere-${x}-${y}-${z}`,
                        isPlaying: false,
                        note: notes[noteIndex], // Assign a unique note to each sphere
                    };

                    initialSpheres.push(newSphere);
                    noteIndex++;
                }
            }
        }
        return initialSpheres;
    });


    const handleClick = (sphereRef, note) => {
        const currentColor = sphereRef.current.material.color.getHexString();
        console.log(currentColor);
        // play a new tone
        const synth = new Tone.Synth().toDestination();

        // Duration of the tone being played
        const duration = Tone.Time("8n").toSeconds();

        // Connect synth to the master output
        synth.connect(Tone.Master);
        synth.triggerAttackRelease(note, "8n");

        // Change color when clicked
        const newColor = sphereRef.current.material.color.getHexString() === "000080" ? 'white' : "navy";
        sphereRef.current.material.color.set(newColor);

        // Animate the color fade and scaling
        const startColor = new THREE.Color(newColor);
        const endColor = new THREE.Color("navy");
        const startTime = performance.now();
        const startScale = 1;
        const endScale = 1.2;
        const scaleFactor = endScale / startScale;

        const animateColorFadeAndScale = (time) => {
            const elapsedTime = (time - startTime) / 1000;
            const progress = elapsedTime / duration;

            // Linear interpolation between startColor and endColor
            sphereRef.current.material.color.lerpColors(startColor, endColor, progress);

            // Animate scaling
            const currentScale = startScale + (endScale - startScale) * progress;
            sphereRef.current.scale.set(currentScale, currentScale, currentScale);

            // Continue animating until the duration is reached
            if (elapsedTime < duration) {
                requestAnimationFrame(animateColorFadeAndScale);
            } else {
                sphereRef.current.material.color.set(endColor);
                sphereRef.current.scale.set(startScale, startScale, startScale);
            }
        };

        // Initial scaling up on click
        sphereRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

        requestAnimationFrame(animateColorFadeAndScale);
    };


    return (
        <Canvas>
            <Camera/>
            {/*<Background/>*/}
            <pointLight position={[1, 5, 5]}/>

            <pointLight position={[10, 1, 5]}/>

            <Skybox/>
            {/*<GridCube position={[1, 1, 1]} onClick={handleClick}
                      color={'red'}
            />*/}
            <GridCloud position={[3, 3, 3]} color={'black'} onClick={handleClick}></GridCloud>
            {/*<GridRing position={[2, 2, 2]} onClick={handleClick} color={'red'}/>*/}
            {/*<GridRoundedBox position={[2, 2, 2]} onClick={handleClick} color={'black'}/>*/}
            {spheres.map((sphere) => (
                <GridSphere
                    key={sphere.key}
                    position={sphere.position}
                    color={sphere.color}
                    onClick={(sphereRef) => handleClick(sphereRef, sphere.note)} // Pass the note to handleClick
                />

            ))}
        </Canvas>
    );
};

export default SphereGrid;
