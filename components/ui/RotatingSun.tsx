import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const RotatingSun: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(200, 200);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
    });
    const sun = new THREE.Mesh(geometry, material);

    scene.add(sun);
    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      sun.rotation.x += 0.01;
      sun.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute top-10 right-10 w-50 h-50" />;
};

export default RotatingSun;
