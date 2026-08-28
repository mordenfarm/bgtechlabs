import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# 1. Update Imports
if 'html2canvas' not in content:
    content = content.replace(
        "import QRCode from 'react-qr-code';",
        "import QRCode from 'react-qr-code';\nimport Barcode from 'react-barcode';\nimport html2canvas from 'html2canvas';"
    )
    content = content.replace(
        "import { QrCode, UserPlus, Users, ChevronLeft, ChevronRight } from 'lucide-react';",
        "import { QrCode, UserPlus, Users, ChevronLeft, ChevronRight, Download, Repeat, MapPin, User, Shield, GraduationCap } from 'lucide-react';"
    )

# 2. State & Hooks Injection
state_injection = """  const [showingBack, setShowingBack] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (cardContainerRef.current) {
        const containerWidth = cardContainerRef.current.clientWidth;
        // 800px is our target width. Scale it down if the container is smaller.
        const scale = Math.min(1, (containerWidth - 32) / 800);
        setCardScale(scale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [newlyAddedStudent, showingBack]);

  const downloadID = async () => {
    const element = document.getElementById(showingBack ? 'id-card-back' : 'id-card-front');
    if (!element || !newlyAddedStudent) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 3, backgroundColor: null, useCORS: true });
      const link = document.createElement('a');
      link.download = `student-id-${newlyAddedStudent.slug}-${showingBack ? 'back' : 'front'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Failed to download", err);
    }
    setIsDownloading(false);
  };"""

content = re.sub(
    r'const \[isFlipped, setIsFlipped\] = useState\(false\);',
    state_injection,
    content
)

# 3. New Landscape Card View
new_card_view = """          {/* Newly Added Student ID View */}
          {activeTab === 'add' && newlyAddedStudent && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
              
              {/* Controls */}
              <div className="flex gap-3 sm:gap-4 mb-6">
                <button 
                  onClick={() => setShowingBack(!showingBack)} 
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold px-3 sm:px-4 py-2 rounded-[9px] shadow-sm hover:bg-gray-50 transition-colors text-sm"
                >
                  <Repeat className="w-4 h-4" />
                  {showingBack ? 'See Front' : 'See Back'}
                </button>
                <button 
                  onClick={downloadID}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 sm:px-4 py-2 rounded-[9px] shadow-sm transition-colors disabled:opacity-50 text-sm"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Downloading...' : 'Download HD'}
                </button>
              </div>

              {/* Card Container for Scaling */}
              <div ref={cardContainerRef} className="w-full flex justify-center max-w-[800px] overflow-hidden" style={{ height: `${506 * cardScale}px` }}>
                
                <div 
                  className="relative origin-top transition-transform duration-300"
                  style={{ width: '800px', height: '506px', transform: `scale(${cardScale})` }}
                >
                  {/* FRONT OF CARD */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-[#f8f9fa] rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
                      {/* Top Header Swoosh */}
                      <div className="relative w-full h-[120px] shrink-0 bg-[#1e293b]">
                        <svg width="100%" height="130" viewBox="0 0 1000 130" preserveAspectRatio="none" className="absolute top-0 left-0 z-0">
                          <path d="M0,0 L1000,0 L1000,100 Q500,150 0,70 Z" fill="#16a34a"/>
                          <path d="M0,0 L1000,0 L1000,90 Q500,140 0,60 Z" fill="#4c1d95"/>
                        </svg>
                        
                        {/* Lanyard Hole */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/20 rounded-full border border-white/40 shadow-inner z-10"></div>
                        
                        <div className="absolute inset-0 px-8 py-5 flex justify-between items-start z-10">
                          <div className="flex items-center gap-4">
                            <img src="/defineddomain.png" alt="Logo" className="w-16 h-16 object-contain bg-white rounded-full p-1 shadow-md border-2 border-[#16a34a]" />
                            <div className="flex flex-col text-white">
                              <h2 className="text-3xl font-black uppercase tracking-widest leading-none drop-shadow-md">Defined Domains</h2>
                              <p className="text-[13px] font-bold tracking-[0.2em] text-[#4ade80] uppercase mt-1">Inclusive School</p>
                              <p className="text-[10px] text-gray-200 mt-0.5 italic tracking-wider">Investing in Education, Building the Future</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-white pt-2">
                            <div className="flex items-center gap-2 text-[#4ade80]">
                              <Shield className="w-8 h-8" />
                              <div className="flex flex-col text-right">
                                <span className="font-bold text-xs uppercase tracking-widest leading-tight">Verified</span>
                                <span className="font-bold text-xs uppercase tracking-widest leading-tight">& Secured</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Body */}
                      <div className="flex-1 flex relative">
                        {/* Background Watermark */}
                        <img src="/defineddomain.png" alt="watermark" className="absolute right-12 top-1/2 -translate-y-1/2 w-[350px] opacity-5 grayscale pointer-events-none" />
                        
                        {/* Left Column (Photo & ID) */}
                        <div className="w-[35%] p-6 pl-8 flex flex-col items-center">
                          <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-4 border-white shadow-lg relative">
                            {newlyAddedStudent.image ? (
                              <img src={newlyAddedStudent.image} alt={newlyAddedStudent.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">NO IMAGE</div>
                            )}
                          </div>
                          <div className="w-full bg-[#1e293b] text-white rounded-lg mt-4 p-3 flex flex-col items-center shadow-md">
                            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-1">Student ID</span>
                            <span className="text-base font-bold text-[#4ade80] tracking-wider font-mono">{newlyAddedStudent.slug.split('-')[0].toUpperCase()}</span>
                            <div className="w-full mt-2 bg-white rounded flex justify-center py-1">
                              <Barcode value={newlyAddedStudent.slug.split('-')[0].toUpperCase()} width={1.5} height={30} displayValue={false} margin={0} background="transparent" />
                            </div>
                          </div>
                        </div>

                        {/* Right Column (Details) */}
                        <div className="w-[65%] p-6 pr-8 pl-0 flex flex-col">
                          <h1 className="text-4xl font-black text-[#1e293b] uppercase tracking-tight leading-none mb-1">
                            {newlyAddedStudent.name} {newlyAddedStudent.surname}
                          </h1>
                          <p className="text-lg font-bold text-[#16a34a] uppercase tracking-widest border-b-2 border-gray-200 pb-3 mb-4">
                            Grade — {newlyAddedStudent.grade}
                          </p>
                          
                          <div className="space-y-4 flex-1">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                                <MapPin className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Address</p>
                                <p className="text-[13px] font-medium text-gray-600 leading-tight mt-0.5">{newlyAddedStudent.address}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                                <GraduationCap className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Status</p>
                                <p className="text-[13px] font-medium text-gray-600 leading-tight mt-0.5">Active Student – Inclusive School Full Access</p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row */}
                          <div className="flex justify-between items-end mt-4">
                            <div className="flex flex-col items-center">
                              <p className="text-2xl font-['Brush_Script_MT',cursive,serif] text-[#1e293b] mb-1 italic px-4">Defined Domains</p>
                              <div className="w-48 border-t border-gray-400"></div>
                              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1 tracking-widest">Authorized Signature</p>
                            </div>
                            <div className="flex flex-col pb-1">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valid Until</p>
                              <p className="text-sm font-bold text-[#1e293b] tracking-wider">{newlyAddedStudent.expiryDate}</p>
                            </div>
                            <div className="flex flex-col items-center bg-white p-2 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200">
                              <QRCode value={`https://blackgiftlabs.com/defined-domains/${newlyAddedStudent.slug}`} size={70} fgColor="#1e293b" />
                              <span className="text-[8px] bg-[#16a34a] text-white px-2 py-0.5 rounded-sm font-bold uppercase mt-2 tracking-widest">Scan to Verify</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Bar */}
                      <div className="h-[36px] bg-[#1e293b] flex items-center justify-center gap-6 text-white text-[11px] font-bold tracking-[0.3em] uppercase shrink-0">
                        <span>Integrity</span>
                        <span className="text-[#16a34a]">•</span>
                        <span>Empowerment</span>
                        <span className="text-[#16a34a]">•</span>
                        <span>Education</span>
                        <span className="text-[#16a34a]">•</span>
                        <span>Growth</span>
                      </div>
                    </div>
                  )}

                  {/* BACK OF CARD */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-[#f8f9fa] rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
                      <div className="relative w-full h-[110px] shrink-0 bg-[#1e293b]">
                        <svg width="100%" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute top-0 left-0 z-0">
                          <path d="M0,0 L1000,0 L1000,80 Q500,120 0,50 Z" fill="#16a34a"/>
                          <path d="M0,0 L1000,0 L1000,70 Q500,110 0,40 Z" fill="#4c1d95"/>
                        </svg>
                        
                        {/* Lanyard Hole */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/20 rounded-full border border-white/40 shadow-inner z-10"></div>
                        
                        <div className="absolute inset-0 p-6 flex justify-center items-start z-10">
                          <div className="flex items-center gap-4 mt-2">
                            <img src="/defineddomain.png" alt="Logo" className="w-12 h-12 object-contain bg-white rounded-full p-1 shadow-sm" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-widest leading-none drop-shadow-md">Defined Domains</h2>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-8 flex flex-col items-center relative z-10">
                        <img src="/defineddomain.png" alt="watermark" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] opacity-[0.03] grayscale pointer-events-none" />

                        <h3 className="text-3xl font-black text-red-600 uppercase tracking-widest mb-8 border-b-4 border-red-200 pb-2">Skills Orientation</h3>
                        
                        <div className="w-full max-w-[650px] grid grid-cols-2 gap-x-10 gap-y-6">
                          {[
                            'Special Needs Education',
                            'Learning Disabilities',
                            'Behavior Modification',
                            'Individualised Educational Programes',
                            'Speech & Occupational Therapies',
                            'Basic Sign Language Training'
                          ].map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <span className="text-green-600 text-sm font-bold">✓</span>
                              </div>
                              <span className="text-sm font-bold text-[#1e293b] uppercase tracking-wider">{skill}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto w-full max-w-[700px] flex justify-between items-center bg-[#1e293b] text-white p-5 rounded-xl shadow-lg border-2 border-purple-900/50">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4c1d95] p-2.5 rounded-full"><MapPin className="w-5 h-5 text-green-300" /></div>
                            <span className="font-bold text-[13px] tracking-widest">24 ELIOT STREET, RHODENE, MASVINGO</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-[#16a34a] p-2.5 rounded-full"><User className="w-5 h-5 text-white" /></div>
                            <span className="font-bold text-[13px] tracking-widest">071 451 5323 | 0772 944 837</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button onClick={() => setNewlyAddedStudent(null)} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-2 rounded-[9px] bg-gray-100 border border-gray-300 transition-colors uppercase tracking-widest text-sm shadow-sm">
                  + Add Another Student
                </button>
              </div>
            </motion.div>
          )}"""

content = re.sub(
    r'\{\/\* Newly Added Student ID View \*\/\}.*?\{\/\* Student List Tab \*\/\}',
    new_card_view + '\n\n          {/* Student List Tab */}',
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
