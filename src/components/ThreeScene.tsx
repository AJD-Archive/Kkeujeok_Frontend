import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import { GlobalStyle, CanvasContainer } from '../styles/ThreeSceneStyled';
import middle from '../img/kkeujeok_middle.png';
import out from '../img/kkeujeok_out.png';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth / 1.5;
    const height = window.innerWidth / 1.5;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 10);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(2);

    mountRef.current.appendChild(renderer.domElement);

    const texture1 = new THREE.TextureLoader().load(middle);
    const texture2 = new THREE.TextureLoader().load(out);

    const material1 = new THREE.MeshBasicMaterial({ map: texture1, transparent: true });
    const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true });

    const geometry1 = new THREE.SphereGeometry(9.98, 50, 50);
    const geometry2 = new THREE.SphereGeometry(10, 50, 50);

    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);

    mesh2.rotation.y = -Math.PI / 2;
    mesh1.rotation.y = -Math.PI / 2;

    scene.add(mesh1);
    scene.add(mesh2);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh1.rotation.y += 0.0009;
      mesh2.rotation.y -= 0.0009;
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const isTouch = e.type.startsWith('touch');
      const clientX = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      const pos = (((360 * (clientX - width / 2)) / width) * Math.PI) / 180 / 2 - Math.PI / 2;
      const pos2 = (((360 * (clientY - height / 8)) / height) * Math.PI) / 180 - Math.PI / 2;

      mesh2.rotation.y = -pos - Math.PI;
      mesh1.rotation.y = pos;
      mesh2.rotation.x = pos2 / 10;
      mesh1.rotation.x = pos2 / 10;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '50%', height: '50%' }} />;
};

export default ThreeScene;
