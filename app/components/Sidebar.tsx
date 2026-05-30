'use client';

import React from 'react';
import Image from 'next/image';
import {
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  Github,
  Menu,
  X,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping item IDs to Lucide Icons
const iconMap: Record<string, React.ComponentType<any>> = {
  home: Home,
  about: User,
  projects: Code2,
  experience: Briefcase,
  contact: Mail,
};

interface NavItem {
  id: string;
  label: string;
  ref: React.RefObject<HTMLElement | null>;
}

interface SidebarProps {
  activeSection: string;
  navItems: NavItem[];
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export default function Sidebar({
  activeSection,
  navItems,
  isExpanded,
  setIsExpanded,
}: SidebarProps) {

  const handleItemClick = (item: NavItem) => {
    item.ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 h-screen z-50 flex flex-col justify-between py-6 bg-[#060b14]/90 backdrop-blur-xl border-r border-slate-800/40 text-slate-100 select-none shadow-2xl overflow-hidden"
    >
      {/* Top Section: Toggle & Brand */}
      <div className="flex flex-col gap-8 px-4">
        {/* Toggle Button */}
        <div className={`flex items-center ${isExpanded ? 'justify-between px-2' : 'justify-center'}`}>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xs font-semibold uppercase tracking-wider text-sky-400"
            >
              Navigation
            </motion.span>
          )}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-slate-50 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Profile Info */}
        <div className={`flex items-center gap-3 ${isExpanded ? 'px-2' : 'justify-center'}`}>
          <div className="relative flex-shrink-0">
            <Image
              src="/logo.png"
              alt="DP"
              width={40}
              height={40}
              className="rounded-xl ring-2 ring-slate-800"
            />

          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="text-sm font-bold text-slate-100 tracking-tight leading-none">Eranga Jayasooriya</div>
                <div className="text-[10px] text-slate-400 mt-1 font-medium">Software Engineer</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Middle Section: Navigation Items */}
      <nav className="flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const Icon = iconMap[item.id] || Home;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`relative flex items-center group w-full p-3 rounded-xl transition-all duration-300 cursor-pointer ${isExpanded ? 'justify-start gap-4 px-4' : 'justify-center'
                }`}
            >
              {/* Active Background Glow */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveBackground"
                  className="absolute inset-0 bg-[#0a101d] rounded-xl border border-slate-800/80 shadow-md shadow-sky-500/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className="relative z-10">
                <Icon
                  size={20}
                  className={`transition-colors duration-300 ${isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                />
              </div>

              {/* Text Label */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-slate-100 font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip (Only when collapsed) */}
              {!isExpanded && (
                <div className="absolute left-20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 text-xs font-semibold text-slate-100 bg-[#0a101d] border border-slate-800 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Shortcuts & Info */}
      <div className="flex flex-col gap-2 px-3">
        {/* GitHub Shortcut */}
        <a
          href="https://github.com/JDEranga"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center group w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 ${isExpanded ? 'justify-start gap-4 px-4' : 'justify-center'
            }`}
        >
          <div className="relative z-10">
            <Github size={20} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 text-sm font-medium text-slate-400 group-hover:text-slate-200 whitespace-nowrap"
              >
                GitHub Profile
              </motion.span>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <div className="absolute left-20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 text-xs font-semibold text-slate-100 bg-[#0a101d] border border-slate-800 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50">
              GitHub Profile
            </div>
          )}
        </a>

        {/* Resume CV Shortcut */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center group w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 ${isExpanded ? 'justify-start gap-4 px-4' : 'justify-center'
            }`}
        >
          <div className="relative z-10">
            <Download size={20} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 text-sm font-medium text-slate-400 group-hover:text-slate-200 whitespace-nowrap"
              >
                Download Resume
              </motion.span>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <div className="absolute left-20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 text-xs font-semibold text-slate-100 bg-[#0a101d] border border-slate-800 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50">
              Download Resume
            </div>
          )}
        </a>
      </div>
    </motion.aside>
  );
}
