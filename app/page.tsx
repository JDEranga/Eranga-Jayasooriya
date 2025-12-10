'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, ChevronDown, Menu, X } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { init } from 'next/dist/compiled/webpack/webpack';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.05,
  rotateAmplitude = 10,
  showMobileWarning = false,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false
}: {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSplash, setIsSplash] = useState(true);
  const [isAvatarVisible, setIsAvatarVisible] = useState(true);
  const [avatarOpacity, setAvatarOpacity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const homeTop = homeRef.current?.offsetTop || 0;
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY + 100; // Offset for nav height

      if (scrollPosition >= contactTop) {
        setActiveSection('contact');
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
    const timer = setTimeout(() => setAvatarOpacity(0), 7500); // Fade out after 7.5 seconds
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
      tech: ["Flutter", "Dart", "Andoid/iOS"],
      link: "#"
    },
    {
      title: " AI Skin Care",
      description: "AI-powered mobile application that delivers dermatologist-level analysis from images",
      tech: ["Flutter", "Dart", "Andoid/iOS"],
      link: "#"
    },
    {
      title: " AI Food Analysis",
      description: "AI-powered mobile application that delivers precise calorie counts, complete nutritional breakdowns from analyzing food images",
      tech: ["Flutter", "Dart", "Andoid/iOS"],
      link: "#"
    }
  ];

  const skills = [
    "Flutter", " Python", " C/C++", "Java", " JavaScript", "AI Agents", "AI",
    "Ruby"," UI/UX","Android/iOS Development", " Front-End Development", 
    "React", "Next.js", "TypeScript", "Node.js", 
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Git", "Photoshop", " Premiere pro", " After Effects"
  ];

  const softSkills = ["Tech Adaptability", "Conflict Resolution", "AI Enthusiast"];

  if (isSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 relative overflow-hidden">
      {/* Scrolling Gradient Overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-sky-200/0 via-sky-200/30 to-sky-800/40 pointer-events-none transition-opacity duration-1000 z-0"
        style={{ opacity: scrollY > 100 ? Math.min((scrollY - 100) / 500, 0.6) : 0 }}
      />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 rounded-b-2xl ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent flex items-center">
              <Image
                src="/jd.jpg"
                alt="DP"
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              Eranga Jayasooriya
            </div>
            <div className="text-xs text-gray-600 ml-10">Software Engineer | AI Enthusiast</div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                homeRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-sky-100 transition-all duration-200 text-sm font-medium rounded-lg ${
                activeSection === 'home' ? 'bg-sky-200 text-sky-900' : ''
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-sky-100 transition-all duration-200 text-sm font-medium rounded-lg ${
                activeSection === 'about' ? 'bg-sky-200 text-sky-900' : ''
              }`}
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-sky-100 transition-all duration-200 text-sm font-medium rounded-lg ${
                activeSection === 'projects' ? 'bg-sky-200 text-sky-900' : ''
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-sky-100 transition-all duration-200 text-sm font-medium rounded-lg ${
                activeSection === 'contact' ? 'bg-sky-200 text-sky-900' : ''
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
            <div className="flex flex-col gap-2 px-6 py-4">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  homeRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-blue-50 transition-colors rounded-lg ${
                  activeSection === 'home' ? 'bg-blue-200 text-blue-900' : ''
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-blue-50 transition-colors rounded-lg ${
                  activeSection === 'about' ? 'bg-blue-200 text-blue-900' : ''
                }`}
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-blue-50 transition-colors rounded-lg ${
                  activeSection === 'projects' ? 'bg-blue-200 text-blue-900' : ''
                }`}
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-blue-50 transition-colors rounded-lg ${
                  activeSection === 'contact' ? 'bg-blue-200 text-blue-900' : ''
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Hi, I'm <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                Eranga
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Full Stack Developer & Creative Problem Solver
            </p>
            <div className="mb-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {softSkills.map((skill, index) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-sky-500/20 to-sky-500/20 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-default"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-6 justify-center mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <a href="https://github.com/JDEranga" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-all duration-300 hover:scale-110">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-all duration-300 hover:scale-110">
                <Linkedin size={28} />
              </a>
              <a href="mailto:jaderanga@gmail.com" className="hover:text-sky-600 transition-all duration-300 hover:scale-110">
                <Mail size={28} />
              </a>
            </div>
            <a href="#projects" className="inline-block" onClick={(e) => {
              e.preventDefault();
              projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                View My Work
              </button>
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-sky-600" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-sky-600" size={32} />
            <h2 className="text-4xl font-bold text-gray-600">About Me</h2>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 relative">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4">
              <button className="px-2 py-1 md:px-3 md:py-2 bg-gradient-to-r from-sky-800 to-sky-500 text-white rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                View Resume
              </button>
            </a>
            <Image
              src="/jd.jpg"
              alt="My Photo"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer"
            />
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I'm a passionate full-stack developer with a deep focus on AI-powered applications. I am interested in building intelligent, modern web and mobile experiences 
              by seamlessly integrating cutting-edge AI and machine learning capabilities. I love turning complex challenges into simple, beautiful, and intuitive solutions 
              that leverage the power of artificial intelligence.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-4 text-sky-600">TECHNICAL SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-default"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-sky-600" size={32} />
            <h2 className="text-4xl font-bold text-gray-600">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="relative bg-white/70 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Code2 className="text-sky-600 group-hover:scale-110 transition-transform duration-300" size={28} />
                  <a href={project.link} className="text-gray-400 hover:text-sky-600 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-sky-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-3 py-1 bg-sky-500/20 rounded-full text-sky-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.title === "AI Plant Disease" && (
                  <div onClick={() => setIsModalOpen(true)} className="absolute inset-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <TiltedCard
                      imageSrc="/plantapp.png"
                      altText="Plant Disease App Thumbnail"
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      scaleOnHover={1.05}
                      rotateAmplitude={10}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={false}
                    />
                  </div>
                )}
                {project.title === " AI Skin Care" && (
                  <div onClick={() => setSelectedImage("/skincare.png")} className="absolute inset-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <TiltedCard
                      imageSrc="/skincare.png"
                      altText="Skin Care App Thumbnail"
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      scaleOnHover={1.05}
                      rotateAmplitude={10}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={false}
                    />
                  </div>
                )}
                {project.title === " AI Food Analysis" && (
                  <div onClick={() => setIsFoodModalOpen(true)} className="absolute inset-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <TiltedCard
                      imageSrc="/foodanalysis.png"
                      altText="Food Analysis App Thumbnail"
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      scaleOnHover={1.05}
                      rotateAmplitude={10}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={false}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Mail className="text-sky-600" size={32} />
            <h2 className="text-4xl font-bold">Get In Touch</h2>
          </div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <a href="mailto:jaderanga@gmail.com">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              Say Hello
            </button>
          </a>
          <div className="mt-12 flex gap-8 justify-center">
            <a href="https://github.com/JDEranga" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-600 transition-all duration-300 hover:scale-110">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/eranga-jayasooriya-3507102aa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-600 transition-all duration-300 hover:scale-110">
              <Linkedin size={32} />
            </a>
            <a href="mailto:jaderanga@gmail.com" className="text-gray-400 hover:text-sky-600 transition-all duration-300 hover:scale-110">
              <Mail size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 border-t border-gray-300">
        <p>© 2024 Eranga Jayasooriya.  Software Engineer | AI Enthusiast</p>
      </footer>

      {/* Avatar */}
      <div className="fixed bottom-10 right-4 md:right-20 z-100 w-24 h-24 md:w-48 md:h-48">
        <Image
          src="/avatar.gif"
          alt="Avatar"
          layout="fill"
          className="transition-opacity duration-1000"
          style={{ opacity: avatarOpacity }}
          unoptimized
        />
      </div>

      {/* Modal for Plant Disease App */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg transition-opacity duration-200 animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/plantapp.png"
              alt="Plant Disease App"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg animate-scale-in"
              unoptimized
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 hover:scale-110 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Modal for Food Analysis App */}
      {isFoodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg transition-opacity duration-200 animate-fade-in" onClick={() => setIsFoodModalOpen(false)}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/foodanalysis.png"
              alt="Food Analysis App"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg animate-scale-in"
              unoptimized
            />
            <button
              onClick={() => setIsFoodModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 hover:scale-110 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg transition-opacity duration-200 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Selected Project"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg animate-scale-in"
              unoptimized
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 hover:scale-110 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
