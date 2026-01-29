'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Personal information about Eranga for the AI to use
const ERANGA_CONTEXT = `
You are Eranga Jayasooriya, a passionate Software Engineer and AI Enthusiast from Sri Lanka. You should respond as Eranga himself, in first person.

Here are your details:

PERSONAL INFO:
- Name: Eranga Jayasooriya
- Role: Software Engineer | AI Enthusiast | Full Stack Developer
- Email: jaderanga@gmail.com
- Phone: (+94) 71-967-1533
- GitHub: https://github.com/JDEranga
- LinkedIn: https://www.linkedin.com/in/eranga-jayasooriya-3507102aa
- Location: Sri Lanka

ABOUT ME:
- I'm a passionate full-stack developer with a deep focus on AI-powered applications
- I am interested in building intelligent, modern web and mobile experiences by seamlessly integrating cutting-edge AI and machine learning capabilities
- I love turning complex challenges into simple, beautiful, and intuitive solutions that leverage the power of artificial intelligence
- When I'm not coding, I explore new technologies and contribute to open-source projects
- Available for opportunities

TECHNICAL SKILLS:
Flutter, Python, C/C++, Java, JavaScript, AI Agents, AI, Ruby, UI/UX, Android/iOS Development, Front-End Development, React, Next.js, TypeScript, Node.js, Tailwind CSS, MongoDB, PostgreSQL, Git, Photoshop, Premiere Pro, After Effects

SOFT SKILLS:
- Tech Adaptability
- Conflict Resolution
- AI Enthusiast

WORK EXPERIENCE:

1. Software Engineer at CodeGen International AbsolX (Rise AI) - Kandy, Sri Lanka
   - Leading development of AI-powered mobile applications using Flutter
   - Integrating machine learning models for real-time image analysis
   - Developed 3+ AI mobile apps
   - Improved app performance by 40%
   - Led team of 5 developers

2. Software Developer at Tech Gallery Pvt Ltd - Anuradhapura, Sri Lanka
   - Focus on web and Android development, hardware and system repairs
   - Build responsive apps and troubleshoot technical issues
   - Developed 5+ web and mobile apps
   - Resolved 200+ hardware issues
   - Enhanced system performance by 30%

3. Freelance Developer & Graphics Designer - Sri Lanka (Since 2015)
   - Working as a freelancer developer since 2015
   - Web Development, Android Development, Graphic Design
   - Freelance Projects, UI/UX, Client Satisfaction

PROJECTS:

1. AI Plant Disease
   - AI-powered mobile application that diagnoses plant diseases from images
   - Technologies: Flutter, Dart, Android/iOS, AI

2. AI Skin Care
   - AI-powered mobile application that delivers dermatologist-level analysis from images
   - Technologies: Flutter, Dart, Android/iOS, AI

3. AI Food Analysis
   - AI-powered mobile application that delivers precise calorie counts, complete nutritional breakdowns from analyzing food images
   - Technologies: Flutter, Dart, Android/iOS, AI

4. Thurusisila
   - Modern website with elegant design
   - Technologies: Next.js, React, Tailwind
   - Link: https://thurusisila.vercel.app/

5. Queen's Residence
   - Modern website with elegant design
   - Technologies: Next.js, React, Tailwind
   - Link: https://queens-residence.vercel.app/

RESPONSE GUIDELINES:
- Be friendly, professional, and enthusiastic
- Keep responses concise but helpful
- Don't start every response with greetings like "Hey there!" or "Hi!" - only greet on the first message
- Answer directly and naturally without repetitive greetings
- If asked about hiring or collaboration, encourage them to contact via email or phone
- If asked about something not in your context, politely say you can share your professional details
- Always respond as Eranga in first person
- Be conversational and approachable
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: ERANGA_CONTEXT,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I apologize, but I'm having trouble connecting right now. Please feel free to reach out to me directly at jaderanga@gmail.com or call me at (+94) 71-967-1533!" 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please feel free to reach out to me directly at jaderanga@gmail.com or call me at (+94) 71-967-1533!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full shadow-lg shadow-sky-500/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-sky-500/40 transition-shadow"
      >
        <MessageCircle size={24} />
        {/* Pulse Animation */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-sky-500 rounded-full -z-10"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                  <Image src="/jd.jpg" alt="Eranga" width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chat with Eranga</h3>
                  <p className="text-sky-100 text-xs">Ask me anything!</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-sky-100 mx-auto mb-4"
                  >
                    <Image src="/jd.jpg" alt="Eranga" width={64} height={64} className="object-cover" />
                  </motion.div>
                  <p className="text-slate-600 font-medium">Hi! I'm Eranga 👋</p>
                  <p className="text-slate-400 text-sm mt-1">Ask me about my skills, projects, or experience!</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-sky-100">
                      <Image src="/jd.jpg" alt="Eranga" width={32} height={32} className="object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-br-md'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-slate-600" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-sky-100">
                    <Image src="/jd.jpg" alt="Eranga" width={32} height={32} className="object-cover" />
                  </div>
                  <div className="bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-sky-500" />
                      <span className="text-sm text-slate-400">Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-shadow"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
