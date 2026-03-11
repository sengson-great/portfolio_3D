import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, PointMaterial, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Custom effect for atmospheric scattering
const AtmosphericScattering = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.background = new THREE.Color(0x030311);
    scene.fog = new THREE.FogExp2(0x030311, 0.0008);
  }, [scene]);
  
  return null;
};

// TRUE MILKY WAY GALAXY - with proper structure
const MilkyWayGalaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 40000;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Determine if star is in bulge or disk
      const isBulge = Math.random() < 0.2; // 30% in central bulge
      
      let x, y, z;
      let radius, angle;
      let theta, phi;
      
      if (isBulge) {
        // Central bulge - spherical random distribution
        radius = Math.pow(Math.random(), 1.5) * 5; // Concentrated in center
        theta = Math.acos(2 * Math.random() - 1);
        phi = Math.random() * Math.PI * 2;
        
        x = radius * Math.sin(theta) * Math.cos(phi);
        y = radius * Math.sin(theta) * Math.sin(phi) * 0.6; // Slightly flattened
        z = radius * Math.cos(theta);
      } else {
        // Spiral disk
        radius = 3 + Math.pow(Math.random(), 1.2) * 25; // Spread out more
        
        // Spiral arm structure - 4 major arms
        const armCount = 4;
        const armAngleOffset = (Math.floor(Math.random() * armCount) / armCount) * Math.PI * 2;
        
        // Spiral arm equation
        const spiralFactor = 0.4;
        const randomOffset = (Math.random() - 0.5) * 0.8; // Scatter around arms
        
        // Base angle from radius (logarithmic spiral)
        let baseAngle = radius * spiralFactor;
        
        // Add spiral arms
        const armInfluence = Math.sin(baseAngle * 2) * 0.5;
        angle = baseAngle + armAngleOffset + armInfluence + randomOffset;
        
        // Convert to Cartesian
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        
        // Thin disk - height decreases with radius
        const scaleHeight = 0.3 * Math.exp(-radius / 15);
        y = (Math.random() - 0.5) * scaleHeight * 4;
      }
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color based on stellar type and location
      const color = new THREE.Color();
      const isOldStar = isBulge || radius > 20; // Bulge and outer disk have older stars
      
      if (isOldStar) {
        // Older stars - redder/yellower
        const temp = 3000 + Math.random() * 3000;
        if (temp < 4000) {
          color.setHSL(0.03, 0.9, 0.5 + Math.random() * 0.3); // Red/orange
        } else {
          color.setHSL(0.1, 0.8, 0.6 + Math.random() * 0.3); // Yellow
        }
      } else {
        // Younger stars - bluer in spiral arms
        const temp = 5000 + Math.random() * 25000;
        if (temp < 6000) {
          color.setHSL(0.1, 0.8, 0.7 + Math.random() * 0.3); // Yellow
        } else if (temp < 10000) {
          color.setHSL(0.6, 0.7, 0.7 + Math.random() * 0.3); // White-blue
        } else {
          color.setHSL(0.65, 0.9, 0.8 + Math.random() * 0.2); // Hot blue
        }
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame(() => {
    if (pointsRef.current) {
      // Very slow rotation of the galaxy
      pointsRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <points ref={pointsRef} rotation={[0.1, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.15}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Static Center Sphere
const CenterSphere = () => {
  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={2} color="#4a7db5" decay={2} distance={40} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#8ab3ff" decay={2} distance={30} />
      
      <Sphere args={[1.8, 128, 128]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#2a4a7a"
          emissive="#ecbc20"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.3}
        />
      </Sphere>
      
      <Sphere args={[1.85, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#3a6a9a"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      <Sphere args={[2.0, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#5a8aca"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.3, 0.03, 32, 100]} />
          <meshBasicMaterial color="#4a7db5" transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
};

// Planet component
const Planet = ({ 
  size, 
  color, 
  position, 
  hasRings = false,
  isGasGiant = false,
  moonCount = 0,
  emissive = false,
  orbitSpeed = 0.001
}: { 
  size: number; 
  color: string; 
  position: [number, number, number];
  hasRings?: boolean;
  isGasGiant?: boolean;
  moonCount?: number;
  emissive?: boolean;
  orbitSpeed?: number;
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
  
  useFrame(({ clock }) => {
    if (planetGroupRef.current) {
      const time = clock.getElapsedTime() * orbitSpeed;
      const radius = Math.sqrt(initialPos.x * initialPos.x + initialPos.z * initialPos.z);
      const angle = Math.atan2(initialPos.z, initialPos.x) + time;
      
      planetGroupRef.current.position.x = Math.cos(angle) * radius;
      planetGroupRef.current.position.z = Math.sin(angle) * radius;
    }
    
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={planetGroupRef} position={position}>
      <group ref={planetRef}>
        <Sphere args={[size, 64, 64]}>
          <meshStandardMaterial
            color={color}
            emissive={emissive ? color : 'black'}
            emissiveIntensity={emissive ? 0.3 : 0}
            roughness={isGasGiant ? 0.3 : 0.6}
            metalness={0.1}
          />
        </Sphere>
        
        {isGasGiant && (
          <Sphere args={[size * 1.03, 32, 32]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </Sphere>
        )}
        
        {hasRings && (
          <group rotation={[Math.PI / 2.2, 0.2, 0]}>
            <mesh>
              <torusGeometry args={[size * 1.8, 0.08, 32, 100]} />
              <meshStandardMaterial color="#cbbaa8" transparent opacity={0.3} />
            </mesh>
          </group>
        )}
      </group>
      
      {/* Moons */}
      {Array.from({ length: moonCount }).map((_, i) => {
        const moonRef = useRef<THREE.Group>(null);
        const distance = size * 4;
        const speed = 0.5 + Math.random() * 0.5;
        
        useFrame(({ clock }) => {
          if (moonRef.current) {
            const angle = clock.getElapsedTime() * speed + i * Math.PI * 2 / moonCount;
            moonRef.current.position.x = Math.cos(angle) * distance;
            moonRef.current.position.z = Math.sin(angle) * distance;
          }
        });
        
        return (
          <group key={i} ref={moonRef}>
            <Sphere args={[size * 0.2, 16, 16]}>
              <meshStandardMaterial color="#aaaaaa" roughness={0.8} />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

// Distant background galaxies
const DistantGalaxies = () => {
  const galaxy1Ref = useRef<THREE.Points>(null);
  
  const galaxy1Positions = useMemo(() => {
    const arr = new Float32Array(10000 * 3);
    for (let i = 0; i < 10000 * 3; i += 3) {
      const r = 15 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 4;
      
      arr[i] = (Math.cos(angle) * r) - 80;
      arr[i + 1] = (Math.random() - 0.5) * 10;
      arr[i + 2] = (Math.sin(angle) * r) - 60 + spread;
    }
    return arr;
  }, []);
  
  useFrame(() => {
    if (galaxy1Ref.current) {
      galaxy1Ref.current.rotation.y += 0.0002;
    }
  });
  
  return (
    <points ref={galaxy1Ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={10000}
          array={galaxy1Positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.25}
        color="#aaccff"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Background star field (random distribution)
const BackgroundStars = () => {
  return (
    <Stars
      radius={500}
      depth={300}
      count={15000}
      factor={12}
      saturation={0}
      fade
      speed={0.05}
    />
  );
};

// Main Scene Component
const UniverseScene = () => {
  return (
    <div className="w-full bg-black overflow-auto" style={{ height: 'auto', minHeight: '100vh' }}>
      {/* Hero section with 3D canvas */}
      <div className="relative w-full" style={{ height: '100vh' }}>
        <Canvas
          camera={{ position: [0, 8, 40], fov: 50, near: 0.1, far: 1000 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true,
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.2
          }}
          style={{ background: 'black', width: '100%', height: '100%' }}
        >
          <AtmosphericScattering />
          
          <Suspense fallback={null}>
            <ambientLight intensity={0.02} />
            
            {/* TRUE MILKY WAY - NOT A CIRCLE */}
            <MilkyWayGalaxy />
            
            {/* Distant galaxies */}
            <DistantGalaxies />
            
            {/* Background stars - truly random */}
            <BackgroundStars />
            
            {/* Center sphere */}
            <CenterSphere />
            
            {/* Planets with orbits */}
            <Planet 
              size={0.6} 
              color="#b85c3a" 
              position={[12, 1, 8]} 
              moonCount={2}
              emissive={true}
              orbitSpeed={0.006}
            />
            <Planet 
              size={1.1} 
              color="#c9a87c" 
              position={[-18, 2, -12]} 
              hasRings 
              isGasGiant 
              moonCount={3}
              orbitSpeed={0.004}
            />
            <Planet 
              size={0.5} 
              color="#4a7db5" 
              position={[15, -1, -15]} 
              moonCount={1}
              orbitSpeed={0.008}
            />
            <Planet 
              size={0.8} 
              color="#6a8c5a" 
              position={[-14, 0, 18]} 
              moonCount={2}
              orbitSpeed={0.005}
            />
            
            {/* Controls - rotation only */}
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.3}
            />
          </Suspense>
        </Canvas>

        {/* UI Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none opacity-30" />
        
      </div>

      {/* Content sections */}
      <div className="relative z-20 bg-black text-white">
        <section className="py-24 px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              A True Spiral Galaxy
            </h2>
            <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
              Unlike simple circles, our Milky Way features a dense central bulge and four distinct spiral arms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-lg">
                <div className="text-4xl mb-4">🌌</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-300">40,000 Stars</h3>
                <p className="text-gray-400">Distributed in a true spiral pattern with 30% concentrated in the central bulge.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-lg">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Stellar Populations</h3>
                <p className="text-gray-400">Older redder stars in the bulge, younger blue stars in the spiral arms.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-lg">
                <div className="text-4xl mb-4">🪐</div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-300">4 Spiral Arms</h3>
                <p className="text-gray-400">Stars clustered along arm structures with realistic scatter.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UniverseScene;