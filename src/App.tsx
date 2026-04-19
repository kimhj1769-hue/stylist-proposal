/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette,
  ArrowRight,
  Camera,
  Scale,
  Ruler,
  User,
  Upload,
  Plus,
  Loader2,
  Sparkles,
  Shirt,
  Lightbulb,
  ChevronLeft,
  Check
} from 'lucide-react';
import { getStylingAdvice, StylingResult } from './services/stylistService';

// --- Types & Interfaces ---

type StepType = 'welcome' | 'profile' | 'photo' | 'analyzing' | 'result';

interface UserData {
  height: string;
  weight: string;
  image: string | null;
}

// --- Main Application ---

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepType>('welcome');
  const [userData, setUserData] = useState<UserData>({
    height: '',
    weight: '',
    image: null
  });
  const [stylingResult, setStylingResult] = useState<StylingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    setCurrentStep('analyzing');
    setIsAnalyzing(true);
    try {
      const result = await getStylingAdvice(userData.height, userData.weight, userData.image);
      setStylingResult(result);
      setCurrentStep('result');
    } catch (error) {
      console.error(error);
      alert("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
      setCurrentStep('photo');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isProfileComplete = userData.height !== '' && userData.weight !== '';

  return (
    <div className="grid grid-cols-[100px_1fr_320px] grid-rows-[100px_1fr_120px] min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans overflow-hidden selection:bg-[#61DAFB] selection:text-[#000]">
      
      {/* Navigation (Top Row) */}
      <nav className="col-span-3 flex justify-between items-center px-10 border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#61DAFB] rounded-sm flex items-center justify-center">
            <Palette className="text-black w-5 h-5" />
          </div>
          <span className="font-black tracking-[2px] text-lg uppercase">STYLIST_AI</span>
        </div>
        
        <div className="flex gap-10">
          {(['welcome', 'profile', 'photo', 'result'] as const).map((step) => (
            <button
              key={step}
              onClick={() => {
                if (step === 'result' && !stylingResult) return;
                setCurrentStep(step);
              }}
              disabled={step === 'result' && !stylingResult}
              className={`text-[0.7rem] uppercase tracking-[1px] font-bold transition-all duration-300 ${
                currentStep === step 
                ? 'text-[#61DAFB]' 
                : 'text-white/40 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed'
              }`}
            >
              <span className="mr-2 opacity-50">0{['welcome', 'profile', 'photo', 'result'].indexOf(step) + 1}</span>
              {step}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#61DAFB]/5 border border-[#61DAFB]/20 rounded-sm">
          <div className="w-1.5 h-1.5 bg-[#61DAFB] rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-[#61DAFB] uppercase tracking-wider">AI POWERED ANALYSIS</span>
        </div>
      </nav>

      {/* Sidebar Left (Middle Row, Left Column) */}
      <aside className="border-r border-white/10 flex flex-col justify-center items-center">
        <div className="writing-vertical text-[0.65rem] uppercase tracking-[4px] text-[#61DAFB] font-medium">
          STYLING REVOLUTION 2026
        </div>
      </aside>

      {/* Main Content (Middle Row, Center Column) */}
      <main className="relative p-14 overflow-hidden">
        {/* Background Decal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[#151515] leading-[0.8] z-0 pointer-events-none uppercase select-none capitalize">
          {currentStep}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-6"
              >
                <div className="text-[0.7rem] uppercase tracking-[3px] text-[#61DAFB] font-black mb-2 flex items-center gap-2">
                   <div className="w-4 h-[1px] bg-[#61DAFB]" /> INTRODUCING PERSONAL AI
                </div>
                <h1 className="text-[5rem] font-black leading-none uppercase">
                  Personalized<br />
                  <span className="text-[#61DAFB]">Stylist</span>
                </h1>
                <p className="font-serif italic text-2xl text-white/80 max-w-2xl">
                  당신만을 위한 맞춤형 스타일링의 시작. <br />
                  신체 정보와 사진을 통해 최적의 룩을 추천받으세요.
                </p>
                <div className="pt-8 flex gap-6">
                  <button 
                    onClick={() => setCurrentStep('profile')}
                    className="bg-[#61DAFB] text-[#000] px-10 py-3 rounded-full font-black uppercase text-xs tracking-wider hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    Start Analysis <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="max-w-xl space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase flex items-center gap-4">
                    <User className="text-[#61DAFB]" /> Physical Profile
                  </h2>
                  <p className="text-white/40 font-serif italic">정확한 분석을 위해 키와 몸무게를 입력해 주세요.</p>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4 group">
                    <label className="text-[0.65rem] uppercase tracking-widest text-[#61DAFB] font-bold block">Height (cm)</label>
                    <div className="relative">
                      <Ruler className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#61DAFB] transition-colors" />
                      <input 
                        type="number" 
                        placeholder="175"
                        value={userData.height}
                        onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/10 p-4 pl-10 focus:outline-none focus:border-[#61DAFB] text-3xl font-black transition-all placeholder:text-white/5"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <label className="text-[0.65rem] uppercase tracking-widest text-[#61DAFB] font-bold block">Weight (kg)</label>
                    <div className="relative">
                      <Scale className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#61DAFB] transition-colors" />
                      <input 
                        type="number" 
                        placeholder="70"
                        value={userData.weight}
                        onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/10 p-4 pl-10 focus:outline-none focus:border-[#61DAFB] text-3xl font-black transition-all placeholder:text-white/5"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                  onClick={() => setCurrentStep('welcome')}
                  className="px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                  <button 
                    disabled={!isProfileComplete}
                    onClick={() => setCurrentStep('photo')}
                    className={`px-12 py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                      isProfileComplete 
                      ? 'bg-[#61DAFB] text-black hover:scale-105' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                    }`}
                  >
                    Next: Photo Upload
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 'photo' && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-3xl space-y-8"
              >
                 <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase flex items-center gap-4">
                    <Camera className="text-[#61DAFB]" /> Visual Data
                  </h2>
                  <p className="text-white/40 font-serif italic">전신 사진 혹인 정면 사진을 업로드해 스타일을 분석합니다.</p>
                </div>

                <div className="flex gap-8">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-64 h-80 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-4 hover:border-[#61DAFB]/50 hover:bg-white/5 transition-all cursor-pointer group"
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      ref={fileInputRef} 
                      onChange={handleImageUpload}
                    />
                    {userData.image ? (
                        <div className="relative w-full h-full p-2">
                           <img src={userData.image} alt="Profile" className="w-full h-full object-cover rounded-sm" referrerPolicy="no-referrer" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-sm">
                             <Upload className="text-white w-8 h-8" />
                           </div>
                        </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#61DAFB]/10">
                          <Plus className="text-white/20 group-hover:text-[#61DAFB]" />
                        </div>
                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-white/30 group-hover:text-[#61DAFB]">Upload Photo</span>
                      </>
                    )}
                  </div>

                  <div className="flex-1 space-y-6 flex flex-col justify-center">
                    <div className="bg-white/5 p-6 rounded-sm border border-white/10 space-y-4">
                      <div className="flex justify-between items-center text-[0.65rem] uppercase tracking-widest font-bold">
                        <span className="text-white/40">Status</span>
                        <span className={userData.image ? "text-[#61DAFB]" : "text-white/20"}>
                          {userData.image ? "READY FOR ANALYSIS" : "AWAITING MEDIA"}
                        </span>
                      </div>
                      <div className="h-[2px] bg-white/5 w-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#61DAFB]"
                          initial={{ width: 0 }}
                          animate={{ width: userData.image ? "100%" : "0%" }}
                        />
                      </div>
                    </div>

                    <p className="text-[0.7rem] text-white/40 leading-relaxed italic font-serif">
                      * 사진은 스타일 분석 목적으로만 사용되며 안전하게 처리됩니다. 가능한 한 체형이 잘 보이는 사진이 유리합니다.
                    </p>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setCurrentStep('profile')}
                        className="px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button 
                        disabled={!userData.image}
                        onClick={startAnalysis}
                        className={`px-12 py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                          userData.image 
                          ? 'bg-[#61DAFB] text-black hover:scale-105 shadow-[0_0_30px_rgba(97,218,251,0.2)]' 
                          : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        Complete & Start Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'analyzing' && (
               <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="relative">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-[#61DAFB]/20 border-t-[#61DAFB] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles className="text-[#61DAFB] w-10 h-10 animate-bounce" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-widest">Analyzing Your <span className="text-[#61DAFB]">Vibe</span></h2>
                  <p className="text-white/40 font-serif italic max-w-md mx-auto">
                    Gemini AI가 당신의 신체 비율과 스타일 요소를 정밀 분석 중입니다. <br/>잠시만 기다려 주세요...
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 'result' && stylingResult && (
               <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-h-full overflow-y-auto pr-6 space-y-10 custom-scrollbar"
              >
                <div className="space-y-2">
                  <div className="text-[0.7rem] uppercase tracking-[3px] text-[#61DAFB] font-black flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> ANALYSIS COMPLETE
                  </div>
                  <h2 className="text-5xl font-black uppercase">Your Styling <span className="text-[#61DAFB]">Report</span></h2>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                   <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-3">
                     <User className="text-[#61DAFB] w-5 h-5" /> Body Analysis
                   </h3>
                   <p className="text-white/80 leading-relaxed font-serif italic text-lg border-l-2 border-[#61DAFB] pl-6">
                      {stylingResult.analysis}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-3">
                        <Shirt className="text-[#61DAFB] w-5 h-5" /> Recommendations
                      </h3>
                      <div className="space-y-3">
                         {stylingResult.recommendations.map((item, i) => (
                           <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 p-4 border border-white/10 flex items-center gap-4 hover:border-[#61DAFB]/30 transition-colors"
                           >
                              <div className="w-8 h-8 rounded-full bg-[#61DAFB]/10 flex items-center justify-center text-[0.6rem] font-black text-[#61DAFB]">0{i+1}</div>
                              <span className="text-sm font-medium">{item}</span>
                           </motion.div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-3">
                        <Lightbulb className="text-[#61DAFB] w-5 h-5" /> Styling Tips
                      </h3>
                      <div className="space-y-3">
                         {stylingResult.tips.map((tip, i) => (
                           <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 p-4 border border-white/10 flex items-start gap-4 hover:border-[#61DAFB]/30 transition-colors"
                           >
                              <Check className="text-[#61DAFB] w-4 h-4 mt-1 shrink-0" />
                              <p className="text-[0.8rem] text-white/60 leading-relaxed">{tip}</p>
                           </motion.div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="pt-10 flex gap-6">
                   <button 
                    onClick={() => {
                       setUserData({ height: '', weight: '', image: null });
                       setStylingResult(null);
                       setCurrentStep('welcome');
                    }}
                    className="border border-white/20 px-10 py-3 rounded-full font-black uppercase text-xs tracking-wider hover:border-[#61DAFB] transition-colors"
                   >
                     New Analysis
                   </button>
                   <button className="bg-[#61DAFB] text-[#000] px-10 py-3 rounded-full font-black uppercase text-xs tracking-wider hover:scale-105 transition-transform">
                     Save Report
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
          <span className="text-[0.6rem] uppercase tracking-widest text-[#61DAFB] font-bold mb-4 block underline underline-offset-4 decoration-1">AI_PARAMETERS</span>
          <div className="space-y-4">
             <div className="flex justify-between">
                <span className="text-[0.6rem] uppercase text-white/40">BM_INDEX</span>
                <span className="text-[0.65rem] text-[#61DAFB] font-mono">{(userData.height && userData.weight) ? (Number(userData.weight) / ((Number(userData.height)/100)**2)).toFixed(1) : "0.0"}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-[0.6rem] uppercase text-white/40">STYLE_VECTOR</span>
                <span className="text-[0.65rem] text-white/80 font-mono">
                  {currentStep === 'result' ? "MATCHED" : "NEUTRAL"}
                </span>
             </div>
             <div className="flex justify-between">
                <span className="text-[0.6rem] uppercase text-white/40">AI_ENGINE</span>
                <span className="text-[0.65rem] text-white/80 font-mono italic">GEMINI_1.5_PRO</span>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#61DAFB]/5 blur-2xl rounded-full" />
        </div>

        <div className="flex flex-col gap-8 mt-auto">
          {[
            { value: isAnalyzing ? "..." : (stylingResult ? "1.2s" : "48s"), label: "Processing Latency" },
            { value: "12k", label: "Style Database" },
            { value: "98%", label: "Accuracy Rate" }
          ].map((stat, i) => (
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
          // ARTIFICIAL INTELLIGENCE STYLING //
        </div>
        <div className="flex items-center gap-10">
          <div className="text-[0.6rem] text-white/20 font-bold tracking-tighter uppercase italic">
            YOUR PRIVACY IS OUR CONCERN // ENCRYPTED
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => {
              const steps: StepType[] = ['welcome', 'profile', 'photo', 'result'];
              return (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${steps.indexOf(currentStep) >= i - 1 ? "bg-[#61DAFB]" : "bg-white/10"}`} />
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
