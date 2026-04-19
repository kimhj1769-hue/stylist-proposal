/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Zap,
  Box,
  Palette,
  Globe,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

// --- Types & Interfaces ---

type TabType = 'overview' | 'features' | 'playground';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface StatItem {
  value: string;
  label: string;
}

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [counter, setCounter] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features: FeatureItem[] = [
    { icon: Zap, title: "Velocity", desc: "Optimized for speed and minimal runtime overhead." },
    { icon: Box, title: "Modular", desc: "Atomic component architecture for maximum reuse." },
    { icon: Palette, title: "Artistic", desc: "Visual precision meeting technical excellence." },
    { icon: Globe, title: "Global", desc: "Distributed by design across modern infra." }
  ];

  const stats: StatItem[] = [
    { value: "99+", label: "Components Built" },
    { value: "100ms", label: "Avg Interaction Delay" },
    { value: "04", label: "Industry Frameworks" }
  ];

  const tabs: TabType[] = ['overview', 'features', 'playground'];

  return (
    <div className="grid grid-cols-[100px_1fr_320px] grid-rows-[100px_1fr_120px] min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans overflow-hidden selection:bg-[#61DAFB] selection:text-[#000]">
      
      {/* Navigation (Top Row) */}
      <nav className="col-span-3 flex justify-between items-center px-10 border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#61DAFB] rounded-sm flex items-center justify-center">
            <Cpu className="text-black w-5 h-5" />
          </div>
          <span className="font-black tracking-[2px] text-lg uppercase">REACT_STUDIO</span>
        </div>
        
        <div className="flex gap-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[0.7rem] uppercase tracking-[1px] font-bold transition-all duration-300 ${
                activeTab === tab 
                ? 'text-[#61DAFB]' 
                : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#61DAFB]/5 border border-[#61DAFB]/20 rounded-sm">
          <div className="w-1.5 h-1.5 bg-[#61DAFB] rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-[#61DAFB] uppercase tracking-wider">v1.29.0 ACTIVE</span>
        </div>
      </nav>

      {/* Sidebar Left (Middle Row, Left Column) */}
      <aside className="border-r border-white/10 flex flex-col justify-center items-center">
        <div className="writing-vertical text-[0.65rem] uppercase tracking-[4px] text-[#61DAFB] font-medium">
          ESTABLISHED IN SEOUL 2024
        </div>
      </aside>

      {/* Main Content (Middle Row, Center Column) */}
      <main className="relative p-14 overflow-hidden">
        {/* Background Decal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-[#151515] leading-[0.8] z-0 pointer-events-none uppercase select-none capitalize">
          {activeTab}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-6"
              >
                <h1 className="text-[5rem] font-black leading-none uppercase">
                  Building Digital<br />
                  <span className="text-[#61DAFB]">Interfaces</span>
                </h1>
                <p className="font-serif italic text-2xl text-white/80 max-w-2xl">
                  Performance-driven React applications crafted with precision and artistic flair.
                </p>
                <div className="pt-8 flex gap-6">
                  <button className="bg-[#61DAFB] text-[#000] px-10 py-3 rounded-full font-black uppercase text-xs tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
                    Initialize <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="border border-white/20 px-10 py-3 rounded-full font-black uppercase text-xs tracking-wider hover:border-[#61DAFB] transition-colors">
                    Registry
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-2 gap-6"
              >
                {features.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-[#61DAFB]/50 transition-colors group">
                    <item.icon className="w-6 h-6 mb-4 text-[#61DAFB]" />
                    <h3 className="font-black uppercase tracking-wider text-sm mb-2">{item.title}</h3>
                    <p className="text-white/40 text-[0.8rem] leading-relaxed italic font-serif">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'playground' && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center h-full gap-10"
              >
                <div className="relative group">
                  <motion.div 
                    className="w-48 h-48 border-2 border-[#61DAFB] flex items-center justify-center text-7xl font-black text-[#61DAFB]"
                    animate={{ rotate: counter * 10 }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  >
                    {counter}
                  </motion.div>
                  <div className="absolute inset-0 border border-white/5 scale-110 -z-10 group-hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="flex gap-8">
                  <button 
                    onClick={() => setCounter(c => Math.max(0, c - 1))}
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-[#61DAFB] transition-colors text-xl font-bold"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => setCounter(c => c + 1)}
                    className="w-12 h-12 bg-[#61DAFB] text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Sidebar Right (Middle Row & Bottom Row, Right Column) */}
      <aside className="row-span-2 bg-[#111] border-l border-white/10 p-10 flex flex-col gap-10">
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm relative overflow-hidden group">
          <span className="text-[0.6rem] uppercase tracking-widest text-[#61DAFB] font-bold mb-4 block underline underline-offset-4 decoration-1">CORE_COMPETENCY</span>
          <div className="font-mono text-xs text-white/80 leading-relaxed whitespace-pre italic">
            const Capability = () =&gt; {"{"} {"\n"}
            {"  "}return ({"\n"}
            {"    "}&lt;UI arch="Solid" /&gt;{"\n"}
            {"  "});{"\n"}
            {"}"};
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#61DAFB]/5 blur-2xl rounded-full" />
        </div>

        <div className="flex flex-col gap-8 mt-auto">
          {stats.map((stat, i) => (
            <div key={i} className="border-b border-white/10 pb-4">
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/40 font-bold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Footer (Bottom Row, Left & Center Columns) */}
      <footer className="col-span-2 flex items-center justify-between px-10">
        <div className="text-[0.7rem] uppercase tracking-[3px] text-white/30 font-bold">
          // SCROLL FOR WORK //
        </div>
        <div className="flex items-center gap-10">
          <div className="text-[0.6rem] text-white/20 font-bold tracking-tighter uppercase italic">
            © 2026 REACT WORKSPACE // PRECISE_VERSIONING
          </div>
          <button className="bg-[#61DAFB] text-black px-8 py-3 rounded-full font-black uppercase text-[0.7rem] tracking-tight hover:shadow-[0_0_20px_rgba(97,218,251,0.3)] transition-all">
            Available for Hire
          </button>
        </div>
      </footer>
    </div>
  );
}
