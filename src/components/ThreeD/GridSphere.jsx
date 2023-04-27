import React, { useRef } from 'react';
import { Sphere, Box, RoundedBox, Ring } from '@react-three/drei';



export const GridCube = ({ position, color, onClick }) => {
    const meshRef = useRef();

    return (
        <Box
        ref={meshRef}
        args={[1, 1, 1]}
        position={position}
        onClick={() => onClick(meshRef)}
        >
        <meshStandardMaterial color={color} />
        </Box>
    );
}

export const GridRing = ({ position, color, onClick }) => {
    const meshRef = useRef();

    return (
        <Ring
        ref={meshRef}
        args={[1, 1, 16]}
        position={position}
        onClick={() => onClick(meshRef)}
        >
        <meshStandardMaterial color={color} />
        </Ring>
    );
}

export const GridRoundedBox = ({ position, color, onClick }) => {
    const meshRef = useRef();

    return (
        <RoundedBox
        ref={meshRef}
        args={[1, 1, 1, 16, 0.1]}
        position={position}
        onClick={() => onClick(meshRef)}
        >
        <meshStandardMaterial color={color} />
        </RoundedBox>
    );
}

export const GridSphere = ({ position, color, onClick }) => {
  const meshRef = useRef();

  return (
    <Sphere
      ref={meshRef}
      args={[0.5, 16, 16]}
      position={position}
      onClick={() => onClick(meshRef)}
    >
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};
