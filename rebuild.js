const fs = require('fs');

const content = \\
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowRight, Download, Send, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ChatBot from './components/ChatBot';

// ------------------------------------
// 3D & BACKGROUND COMPONENTS (Minimalist)
// ------------------------------------
function Laptop() {
  const groupRef = useRef(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, -0.3, 0]} scale={0.6}>
      {/* Base */}
      <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2, 0.08, 1.4]} />
        <meshStandardMaterial color="#0A0A0B" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen Frame */}
      <group position={[0, 0.75, -0.65]} rotation={[0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[2, 1.3, 0.06]} />
          <meshStandardMaterial color="#0A0A0B" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.85, 1.15]} />
          <meshStandardMaterial color="#020617" emissive="#1e293b" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-2, -2, 2]} intensity={0.5} color="#3b82f6" />
        <Suspense fallback={null}>
          <Laptop />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
    />
  );
}

// ------------------------------------
// UI COMPONENTS
// ------------------------------------
function SectionHeading({ title, subtitle }) {
  return (
    <div className="flex flex-col mb-16 md:mb-24">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-12 bg-white/30"></div>
        <span className="text-xs tracking-[0.3em] text-white/50 uppercase font-mono">{subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

function Marquee({ text, speed = 20 }) {
  return (
    <div className="w-full overflow-hidden bg-white text-black py-4 border-y border-white/20 flex whitespace-nowrap z-10 relative">
      <motion.div
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex space-x-10 text-xl md:text-3xl font-bold uppercase tracking-wider items-center"
      >
        <span>{text}</span>
        <span>•</span>
        <span>{text}</span>
        <span>•</span>
        <span>{text}</span>
        <span>•</span>
        <span>{text}</span>
        <span>•</span>
        <span>{text}</span>
        <span>•</span>
      </motion.div>
    </div>
  );
}

// ------------------------------------
// MAIN PAGE
// ------------------------------------
export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Data
  const projects = [
    { title: "AI Plant Disease", category: "Mobile App // AI", link: "#", tech: ["Flutter", "Dart", "AI"], image: "/plantapp.png" },
    { title: "AI Skin Care", category: "Mobile App // AI", link: "#", tech: ["Flutter", "Dart", "AI"], image: "/skincare.png" },
    { title: "AI Food Analysis", category: "Mobile App // AI", link: "#", tech: ["Flutter", "Dart", "AI"], image: "/foodanalysis.png" },
    { title: "Paramitha Puramu", category: "Web // Next.js", link: "https://paramithapuramu.org/", tech: ["Next.js", "React"], image: "/paramitha.png" },
    { title: "Queen's Residence", category: "Web // Next.js", link: "https://queens-residence.vercel.app/", tech: ["Next.js", "React"], image: "/queens.png" },
    { title: "Thurusisila", category: "Web // Next.js", link: "https://thurusisila.vercel.app/", tech: ["Next.js", "Tailwind"], image: "/thurusisila.png" },
  ];

  const experiences = [
    {
      company: "CodeGen (Rise AI)",
      role: "Software Engineer",
      period: "Present",
      description: "Leading development of AI-powered mobile applications using Flutter and integrating ML models for real-time analysis."
    },
    {
      company: "Tech Gallery Pvt Ltd",
      role: "Software Developer",
      period: "Past",
      description: "Focused on web and Android development. Built responsive apps and troubleshot hardware/technical issues."
    },
    {
      company: "Freelance",
      role: "Developer & Designer",
      period: "Since 2015",
      description: "Delivering custom web, mobile, and design solutions for clients worldwide."
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-white selection:text-black">
      <GrainOverlay />
      
      {/* ----------------- NAVBAR ----------------- */}
      <nav className={"fixed top-0 w-full z-40 transition-all duration-700 " + (scrollY > 50 ? "bg-[#020617]/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-8")}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-tighter mix-blend-difference z-50">
            E<span className="text-white/50">J.</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide uppercase">
            {['About', 'Work', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} className="hover:text-white/60 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" className="px-5 py-2.5 bg-white text-black hover:bg-white/80 transition-colors rounded-full font-bold flex items-center gap-2">
              RESUME <Download size={14} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50 mix-blend-difference" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#020617] z-30 flex flex-col justify-center items-center gap-8 text-3xl font-serif"
          >
             {['About', 'Work', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} onClick={() => setIsMenuOpen(false)} className="hover:text-white/50 transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- HERO ----------------- */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6 md:px-12 max-w-[1400px] mx-auto">
        <Scene3D />
        
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="z-10 mt-20 pointer-events-none">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-white/70">
              Available for full-time & freelance
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] leading-[0.9] font-sans font-bold tracking-tighter uppercase whitespace-nowrap"
          >
            Creative <br/>
            <span className="text-white/20 italic font-serif lowercase tracking-normal -ml-2">Developer</span>
          </motion.h1>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-end justify-between border-t border-white/10 pt-8"
          >
            <p className="max-w-md text-lg md:text-xl font-light text-white/60">
              I'm <span className="text-white font-medium">Eranga Jayasooriya</span>. A full-stack engineer and AI enthusiast building premium, intelligent digital experiences that solve real problems.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/JDEranga" target="_blank" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" target="_blank" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Divider */}
      <Marquee text="Software Engineering • Artificial Intelligence • UI/UX Design • Mobile Development" speed={25} />

      {/* ----------------- ABOUT ----------------- */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
        <SectionHeading subtitle="Who I Am" title="About." />
        
        <div className="grid md:grid-cols-12 gap-12 items-start mt-12">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image src="/jd.jpg" alt="Eranga" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8 md:pt-12">
            <h3 className="text-2xl md:text-4xl font-serif font-light leading-tight">
              Driven by a deep interest in <span className="font-bold border-b border-white">AI-powered applications</span>, I seamlessly blend modern design with cutting-edge machine learning.
            </h3>
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
              I love turning complex challenges into simple, beautiful, and intuitive solutions. When I'm not coding, you can find me exploring new technologies, crafting flawless architectures, and contributing to open-source software.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {['Flutter', 'React', 'Next.js', 'Python', 'AI / ML', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map(skill => (
                <span key={skill} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- WORK ----------------- */}
      <section id="work" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <SectionHeading subtitle="Selected Projects" title="Work." />
        
        <div className="flex flex-col border-t border-white/10">
          {projects.map((proj, i) => (
            <motion.a 
              key={i} 
              href={proj.link}
              target="_blank"
              initial="initial"
              whileHover="hover"
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-white/10 cursor-pointer overflow-hidden"
            >
              {/* Hover Background */}
              <motion.div 
                variants={{
                  initial: { height: 0 },
                  hover: { height: '100%' }
                }}
                className="absolute bottom-0 left-0 right-0 bg-white/5 -z-10"
              />

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">{proj.category}</span>
                <h3 className="text-4xl md:text-6xl font-serif font-light group-hover:pl-4 transition-all duration-500">{proj.title}</h3>
              </div>

              <div className="hidden md:flex items-center gap-6 mt-6 md:mt-0">
                <div className="flex gap-2">
                  {proj.tech.map(t => (
                   <span key={t} className="text-sm font-mono text-white/50 border border-white/10 px-3 py-1 rounded-full">{t}</span> 
                  ))}
                </div>
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 scale-90 group-hover:scale-100">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Marquee Divider 2 */}
      <Marquee text="Pushing the boundaries of web & mobile • Creating value through code" speed={30} />

      {/* ----------------- EXPERIENCE ----------------- */}
      <section id="experience" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
        <SectionHeading subtitle="Career Path" title="Experience." />
        
        <div className="w-full">
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-col lg:flex-row lg:items-start justify-between py-12 border-b border-white/10 group hover:bg-white/5 transition-colors -mx-6 px-6 md:-mx-12 md:px-12">
              <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
                <span className="font-mono text-white/50 tracking-wider uppercase text-sm border border-white/10 px-4 py-1.5 rounded-full inline-block">
                  {exp.period}
                </span>
              </div>
              <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                <h4 className="text-2xl font-bold font-sans">{exp.role}</h4>
                <p className="text-xl text-white/60 font-serif italic mt-2">{exp.company}</p>
              </div>
              <div className="w-full lg:w-5/12">
                <p className="text-lg text-white/50 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- FOOTER / CONTACT ----------------- */}
      <section id="contact" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col items-center justify-center min-h-[70svh] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="text-center z-10 flex flex-col items-center w-full">
          <span className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-8 border border-white/10 px-6 py-2 rounded-full">
            What's Next?
          </span>
          <h2 className="text-[12vw] md:text-[10vw] font-sans font-bold uppercase leading-[0.8] tracking-tighter hover:text-white/80 transition-colors w-full text-center">
            <a href="mailto:jaderanga@gmail.com" className="hover:italic font-black">LET'S TALK</a>
          </h2>
          
          <div className="mt-20 flex flex-col md:flex-row gap-8 items-center justify-between w-full border-t border-white/10 pt-12 text-white/50 font-medium">
            <p>© {new Date().getFullYear()} Eranga Jayasooriya.</p>
            <div className="flex gap-6">
              <a href="https://github.com/JDEranga" className="hover:text-white transition-colors uppercase text-sm tracking-wider">GitHub</a>
              <a href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" className="hover:text-white transition-colors uppercase text-sm tracking-wider">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </div>
  );
}
\

fs.writeFileSync('app/page.tsx', content);
console.log('Successfully rewrote portfolio page.');
