"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function NeuralNetwork() {
    const groupRef = useRef<THREE.Group>(null);
    const { gl } = useThree();

    // Mouse position state (normalized -1 to 1)
    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const dragRotation = useRef({ x: 0, y: 0 });

    // Track mouse movement globally across the entire window
    useEffect(() => {
        const canvas = gl.domElement;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 based on window size (global tracking)
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

            if (isDragging) {
                const deltaX = e.clientX - dragStart.current.x;
                const deltaY = e.clientY - dragStart.current.y;
                targetRotation.current.y = dragRotation.current.y + deltaX * 0.01;
                targetRotation.current.x = dragRotation.current.x + deltaY * 0.01;
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            // Only start dragging if clicking on the canvas
            if (e.target === canvas) {
                setIsDragging(true);
                dragStart.current = { x: e.clientX, y: e.clientY };
                dragRotation.current = { ...targetRotation.current };
                canvas.style.cursor = 'grabbing';
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            canvas.style.cursor = 'grab';
        };

        canvas.style.cursor = 'grab';

        // Listen on window for global mouse tracking
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [gl, isDragging]);

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
            if (!isDragging) {
                // When not dragging, follow cursor with subtle movement + auto rotation
                const autoRotateY = state.clock.getElapsedTime() * 0.05;
                const mouseInfluenceX = mouse.current.y * 0.3;
                const mouseInfluenceY = mouse.current.x * 0.5;

                targetRotation.current.x = mouseInfluenceX;
                targetRotation.current.y = autoRotateY + mouseInfluenceY;
            }

            // Smooth interpolation (lerp) for fluid movement
            groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
            groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
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
