import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Suspense } from 'react';

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} />
          <AnimatedSphere />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </div>
  );
};

export default Scene3D;