'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, ChevronDown, Menu, X, Sparkles, Zap, Brain, Palette, Database, Globe, ArrowRight, Download, Send, Calendar, Building2, MapPin, Award } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ChatBot from './components/ChatBot';

// 3D Laptop Component
function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, -0.3, 0]} scale={0.5}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2, 0.08, 1.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0.05, 0.1]}>
        <boxGeometry args={[1.8, 0.02, 1]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Touchpad */}
      <mesh position={[0, 0.06, 0.45]}>
        <boxGeometry args={[0.5, 0.01, 0.3]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Screen Frame */}
      <group position={[0, 0.75, -0.65]} rotation={[0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[2, 1.3, 0.06]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Screen Display */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.85, 1.15]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0ea5e9" 
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Code Lines on Screen */}
        <mesh position={[-0.5, 0.3, 0.04]}>
          <boxGeometry args={[0.6, 0.05, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.3, 0.15, 0.04]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-0.4, 0, 0.04]}>
          <boxGeometry args={[0.5, 0.05, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.2, -0.15, 0.04]}>
          <boxGeometry args={[0.9, 0.05, 0.01]} />
          <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.5, -0.3, 0.04]}>
          <boxGeometry args={[0.4, 0.05, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// Orbiting Elements
function OrbitingElements() {
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Floating Spheres */}
      <mesh position={[1.8, 0.5, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.5, 0.8, 0.5]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 1.5, -0.8]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Floating Torus */}
      <mesh position={[-1.2, -0.3, 0.8]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Floating Cubes */}
      <mesh position={[1.5, -0.5, 0.3]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.8, 1.2, 0.2]} rotation={[0.3, 0.8, 0.2]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Code Brackets */}
      <mesh position={[1.2, 1, -0.3]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.1, 0.02, 8, 4, Math.PI]} />
        <meshStandardMaterial color="#f0f9ff" emissive="#bae6fd" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-1.8, 0.2, -0.2]} rotation={[0, Math.PI, -0.2]}>
        <torusGeometry args={[0.1, 0.02, 8, 4, Math.PI]} />
        <meshStandardMaterial color="#f0f9ff" emissive="#bae6fd" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// Particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#38bdf8" transparent opacity={0.6} />
    </points>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 8], fov: 30 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 2, 2]} intensity={0.6} color="#0ea5e9" />
      <pointLight position={[-2, -1, 1]} intensity={0.3} color="#7dd3fc" />
      <Suspense fallback={null}>
        <Laptop />
        <OrbitingElements />
        <Particles />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
};

// Animated Icon Component
function AnimatedIcon({ icon: Icon, className = "", delay = 0 }: { icon: React.ComponentType<any>; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.2, rotate: 15 }}
      className={className}
    >
      <Icon />
    </motion.div>
  );
}

// Floating animation for decorative elements
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Animated Background Blobs
function AnimatedBlobs({ variant = "default" }: { variant?: "default" | "blue" | "cyan" | "purple" }) {
  // Use consistent sky/cyan color palette across all variants for uniformity
  const colors = {
    default: ["from-sky-400/50", "from-cyan-400/45", "from-blue-400/45"],
    blue: ["from-sky-500/55", "from-cyan-400/50", "from-blue-400/45"],
    cyan: ["from-cyan-400/50", "from-sky-400/45", "from-teal-400/40"],
    purple: ["from-sky-400/50", "from-cyan-400/45", "from-blue-500/45"]
  };
  const c = colors[variant];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-20 -left-20 w-[450px] h-[450px] bg-gradient-to-br ${c[0]} to-transparent rounded-full blur-[80px]`}
      />
      <motion.div
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute -top-10 -right-20 w-[550px] h-[550px] bg-gradient-to-bl ${c[1]} to-transparent rounded-full blur-[80px]`}
      />
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className={`absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr ${c[2]} to-transparent rounded-full blur-[80px]`}
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className={`absolute top-1/2 -right-10 w-[380px] h-[380px] bg-gradient-to-l ${c[0]} to-transparent rounded-full blur-[80px]`}
      />
    </div>
  );
}

// Floating Geometric Shapes
function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 80, x: '10%', y: '20%', delay: 0, duration: 8 },
    { type: 'square', size: 60, x: '85%', y: '15%', delay: 1, duration: 10 },
    { type: 'triangle', size: 70, x: '75%', y: '70%', delay: 2, duration: 9 },
    { type: 'circle', size: 50, x: '20%', y: '80%', delay: 3, duration: 11 },
    { type: 'square', size: 45, x: '90%', y: '50%', delay: 1.5, duration: 7 },
    { type: 'circle', size: 65, x: '5%', y: '50%', delay: 2.5, duration: 12 },
    { type: 'triangle', size: 55, x: '50%', y: '5%', delay: 0.5, duration: 8.5 },
    { type: 'square', size: 40, x: '30%', y: '90%', delay: 4, duration: 9.5 },
    { type: 'circle', size: 35, x: '60%', y: '30%', delay: 2, duration: 10 },
    { type: 'square', size: 50, x: '15%', y: '60%', delay: 1, duration: 11 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="rounded-full border-2 border-sky-400/60 bg-sky-400/20"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="rounded-xl border-2 border-sky-400/60 bg-sky-400/20"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="border-l-transparent border-r-transparent border-b-sky-400/60"
              style={{ 
                borderLeftWidth: shape.size / 2, 
                borderRightWidth: shape.size / 2, 
                borderBottomWidth: shape.size * 0.8,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Animated Grid Pattern
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Additional diagonal lines */}
      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(14, 165, 233, 0.15) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(14, 165, 233, 0.15) 25%, transparent 25%)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Animated Particles Background
function ParticlesBackground({ count = 30 }: { count?: number }) {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-sky-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

// Glowing Orbs
function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-56 h-56 bg-sky-400/50 rounded-full blur-[60px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.45, 0.25, 0.45],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/50 rounded-full blur-[60px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-sky-400/45 rounded-full blur-[60px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-1/3 left-1/3 w-44 h-44 bg-cyan-400/45 rounded-full blur-[60px]"
      />
    </div>
  );
}

// Animated Lines
function AnimatedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
          style={{
            top: `${15 + i * 14}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-0.5 bg-gradient-to-b from-transparent via-sky-400/60 to-transparent"
          style={{
            left: `${20 + i * 20}%`,
            top: 0,
            bottom: 0,
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.7, 0],
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}

// Code Rain Effect
function CodeRain() {
  const characters = ['0', '1', '<', '>', '/', '{', '}', '(', ')', ';', '=', '+', '-', '*', '&'];
  const columns = 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sky-500/70 font-mono text-sm font-medium"
          style={{ left: `${(i / columns) * 100}%` }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {[...Array(25)].map((_, j) => (
            <div key={j} className="my-1 text-center">
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  index, 
  onImageClick 
}: { 
  project: { title: string; description: string; tech: string[]; link: string; image?: string };
  index: number;
  onImageClick?: () => void;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      
      <div 
        className="relative bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-500 h-full flex flex-col cursor-pointer overflow-hidden"
        onClick={onImageClick}
      >
        {/* Image Section */}
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-3 right-3"
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <ExternalLink size={16} className="text-slate-700" />
              </a>
            </motion.div>

            {/* Project Title on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.h3 
                className="text-xl font-bold text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {project.title}
              </motion.h3>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-sky-500/20 to-sky-500/20 rounded-full border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* View Details Button */}
          <motion.div 
            className="mt-4 pt-4 border-t border-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">View Details</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-blue-500"
              >
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}


// Skill Badge Component
function SkillBadge({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="px-4 py-2 bg-gradient-to-r from-sky-500/20 to-sky-500/20 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-default"
    >
      {skill.trim()}
    </motion.span>
  );
}

// Social Link Component
function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group relative p-4 bg-white rounded-2xl shadow-sm border border-sky-200 hover:shadow-lg hover:border-sky-200 hover:bg-gradient-to-br from-skyblue-50 to-cyan-50 transition-all duration-300"
      aria-label={label}
    >
      <Icon size={24} className="text-slate-600 group-hover:text-sky-600 transition-colors" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap"
      >
        {label}
      </motion.div>
    </motion.a>
  );
}

// Section Header Component
function SectionHeader({ icon: Icon, title, subtitle, titleClassName }: { icon: React.ComponentType<{ className?: string; size?: number }>; title: string; subtitle?: string; titleClassName?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mb-16"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl mb-4 shadow-sm"
      >
        <Icon className="text-slate-700" size={28} />
      </motion.div>
      <h2 className={`text-3xl md:text-4xl font-bold text-center ${titleClassName || 'text-slate-800'}`}>{title}</h2>
      {subtitle && <p className="text-slate-500 mt-2 text-center max-w-md">{subtitle}</p>}
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSplash, setIsSplash] = useState(true);
  const [avatarOpacity, setAvatarOpacity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const experienceTop = experienceRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition >= contactTop) {
        setActiveSection('contact');
      } else if (scrollPosition >= experienceTop) {
        setActiveSection('experience');
      } else if (scrollPosition >= projectsTop) {
        setActiveSection('projects');
      } else if (scrollPosition >= aboutTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAvatarOpacity(0), 7500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsFoodModalOpen(false);
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
    {
      title: "AI Plant Disease",
      description: "AI-powered mobile application that diagnoses plant diseases from images",
      tech: ["Flutter", "Dart", "Android/iOS", "AI"],
      link: "#",
      image: "/plantapp.png"
    },
    {
      title: "AI Skin Care",
      description: "AI-powered mobile application that delivers dermatologist-level analysis from images",
      tech: ["Flutter", "Dart", "Android/iOS", "AI"],
      link: "#",
      image: "/skincare.png"
    },
    {
      title: "AI Food Analysis",
      description: "AI-powered mobile application that delivers precise calorie counts, complete nutritional breakdowns from analyzing food images",
      tech: ["Flutter", "Dart", "Android/iOS", "AI"],
      link: "#",
      image: "/foodanalysis.png"
    },
    {
      title: "Thurusisila",
      description: "Modern web site with elegant design",
      tech: ["Next.js", "React", "Tailwind"],
      link: "https://thurusisila.vercel.app/",
      image: "/thurusisila.png"
    },
    {
      title: "Queen's Residence",
      description: "Modern web site with elegant design",
      tech: ["Next.js", "React", "Tailwind"],
      link: "https://queens-residence.vercel.app/",
      image: "/queens.png"
    }
  ];

  const skills = [
    "Flutter", "Python", "C/C++", "Java", "JavaScript", "AI Agents", "AI",
    "Ruby", "UI/UX", "Android/iOS Development", "Front-End Development", 
    "React", "Next.js", "TypeScript", "Node.js", 
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Git", "Photoshop", "Premiere Pro", "After Effects"
  ];

  const softSkills = [
    { name: "Tech Adaptability", icon: Zap },
    { name: "Conflict Resolution", icon: Sparkles },
    { name: "AI Enthusiast", icon: Brain }
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "CodeGen International AbsolX (Rise AI)",
      location: "Kandy, Sri Lanka",
      period: "",
      description: "Leading development of AI-powered mobile applications using Flutter and integrating machine learning models for real-time image analysis.",
      achievements: ["Developed 3+ AI mobile apps", "Improved app performance by 40%", "Led team of 5 developers"],
      icon: Code2
    },
    {
      title: "Software Developer",
      company: "Tech Gallery Pvt Ltd",
      location: "Anuradhapura, Sri Lanka",
      period: "",
      description: "As a Software Developer at Tech Gallery Pvt Ltd, I focus on web and Android development, hardware and system repairs. I build responsive apps and troubleshoot technical issues to deliver effective software solutions.",
      achievements: ["Developed 5+ web and mobile apps", "Resolved 200+ hardware issues", "Enhanced system performance by 30%"],
      icon: Briefcase
    },
    {
      title: "Developer | Graphics Designer",
      company: " Freelance",
      location: "Sri Lanka",
      period: "Since 2015",
      description: " I have been working as a freelancer developer since 2015.",
      achievements: ["Web Development", " Android Development", "Graphic Design", "Freelance Projects", "UI/UX", "Client Satisfaction"],
      icon: Zap
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home', ref: homeRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'experience', label: 'Experience', ref: experienceRef },
    { id: 'contact', label: 'Contact', ref: contactRef }
  ];

  if (isSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900">
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => setIsSplash(false)}
          className="w-full h-full object-cover"
        >
          <source src="/splash.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(148,163,184,0.15)_1px,_transparent_0)] bg-[size:40px_40px]" />
        {/* Global floating particles */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 40%)`,
          }}
        />
      </div>
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100 rounded-b-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Image
                src="/jd.jpg"
                alt="DP"
                width={44}
                height={44}
                className="rounded-xl ring-2 ring-slate-100"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">Eranga Jayasooriya</div>
              <div className="text-xs text-slate-500">Software Engineer | AI Enthusiast</div>
            </div>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 backdrop-blur-sm rounded-full p-1.5">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => item.ref.current?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 rounded-2xl"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      item.ref.current?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-all ${
                      activeSection === item.id 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <AnimatedBlobs variant="blue" />
        <FloatingShapes />
        <ParticlesBackground count={40} />
        <AnimatedLines />
        
        {/* Section Fade Transition - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[5]" />
        
        {/* 3D Model - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] hidden md:block"
        >
          <Scene3D />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 opacity-20">
          <FloatingElement delay={0}>
            <Sparkles size={40} className="text-slate-400" />
          </FloatingElement>
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-20">
          <FloatingElement delay={1}>
            <Code2 size={40} className="text-slate-400" />
          </FloatingElement>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.2, y: -20, z: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 blur-md"
                  style={{ margin: -4 }}
                />
                <Image
                  src="/jd.jpg"
                  alt="Eranga Jayasooriya"
                  width={140}
                  height={140}
                  className="rounded-full relative z-10 ring-4 ring-white shadow-xl"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600 font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-800"
            >
              Hi, I'm{' '}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
                className="bg-gradient-to-r from-sky-900 via-sky-600 to-sky-600 bg-clip-text text-transparent"
              >
                Eranga
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 mb-8 font-light"
            >
              Full Stack Developer & Creative Problem Solver
            </motion.p>

            {/* Soft Skills */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-3 justify-center mb-10"
            >
              {softSkills.map(({ name, icon: Icon }, index) => (
                <motion.span 
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.4), 0 8px 10px -6px rgb(59 130 246 / 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium shadow-md cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Icon size={16} className="text-white" />
                  </motion.div>
                  {name}
                </motion.span>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={fadeInUp}
              className="flex gap-4 justify-center mb-10"
            >
              <SocialLink href="https://github.com/JDEranga" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:jaderanga@gmail.com" icon={Mail} label="Email" />
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <motion.button
                onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.60 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                View My Work
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 px-6 relative overflow-hidden">
        {/* Animated Background Elements - Same as Hero section */}
        <FloatingShapes />
        <ParticlesBackground count={40} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader 
            icon={User} 
            title="About Me" 
            subtitle="Get to know my story and expertise"
            titleClassName="bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden"
          >
            {/* Resume Button */}
            <motion.a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 z-10"
            >
              <Download size={16} />
              Resume
            </motion.a>

            {/* Profile Image */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pt-12 md:pt-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-slate-100">
                  <Image
                    src="/jd.jpg"
                    alt="Eranga Jayasooriya"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>

              <div className="flex-grow text-center md:text-left md:pr-24">
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                  I'm a passionate full-stack developer with a deep focus on AI-powered applications. I am interested in building intelligent, modern web and mobile experiences 
                  by seamlessly integrating cutting-edge AI and machine learning capabilities.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  I love turning complex challenges into simple, beautiful, and intuitive solutions 
                  that leverage the power of artificial intelligence. When I'm not coding, you can find me exploring new technologies and contributing to open-source projects.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={20} className="text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-800">Technical Skills</h3>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill, index) => (
                  <SkillBadge key={skill} skill={skill} index={index} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Animated Background Elements */}
        <AnimatedBlobs variant="purple" />
        <FloatingShapes />
        <CodeRain />
        
        {/* Section Fade Transitions */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-[5]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[5]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader 
            icon={Briefcase} 
            title="Projects" 
            subtitle="A selection of my recent work"
            titleClassName="bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onImageClick={() => {
                  if (project.title === "AI Plant Disease") setIsModalOpen(true);
                  else if (project.title === "AI Food Analysis") setIsFoodModalOpen(true);
                  else if (project.image) setSelectedImage(project.image);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Animated Background Elements */}
        <AnimatedBlobs variant="default" />
        <ParticlesBackground count={25} />
        <AnimatedLines />
        
        {/* Section Fade Transitions */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-[5]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[5]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader 
            icon={Award} 
            title="Experience" 
            subtitle="My professional journey"
            titleClassName="bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent"
          />
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-sky-400 to-sky-300 transform md:-translate-x-1/2" />
            
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot with Icon */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/30">
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </motion.div>
                  
                  {/* Content Card */}
                  <motion.div 
                    className={`ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-sky-100 transition-all duration-300">
                      {/* Period Badge */}
                      <motion.div 
                        className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-sm font-medium mb-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar size={14} />
                        {exp.period}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.title}</h3>
                      
                      <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">{exp.description}</p>
                      
                      {/* Achievements */}
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: achIndex * 0.1 + 0.3 }}
                            className="flex items-center gap-2 text-sm text-slate-500"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: achIndex * 0.3 }}
                            >
                              <Sparkles size={12} className="text-sky-500" />
                            </motion.div>
                            {achievement}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Animated Background Elements - Hidden on mobile to prevent layout issues */}
        <div className="hidden md:block">
          <AnimatedBlobs variant="blue" />
          <GlowingOrbs />
          <AnimatedGrid />
        </div>
        
        {/* Section Fade Transition - Top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-[5]" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <SectionHeader 
            icon={Send} 
            title="Get In Touch" 
            subtitle="Let's create something amazing together"
            titleClassName="bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100"
          >
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="mailto:jaderanga@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.60 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                <Mail size={20} />
                Say Hello
              </motion.a>
              
              <motion.a
                href="tel:+94719671533"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.60 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
              >
                <Send size={20} />
                Contact Me: (+94) 71-967-1533
              </motion.a>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-400 mb-4">Or find me on</p>
              <div className="flex gap-4 justify-center">
                <SocialLink href="https://github.com/JDEranga" icon={Github} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" icon={Linkedin} label="LinkedIn" />
                <SocialLink href="mailto:jaderanga@gmail.com" icon={Mail} label="Email" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-100">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Eranga Jayasooriya. Software Engineer | AI Enthusiast
        </p>
      </footer>

      {/* Avatar */}
      {/*
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: avatarOpacity, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-28 right-6 z-40 w-20 h-20 md:w-24 md:h-24"
      >
        <Image
          src="/avatar.gif"
          alt="Avatar"
          fill
          className="transition-opacity duration-1000"
          style={{ opacity: avatarOpacity }}
          unoptimized
        />
      </motion.div>
      */}

      {/* ChatBot */}
      <ChatBot />

      {/* Modal for Plant Disease App */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" 
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/plantapp.png"
                alt="Plant Disease App"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                unoptimized
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <X size={20} className="text-slate-700" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Food Analysis App */}
      <AnimatePresence>
        {isFoodModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" 
            onClick={() => setIsFoodModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/foodanalysis.png"
                alt="Food Analysis App"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                unoptimized
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFoodModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <X size={20} className="text-slate-700" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" 
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Project"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                unoptimized
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <X size={20} className="text-slate-700" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
