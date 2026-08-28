import React, { useState, useEffect } from 'react';
import { Seo } from '../components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

type ProjectType = {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  tags?: string[];
};

const PROJECT_TYPES: ProjectType[] = [
  { id: 'static', name: 'Static Website', desc: '5-10 pages', basePrice: 120 },
  { id: 'dashboard', name: 'Dashboard', desc: 'Data & Analytics', basePrice: 100 },
  { id: 'fingerprint', name: 'Fingerprint', desc: 'Security systems', basePrice: 350 },
  { id: 'websystem', name: 'Web System', desc: 'Schools, Orgs...', basePrice: 1500 },
  { id: 'team-augmentation', name: 'Team Augmentation', desc: 'Experts on demand', basePrice: 800, tags: ['Cultural fit', 'Top 1%', 'Instant hire'] },
  { id: 'ai-development', name: 'AI Development', desc: 'ML, NLP, Vision', basePrice: 900, tags: ['LLM', 'Tensorflow', 'NLP', 'Computer vision'] },
  { id: 'frontend-development', name: 'Frontend Development', desc: 'Modern web apps', basePrice: 400, tags: ['React', 'Angular', 'Electron', 'Vue.js'] },
  { id: 'mobile-development', name: 'Mobile Development', desc: 'iOS & Android', basePrice: 600, tags: ['Swift', 'Flutter', 'Java', 'Kotlin', 'React Native'] },
  { id: 'backend-development', name: 'Backend Development', desc: 'High-load infra', basePrice: 500, tags: ['Node.js', 'Go', 'Python', 'PHP'] },
  { id: 'web-development', name: 'Web Development', desc: 'Bespoke CMS sites', basePrice: 350, tags: ['Sitecore', 'Contentful', 'Magento'] },
];

const ADDONS = [
  { id: 'seo', name: 'SEO Optimization', price: 150 },
  { id: 'maintenance', name: '1 Year Maintenance', price: 200 },
  { id: 'source', name: 'Source Files', price: 100 },
  { id: 'priority', name: 'Priority Support', price: 80 },
];

export function Estimate() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userbase, setUserbase] = useState<number>(100);
  const [projectType, setProjectType] = useState<string>('static');
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState<number>(0);

  const handleToggleAddon = (id: string) => {
    setAddons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    let newTotal = 0;
    const selectedProject = PROJECT_TYPES.find(p => p.id === projectType);
    
    if (selectedProject) {
      newTotal += selectedProject.basePrice;
      
      // Dynamic userbase pricing logic based on project type
      if (projectType === 'dashboard') {
        // Base is 100. Let's say every extra 100 users is $50
        if (userbase > 100) {
          newTotal += Math.floor((userbase - 100) / 100) * 50;
        }
      } else if (projectType === 'fingerprint') {
        // Base is 350 for up to 200 people.
        if (userbase > 200) {
          newTotal += Math.floor((userbase - 200) / 100) * 100;
        }
      }
    }

    ADDONS.forEach(addon => {
      if (addons.has(addon.id)) newTotal += addon.price;
    });

    if (billingCycle === 'yearly') {
      newTotal = newTotal * 12 * 0.8; // 20% discount for yearly
    }

    setTotal(Math.round(newTotal));
  }, [userbase, projectType, addons, billingCycle]);

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pt-28 pb-20 relative font-sans text-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <Seo title="Estimate Your Cost | Blackgift Tech Labs" description="Calculate the estimated cost of your next project." />

      <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-[40px] font-bold tracking-tight mb-12 text-center uppercase text-gray-900">
          Estimate Your Cost
        </h1>

        {/* Main Card */}
        <div className="w-full bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row overflow-hidden border border-gray-100">
          
          {/* Left Side: Controls */}
          <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col">
            
            {/* Toggle */}
            <div className="flex justify-end items-center mb-10 text-sm font-medium text-gray-500 gap-3">
              <span className={billingCycle === 'monthly' ? 'text-gray-900' : ''}>Monthly</span>
              <div 
                className="w-12 h-6 bg-gray-100 rounded-full relative cursor-pointer flex items-center p-1 border border-gray-200"
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              >
                <div className={`w-4 h-4 rounded-full bg-[#f50057] transition-all duration-300 shadow-sm ${billingCycle === 'yearly' ? 'ml-6' : 'ml-0'}`}></div>
              </div>
              <span className={billingCycle === 'yearly' ? 'text-gray-900' : ''}>Yearly</span>
            </div>

            {/* Userbase Slider */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-700 font-medium text-[15px]">Userbase / Scale</h3>
              </div>
              <div className="relative pt-6 pb-2">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50" 
                  value={userbase} 
                  onChange={(e) => setUserbase(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer outline-none absolute top-4 z-10"
                  style={{
                    background: `linear-gradient(to right, #f50057 0%, #f50057 ${(userbase / 1000) * 100}%, #e5e7eb ${(userbase / 1000) * 100}%, #e5e7eb 100%)`
                  }}
                />
                {/* Thumb pseudo styling requires CSS, doing inline style track above */}
                <style>{`
                  input[type=range]::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: #f50057;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 2px 6px rgba(245,0,87,0.3);
                  }
                `}</style>
                
                {/* Tooltip value */}
                <div 
                  className="absolute top-[-10px] -ml-4 w-8 text-center text-xs font-bold text-white bg-[#f50057] rounded-full py-1"
                  style={{ left: `${(userbase / 1000) * 100}%` }}
                >
                  {userbase}
                </div>
                
                {/* Scale markers */}
                <div className="flex justify-between text-xs text-gray-400 mt-4 font-medium">
                  <span>0</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            {/* Project Type */}
            <div className="mb-12">
              <h3 className="text-gray-700 font-medium text-[15px] mb-6">Project Type</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      projectType === type.id 
                        ? 'border-[#f50057] bg-pink-50/30' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <span className="text-lg font-bold text-gray-900 mb-1 leading-tight text-center">{type.name}</span>
                    <span className="text-[11px] text-gray-500 text-center mb-2">{type.desc}</span>
                    {type.tags && type.tags.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                        {type.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              projectType === type.id
                                ? 'bg-[#f50057]/10 text-[#f50057]'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-gray-700 font-medium text-[15px] mb-6">Add-Ons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {ADDONS.map((addon) => (
                  <label key={addon.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      addons.has(addon.id) ? 'border-[#f50057]' : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {addons.has(addon.id) && <div className="w-2.5 h-2.5 bg-[#f50057] rounded-full"></div>}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{addon.name}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Total Card */}
          <div className="w-full md:w-[340px] bg-[#f50057] text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shrink-0">
            {/* Subtle background glow/shape in the pink box */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center w-full">
              <h3 className="text-lg font-medium text-white/90 mb-6">
                Billed {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
              </h3>
              
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-4xl font-bold mr-1">$</span>
                <span className="text-[72px] font-black leading-none tracking-tighter">{total.toLocaleString()}</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 mb-10 w-full">
                {billingCycle === 'monthly' && (
                  <span className="text-xs text-white/90 font-medium bg-white/20 px-3 py-1 rounded-full">
                    (Save 20% on Yearly Plan)
                  </span>
                )}
                <span className="text-xs text-white/80">No Commitment! Cancel Any Time</span>
              </div>
              
              <Link 
                to="/contact" 
                className="w-full bg-white text-[#f50057] font-bold text-[15px] py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>
              
              <button className="mt-8 text-xs font-bold underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors">
                View Price Break Down
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}