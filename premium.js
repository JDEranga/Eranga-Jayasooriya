const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Colors & Backgrounds to Premium Glass
const replacements = [
  // Typography
  ['text-slate-800', 'text-slate-100'],
  ['from-sky-800 to-sky-600 bg-clip-text', 'from-sky-300 via-blue-300 to-indigo-300 bg-clip-text pb-1'],
  ['from-sky-900 via-sky-600 to-sky-600 bg-clip-text', 'from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text pb-1'],
  
  // Base backgrounds
  ['from-[#060b14]', 'from-[#020617]'],
  ['via-[#0a101d]', 'via-[#030712]'],
  ['to-[#060b14]', 'to-[#020617]'],
  ['bg-[#060b14]', 'bg-[#020617]'],
  ['bg-[#0a101d]', 'bg-[#030712]'],
  ['bg-slate-900', 'bg-[#020617]'],
  
  // Cards and Glassmorphism
  ['bg-[#0a101d] rounded-2xl shadow-md shadow-sky-900/20 border border-slate-800/50', 'bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 shadow-2xl shadow-black/50 transition-all duration-500'],
  ['bg-[#0a101d] rounded-3xl p-8 md:p-12 shadow-md shadow-sky-900/20 border border-slate-800/50', 'bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 hover:border-white/20 shadow-2xl shadow-black/50'],
  ['bg-[#0a101d]/90 backdrop-blur-sm', 'bg-[#020617]/80 backdrop-blur-xl border border-white/10'],
  ['bg-[#0a101d]/95 backdrop-blur-xl border-t border-slate-800/50', 'bg-[#030712]/95 backdrop-blur-xl border-t border-white/10'],
  ['bg-[#0a101d]/80 backdrop-blur-xl shadow-md shadow-sky-900/20 border-b border-slate-800/50', 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'],
  ['bg-white/90 backdrop-blur-sm', 'bg-white/10 backdrop-blur-md border border-white/20'],
  
  // Modals & Popups
  ['bg-slate-900/80 backdrop-blur-sm', 'bg-[#020617]/90 backdrop-blur-md'],
  
  // Experience / Timeline
  ['bg-[#0a101d] rounded-2xl p-6 shadow-md shadow-sky-900/20 border border-slate-800/50', 'bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 shadow-2xl shadow-black/50'],
  ['hover:border-sky-100', 'hover:border-sky-500/30'],
  ['hover:shadow-lg hover:border-slate-700', 'shadow-2xl shadow-black/50 hover:shadow-sky-900/20 hover:border-sky-500/30 hover:bg-white/10'],
  
  // Buttons & Badges
  ['bg-slate-800 text-slate-50 shadow-md shadow-sky-900/20', 'bg-white/10 text-white border border-white/20 hover:bg-white/20'],
  ['bg-[#0a101d] text-slate-50 shadow-md shadow-sky-900/20', 'bg-white/10 text-white border border-white/20 hover:bg-white/20'],
  ['hover:bg-slate-50', 'hover:bg-white/10'],
  ['bg-slate-800 hover:bg-slate-700', 'bg-white/10 hover:bg-white/20 border border-white/10'],
  ['bg-sky-900/30 text-sky-600', 'bg-sky-500/10 text-sky-400 border border-sky-500/20'],
  
  // Subtle Icon Backgrounds
  ['bg-gradient-to-br from-slate-800 to-slate-800/80', 'bg-white/5 border border-white/10'],
  ['bg-slate-800 rounded-xl mb-4', 'bg-white/5 rounded-xl mb-4 border border-white/10'],
  
  // Hover Animations Simplification (Make it elegant, less bouncy)
  ['whileHover={{ scale: 1.1 }}', 'whileHover={{ scale: 1.05 }}'],
  ['whileHover={{ scale: 1.2', 'whileHover={{ scale: 1.08'],
  ['hover:scale-105', 'hover:scale-[1.02]'],
  ['whileHover={{ scale: 1.08, y: -2 }}', 'whileHover={{ scale: 1.04, y: -2 }}'],
  ['whileHover={{ y: -12 }}', 'whileHover={{ y: -6 }}'],
  ['whileHover={{ scale: 1.05, y: -2 }}', 'whileHover={{ scale: 1.03, y: -2 }}'],
];

replacements.forEach(([from, to]) => {
  content = content.split(from).join(to);
});

// A specific manual replacement for social links
content = content.replace(/bg-\\[#0a101d\\] rounded-2xl shadow-md shadow-sky-900\\/20 border border-sky-900\\/50/g, 'bg-white/5 backdrop-blur-md rounded-2xl border border-white/10');
content = content.replace(/hover:bg-gradient-to-br from-slate-800 to-slate-800\\/80/g, 'hover:bg-white/10');

// Fix buttons text color specifically if missed
content = content.replace(/text-slate-900/g, 'text-slate-50');
content = content.replace(/text-slate-800/g, 'text-slate-100');

fs.writeFileSync('app/page.tsx', content);
console.log('Premium rewrite applied.');
