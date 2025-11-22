"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NeuralNetwork() {
    const groupRef = useRef<THREE.Group>(null);

    // Create particles
    const particleCount = 200;
    const [positions, connections] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const conn = [];

        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        // Simple distance-based connections
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dist = Math.sqrt(
                    Math.pow(pos[i * 3] - pos[j * 3], 2) +
                    Math.pow(pos[i * 3 + 1] - pos[j * 3 + 1], 2) +
                    Math.pow(pos[i * 3 + 2] - pos[j * 3 + 2], 2)
                );
                if (dist < 2.5) {
                    conn.push(
                        new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]),
                        new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
                    );
                }
            }
        }

        return [pos, conn];
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#00f2ff"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={connections.length}
                        array={new Float32Array(connections.flatMap(v => [v.x, v.y, v.z]))}
                        itemSize={3}
                        args={[new Float32Array(connections.flatMap(v => [v.x, v.y, v.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#7000ff" transparent opacity={0.15} />
            </lineSegments>
        </group>
    );
}
