
import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Calculator, 
  Activity, 
  Crown, 
  Rocket, 
  Home, 
  Briefcase, 
  Zap, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  TrendingUp,
  FileText,
  BookOpen,
  Coffee,
  ShoppingBag,
  Ticket,
  Utensils,
  Newspaper,
  GlassWater,
  Target,
  Lightbulb,
  ArrowRight,
  Tv,
  Stethoscope,
  Info,
  Scale,
  Mic,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { 
  CAPITALS, 
  DURATIONS, 
  INJURIES, 
  FAQS, 
  COMMERCIAL_STRATEGIES,
  STORY_CASES,
  PREMIUM_DATA,
  ELIGIBILITY_RULES,
  MEDICAL_QUESTIONS,
  OBLIO_ALLEGATO_1
} from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calc' | 'lesioni' | 'coach' | 'info' | 'storytelling' | 'prescreening'>('coach');
  const [selectedStrategy, setSelectedStrategy] = useState<number>(0);
  const [age, setAge] = useState(40);
  const [isSmoker, setIsSmoker] = useState(false);
  const [capital, setCapital] = useState(100000);
  const [duration, setDuration] = useState(10);
  const [searchInjury, setSearchInjury] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Pre-screening states
  const [weight, setWeight] = useState<string>('75');
  const [height, setHeight] = useState<string>('175');
  const [medAnswers, setMedAnswers] = useState<Record<number, boolean>>({3: false, 4: false, 5: false});

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return 0;
    return w / (h * h);
  }, [weight, height]);

  const isBmiOk = bmi >= 16 && bmi <= 35;
  const hasMedicalIssues = Object.values(medAnswers).some(v => v === true);
  const isEligible = isBmiOk && !hasMedicalIssues;

  const calculatedPremium = useMemo(() => {
    const capitalTable = PREMIUM_DATA[capital];
    if (!capitalTable) return null;
    const smokerTable = isSmoker ? capitalTable.F : capitalTable.NF;
    const agesAvailable = Object.keys(smokerTable).map(Number).sort((a, b) => a - b);
    const nearestAge = agesAvailable.find(a => a >= age) || agesAvailable[agesAvailable.length - 1];
    return smokerTable[nearestAge]?.[duration];
  }, [age, isSmoker, capital, duration]);

  const dailyCost = useMemo(() => calculatedPremium ? (calculatedPremium / 365) : 0, [calculatedPremium]);
  
  const dailyComparison = useMemo(() => {
    if (dailyCost === 0) return null;
    const comparisons = [
      { max: 0.50, label: "una bottiglia d'acqua", icon: GlassWater, color: 'text-blue-400', bg: 'bg-blue-50/50' },
      { max: 1.30, label: "un caffè al bar", icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-50/50' },
      { max: 1.80, label: "un quotidiano cartaceo", icon: Newspaper, color: 'text-slate-500', bg: 'bg-slate-100/50' },
      { max: 2.20, label: "un abbonamento Netflix/Spotify", icon: Tv, color: 'text-red-500', bg: 'bg-red-50/50' },
      { max: 3.50, label: "un biglietto bus/metro", icon: Ticket, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
      { max: 6.00, label: "una colazione completa", icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-50/50' },
      { max: Infinity, label: "un pranzo veloce", icon: ShoppingBag, color: 'text-indigo-500', bg: 'bg-indigo-50/50' }
    ];
    return comparisons.find(c => dailyCost <= c.max) || comparisons[comparisons.length - 1];
  }, [dailyCost]);

  const filteredInjuries = useMemo(() => {
    return INJURIES.filter(i => 
      i.description.toLowerCase().includes(searchInjury.toLowerCase()) || 
      i.category.toLowerCase().includes(searchInjury.toLowerCase())
    );
  }, [searchInjury]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1E293B]">
      {/* Header Advisor con Blur moderno */}
      <header className="bg-[#003399]/95 backdrop-blur-md text-white sticky top-0 z-50 shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('coach')}>
            <div className="bg-white p-2.5 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Shield className="text-[#003399]" size={30} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-white">Smart Protection</h1>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1 opacity-80">Advisor Dashboard</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex bg-white/10 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'coach', label: 'Coach Vendita', icon: Crown },
              { id: 'prescreening', label: 'Pre-screening', icon: Stethoscope },
              { id: 'storytelling', label: 'Storytelling', icon: BookOpen },
              { id: 'calc', label: 'Preventivatore', icon: Calculator },
              { id: 'lesioni', label: 'Indennizzi', icon: Activity },
              { id: 'info', label: 'Knowledge', icon: FileText }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-500 ${activeTab === t.id ? 'bg-white text-[#003399] shadow-xl scale-105' : 'text-blue-50 hover:bg-white/5'}`}
              >
                <t.icon size={18} /> {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="lg:hidden flex overflow-x-auto bg-[#003399] px-4 py-3 gap-3 scrollbar-hide border-b border-white/10 sticky top-[68px] md:top-[80px] z-40 shadow-lg">
        {[
          { id: 'coach', label: 'Coach', icon: Crown },
          { id: 'prescreening', label: 'Medical', icon: Stethoscope },
          { id: 'storytelling', label: 'Storie', icon: BookOpen },
          { id: 'calc', label: 'Prev.', icon: Calculator },
          { id: 'lesioni', label: 'Lesioni', icon: Activity },
          { id: 'info', label: 'FAQ', icon: FileText }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black shrink-0 transition-all duration-300 ${activeTab === t.id ? 'bg-white text-[#003399] shadow-lg' : 'text-blue-100 bg-white/5'}`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 lg:p-12">
        
        {/* TAB: COACH VENDITA - Potenziato */}
        {activeTab === 'coach' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="space-y-8">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-[#003399] text-[10px] font-black uppercase rounded-full tracking-[0.2em] shadow-sm">
                  <Sparkles size={14} className="text-orange-500" /> Advisor Sales Intelligence
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                  Dashboard del Coach
                </h2>
                <p className="text-lg text-slate-500 font-medium italic">Seleziona un segmento per sbloccare le tecniche di vendita e la gestione obiezioni.</p>
              </div>

              {/* Segment Selection */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {COMMERCIAL_STRATEGIES.map((strat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStrategy(idx)}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 text-left relative overflow-hidden group ${selectedStrategy === idx ? 'bg-[#003399] border-[#003399] text-white shadow-2xl scale-[1.03]' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:shadow-xl'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-6 ${selectedStrategy === idx ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                       {idx === 0 ? <Home size={28} /> : idx === 1 ? <Briefcase size={28} /> : idx === 2 ? <Rocket size={28} /> : <TrendingUp size={28} />}
                    </div>
                    <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${selectedStrategy === idx ? 'text-blue-200' : 'text-slate-400'}`}>Segmento</h4>
                    <p className={`text-lg font-black leading-tight ${selectedStrategy === idx ? 'text-white' : 'text-slate-900'}`}>{strat.segment}</p>
                    {selectedStrategy === idx && <div className="absolute top-4 right-4 animate-ping bg-blue-400 w-2 h-2 rounded-full opacity-75" />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Hooks & Objections */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Elevator Pitch Card */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <Mic className="absolute right-8 top-8 opacity-10" size={120} />
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Sparkles size={20} className="text-yellow-300" />
                         </div>
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-100">Gancio di Apertura (Pitch)</h3>
                      </div>
                      <p className="text-2xl font-black leading-tight tracking-tight italic">
                        "{COMMERCIAL_STRATEGIES[selectedStrategy].elevatorPitch}"
                      </p>
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest bg-black/10 inline-block px-4 py-2 rounded-lg">
                        USALO PER: Incuriosire il cliente nei primi 60 secondi
                      </p>
                    </div>
                  </div>

                  {/* Objection Handling Box */}
                  <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-slate-100 space-y-10">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tight">
                        <MessageSquare className="text-indigo-500" size={32} /> Objection Buster
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">Tactical Support</span>
                    </div>
                    
                    <div className="grid gap-8">
                      {COMMERCIAL_STRATEGIES[selectedStrategy].objections.map((obj, i) => (
                        <div key={i} className="group space-y-4">
                           <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0 mt-1">?</div>
                              <p className="text-lg font-black text-slate-800 italic leading-tight">"{obj.doubt}"</p>
                           </div>
                           <div className="bg-[#F8FAFC] p-8 rounded-[2.5rem] border-l-8 border-indigo-600 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                              <div className="flex items-center gap-2 mb-3">
                                 <ShieldCheck size={18} className="text-indigo-600" />
                                 <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Risposta Consigliata</span>
                              </div>
                              <p className="text-base font-medium text-slate-600 leading-relaxed">{obj.answer}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Tactics & Benefits */}
                <div className="lg:col-span-4 space-y-8">
                   <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-100">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.4em] mb-10 flex items-center gap-3">
                        <Target size={22} className="text-blue-500" /> Tactics & Needs
                      </h3>
                      <div className="space-y-8">
                        {COMMERCIAL_STRATEGIES[selectedStrategy].strategies.map((s, i) => (
                          <div key={i} className="space-y-2">
                             <h5 className="text-sm font-black text-[#003399] uppercase tracking-widest">{s.title}</h5>
                             <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{s.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 pt-8 border-t border-slate-100">
                         <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">Bisogni Chiave</h4>
                         <div className="flex flex-wrap gap-2">
                            {COMMERCIAL_STRATEGIES[selectedStrategy].needs.map(n => (
                              <span key={n} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg">{n}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="bg-gradient-to-br from-[#1A202C] to-[#2D3748] rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />
                      <h3 className="text-xs font-black uppercase text-emerald-400 tracking-[0.4em] mb-10 flex items-center gap-3">
                        <Zap size={22} fill="currentColor" /> Vantaggi Prodotto
                      </h3>
                      <div className="space-y-6">
                        {COMMERCIAL_STRATEGIES[selectedStrategy].keyBenefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-5 group">
                             <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-black shrink-0">0{i+1}</div>
                             <p className="text-sm font-bold text-slate-200 leading-snug pt-1">{b}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: PRE-SCREENING */}
        {activeTab === 'prescreening' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-12">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                  <div className="bg-blue-50 p-3 rounded-2xl">
                    <Stethoscope className="text-[#003399]" size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Pre-screening Medico</h2>
                    <p className="text-sm text-slate-500 font-medium">Verifica immediata dell'assumibilità del cliente.</p>
                  </div>
                </div>

                {/* BMI Calculator */}
                <div className="space-y-8">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><Scale size={24} className="text-blue-500" /> Calcolo BMI (Target: 16-35)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Peso (kg)</label>
                      <input 
                        type="number" 
                        value={weight} 
                        onChange={e => setWeight(e.target.value)}
                        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-black text-xl text-slate-700"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Altezza (cm)</label>
                      <input 
                        type="number" 
                        value={height} 
                        onChange={e => setHeight(e.target.value)}
                        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-black text-xl text-slate-700"
                      />
                    </div>
                  </div>
                  <div className={`p-8 rounded-[2rem] flex flex-col items-center justify-center border-2 transition-all duration-500 ${isBmiOk ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-2">Risultato BMI</span>
                    <span className={`text-6xl font-black ${isBmiOk ? 'text-emerald-600' : 'text-red-600'}`}>{bmi.toFixed(1)}</span>
                    <p className={`mt-4 text-sm font-bold ${isBmiOk ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isBmiOk ? '✓ Range conforme (16-35)' : '⚠ Range non conforme (Richiesto 16-35)'}
                    </p>
                  </div>
                </div>

                {/* Medical Checklist */}
                <div className="space-y-8">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><CheckCircle2 size={24} className="text-blue-500" /> Checklist Assuntiva (Ultimi 10 anni)</h3>
                  <div className="space-y-4">
                    {MEDICAL_QUESTIONS.map(q => (
                      <div key={q.id} className={`p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between gap-6 ${medAnswers[q.id] ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}>
                        <p className="text-sm font-bold text-slate-700 leading-relaxed">{q.text}</p>
                        <div className="flex bg-white p-1 rounded-xl shadow-inner shrink-0">
                          <button 
                            onClick={() => setMedAnswers({...medAnswers, [q.id]: false})}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${!medAnswers[q.id] ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
                          >No</button>
                          <button 
                            onClick={() => setMedAnswers({...medAnswers, [q.id]: true})}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${medAnswers[q.id] ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}
                          >Sì</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className={`p-10 rounded-[3.5rem] shadow-2xl flex flex-col items-center text-center transition-all duration-700 ${isEligible ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {isEligible ? <CheckCircle2 size={80} className="mb-6 animate-subtle-bounce" /> : <AlertCircle size={80} className="mb-6 animate-pulse" />}
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                  {isEligible ? 'Cliente Assumibile' : 'Rischio Non Accettabile'}
                </h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  {isEligible 
                    ? "Il cliente soddisfa i requisiti del Questionario Medico Semplificato e può sottoscrivere la polizza immediatamente."
                    : "Sulla base delle risposte fornite, Zurich non può accettare il rischio tramite procedura semplificata."}
                </p>
              </div>

              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-blue-50 space-y-6">
                <h4 className="text-xs font-black uppercase text-[#003399] tracking-widest flex items-center gap-2">
                  <Info size={16} /> Oblio Oncologico
                </h4>
                <p className="text-xs text-slate-500 font-medium italic">
                  Diritto di non fornire informazioni su patologie oncologiche guarite da oltre 10 anni (5 se insorte prima dei 21).
                </p>
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">Termini ridotti (Allegato 1):</p>
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 scrollbar-hide">
                    {OBLIO_ALLEGATO_1.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px] font-bold p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">{item.path}</span>
                        <span className="text-blue-600 shrink-0">{item.term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: STORYTELLING */}
        {activeTab === 'storytelling' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {STORY_CASES.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-l-[16px] border-l-[#003399]">
                   <div className="flex flex-wrap gap-2 mb-8">
                      {caseStudy.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-blue-50 text-[#003399] text-[10px] font-black uppercase rounded-xl tracking-widest">{tag}</span>
                      ))}
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-[0.9]">{caseStudy.title}</h3>
                   <div className="space-y-8 flex-1">
                      <div className="space-y-2">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Lo Scenario</h4>
                         <p className="text-base font-medium text-slate-700 leading-relaxed">{caseStudy.scenario}</p>
                      </div>
                      <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                         <h4 className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">L'Evento</h4>
                         <p className="text-base font-black text-slate-900 italic">"{caseStudy.event}"</p>
                      </div>
                      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-inner">
                         <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-2">L'Impatto Zurich</h4>
                         <p className="text-base font-bold text-slate-800 leading-relaxed">{caseStudy.benefit}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PREVENTIVATORE */}
        {activeTab === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-10">
              <section className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
                    <Calculator className="text-[#003399]" size={32} /> Calcolo Premio
                  </h2>
                  <div className="flex bg-[#F1F5F9] p-2 rounded-2xl border border-slate-200 shadow-inner">
                    <button onClick={() => setIsSmoker(false)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all duration-300 ${!isSmoker ? 'bg-white text-[#003399] shadow-lg scale-105' : 'text-slate-400'}`}>Non Fumatore</button>
                    <button onClick={() => setIsSmoker(true)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all duration-300 ${isSmoker ? 'bg-white text-orange-600 shadow-lg scale-105' : 'text-slate-400'}`}>Fumatore</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] flex items-center justify-between">
                        Età <span className="text-[#003399] text-2xl font-black">{age} anni</span>
                      </label>
                      <input type="range" min="30" max="70" step="5" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#003399]" />
                    </div>
                    <div className="space-y-6">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Capitale</label>
                      <div className="grid grid-cols-3 gap-4">
                        {CAPITALS.map(c => (
                          <button key={c} onClick={() => setCapital(c)} className={`py-5 rounded-2xl text-[13px] font-black border-2 transition-all duration-300 ${capital === c ? 'border-[#003399] bg-[#F0F7FF] text-[#003399] shadow-md scale-105' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}>
                            {c/1000}k €
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Durata</label>
                      <div className="grid grid-cols-4 gap-4">
                        {DURATIONS.map(d => (
                          <button key={d} onClick={() => setDuration(d)} className={`py-5 rounded-2xl text-[13px] font-black border-2 transition-all duration-300 ${duration === d ? 'border-[#003399] bg-[#F0F7FF] text-[#003399] shadow-md scale-105' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}>
                            {d}y
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#F8FAFC] p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                      <ul className="space-y-5">
                        {["Indennizzo Cash Lesioni", "Zero Visite Mediche", "Premio Bloccato", "Frazionamento 0%"].map((txt, i) => (
                          <li key={i} className="flex items-center gap-4 text-xs font-bold text-slate-600">
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> {txt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-blue-50 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 text-center">Investimento Annuo</p>
                  {calculatedPremium ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline gap-2 mb-10 transition-transform duration-500 group-hover:scale-110">
                        <span className="text-7xl font-black text-slate-900 tracking-tighter">{calculatedPremium.toLocaleString('it-IT')}</span>
                        <span className="text-3xl font-black text-[#003399]">€</span>
                      </div>
                      
                      <div className="w-full space-y-5">
                        <div className="bg-[#1A202C] rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]" />
                           <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-blue-400 tracking-[0.3em]">Costo al giorno</p>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-5xl font-black text-white">€ {dailyCost.toFixed(2)}</span>
                                  <span className="text-sm font-medium text-slate-500">/die</span>
                                </div>
                              </div>
                              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 animate-pulse">
                                <ArrowRight className="text-blue-400" />
                              </div>
                           </div>

                           {dailyComparison && (
                            <div className={`p-6 rounded-3xl ${dailyComparison.bg} flex items-center gap-5 border border-white/5 transition-all duration-500 hover:scale-105`}>
                              <div className={`w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center ${dailyComparison.color}`}>
                                <dailyComparison.icon size={36} strokeWidth={2.5} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Meno di...</p>
                                <p className={`text-lg font-black italic leading-tight ${dailyComparison.color}`}>{dailyComparison.label}</p>
                              </div>
                            </div>
                           )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] font-black uppercase text-slate-400 mb-2">Mese</span>
                            <span className="text-xl font-black text-[#003399]">€ {(calculatedPremium/12).toFixed(2)}</span>
                          </div>
                          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] font-black uppercase text-emerald-600 mb-2">Recupero</span>
                            <span className="text-xl font-black text-emerald-700">€ {(Math.min(calculatedPremium, 530) * 0.19).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-24 flex flex-col items-center gap-6 text-orange-400">
                      <AlertCircle size={80} className="animate-pulse" />
                      <p className="text-lg font-black uppercase tracking-widest">Fuori Tabella</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRONTUARIO LESIONI */}
        {activeTab === 'lesioni' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
            <div className="max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Allegato Lesioni</h2>
                <p className="text-xl text-slate-500 font-medium italic">Soldi veri. Referto immediato. Zero burocrazia.</p>
              </div>
              <div className="relative w-full md:w-[450px] group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#003399] transition-colors" size={28} />
                <input 
                  type="text" 
                  placeholder="Cerca trauma o categoria..." 
                  className="w-full pl-16 pr-8 py-6 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl outline-none font-bold text-lg focus:border-[#003399] focus:ring-4 focus:ring-blue-100 transition-all"
                  value={searchInjury}
                  onChange={e => setSearchInjury(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredInjuries.map(injury => (
                <div key={injury.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-md hover:-translate-y-3 transition-all duration-500 border-t-[10px] border-t-[#003399] flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{injury.category}</span>
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003399] flex items-center justify-center font-black text-sm shadow-inner group-hover:bg-[#003399] group-hover:text-white transition-colors duration-500">L{injury.level}</div>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-10 leading-tight group-hover:text-[#003399] transition-colors">{injury.description}</h4>
                  </div>
                  <div className="pt-8 border-t-2 border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] block mb-1">Indennizzo Cash</span>
                    <span className="text-3xl font-black text-[#003399]">€ {injury.amount.toLocaleString('it-IT')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INFO / FAQ */}
        {activeTab === 'info' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24">
            {/* Eligibility Summary from PDF */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3"><Info className="text-blue-600" /> Assumibilità e Modalità Assuntive</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residenza</h5>
                  <p className="text-sm font-bold text-slate-700">{ELIGIBILITY_RULES.residency}</p>
                </div>
                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Età Assicurativa</h5>
                  <p className="text-sm font-bold text-slate-700">{ELIGIBILITY_RULES.ageRange}</p>
                </div>
                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-500">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requisiti</h5>
                  <p className="text-sm font-bold text-slate-700">Questionario Medico Semplificato (fino a 250k €).</p>
                </div>
              </div>
            </section>

            <div className="grid gap-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-10 text-left flex items-center justify-between gap-8 hover:bg-slate-50 transition-colors">
                    <h4 className="text-xl font-black text-slate-800 leading-[1.1] uppercase tracking-tight">{faq.question}</h4>
                    <div className={`p-3 rounded-full bg-blue-50 text-[#003399] transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-[#003399] text-white' : ''}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="px-10 pb-10 pt-4 bg-[#F8FAFC] border-t-2 border-slate-50 animate-in slide-in-from-top-4 duration-500">
                      <p className="text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-blue-400 pl-8">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer Advisor */}
      <footer className="bg-white border-t border-slate-200 py-16 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#003399] rounded-[1.5rem] flex items-center justify-center text-white font-black italic text-4xl shadow-2xl">Z</div>
            <div>
              <p className="text-lg font-black uppercase text-slate-900 tracking-tighter">Advisor Portal v5.1</p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1 italic">Vomero Unit - Intelligence Center</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
             <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest text-center">© 2025 Riservato Advisor - Gruppo Vomero Unit</p>
             <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-bold text-emerald-600 uppercase">Dati aggiornati Gennaio 2026</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
