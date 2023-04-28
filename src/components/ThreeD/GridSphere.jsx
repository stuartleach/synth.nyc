import React, {useRef} from 'react';
import {Sphere, Box, RoundedBox, Ring, Cloud} from '@react-three/drei';
import * as THREE from 'three';
import * as Tone from 'tone';

export const GridCube = ({position, color, onClick}) => {
    const meshRef = useRef();

    return (
        <Box
            ref={meshRef}
            args={[1, 1, 1]}
            position={position}
            onClick={() => onClick(meshRef)}
        >
            <meshStandardMaterial color={color}/>
        </Box>
    );
}

export const GridRing = ({position, color, onClick}) => {
    const meshRef = useRef();

    return (
        <Ring
            ref={meshRef}
            args={[1, 1, 16]}
            position={position}
            onClick={() => onClick(meshRef)}
        >
            <meshStandardMaterial color={color}/>
        </Ring>
    );
}

export const GridRoundedBox = ({position, color, onClick}) => {
    const meshRef = useRef();

    return (
        <RoundedBox
            ref={meshRef}
            args={[1, 1, 1, 16, 0.1]}
            position={position}
            onClick={() => onClick(meshRef)}
        >
            <meshStandardMaterial color={color}/>
        </RoundedBox>
    );
}

export const GridCloud = ({position, color, onClick}) => {
    const meshRef = useRef();

    return (
        <Cloud
            ref={meshRef}
            // args={[115, 115, 115]}
            position={position}
            // onClick={() => onClick(meshRef)}
            // material-opacity={0.5}
            material={new THREE.MeshPhongMaterial()}
            // depth={5}
            // width={5}
            // height={5}
        >
            <meshWireframeMaterial color={color}/>
        </Cloud>
    );
}

export const GridSphere = ({position, color, onClick}) => {
    const meshRef = useRef();



    return (
        <Sphere
            ref={meshRef}
            args={[0.5, 16, 16]}
            position={position}
            onClick={() => onClick(meshRef)}
        >
            <meshStandardMaterial color={color}/>

        </Sphere>
    );
};
