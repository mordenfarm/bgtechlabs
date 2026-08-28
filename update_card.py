import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

new_card_view = """              {/* Card Container for Scaling */}
              <div ref={cardContainerRef} className="w-full flex justify-center max-w-[856px] overflow-hidden" style={{ height: `${540 * cardScale}px` }}>
                
                <div 
                  className="relative origin-top transition-transform duration-300"
                  style={{ width: '856px', height: '540px', transform: `scale(${cardScale})` }}
                >
                  {/* FRONT OF CARD (Professional Corporate Style) */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-white rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 flex font-sans">
                      <div className="w-4 h-full bg-[#1e293b] shrink-0 z-20 relative"></div>
                      <div className="flex-1 flex flex-col p-8 bg-[url('/defineddomain.png')] bg-no-repeat bg-[position:120%_50%] bg-[size:400px] relative">
                         <div className="absolute inset-0 bg-white/95 z-0"></div>
                         
                         <div className="relative z-10 flex flex-col h-full">
                             {/* Header */}
                             <div className="flex justify-between items-start border-b-2 border-gray-200 pb-5 mb-6">
                                <div className="flex items-center gap-5">
                                   <img src="/defineddomain.png" className="w-16 h-16 object-contain" />
                                   <div>
                                      <h2 className="text-3xl font-black text-[#1e293b] uppercase tracking-wider leading-none">Defined Domains</h2>
                                      <p className="text-sm font-bold text-[#16a34a] uppercase tracking-widest mt-1.5">Inclusive Educational Institute</p>
                                   </div>
                                </div>
                                <div className="text-right flex flex-col items-center">
                                   <div className="bg-white p-1.5 border border-gray-200 rounded-lg shadow-sm">
                                     <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={56} fgColor="#1e293b" />
                                   </div>
                                   <span className="text-[8px] font-bold uppercase mt-2 tracking-widest text-gray-500">Scan to Verify</span>
                                </div>
                             </div>

                             {/* Body */}
                             <div className="flex flex-1 gap-8">
                                <div className="w-[160px] flex flex-col gap-3 shrink-0">
                                   <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-300 shadow-sm relative">
                                      {newlyAddedStudent.image ? <img src={newlyAddedStudent.image} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">NO PHOTO</div>}
                                   </div>
                                   <div className="bg-[#1e293b] text-white text-center py-2 rounded-lg shadow-sm">
                                     <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Student ID</p>
                                     <p className="text-[13px] font-mono font-bold tracking-wider">{newlyAddedStudent.id.toUpperCase()}</p>
                                   </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                   <div className="mb-5">
                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student Name</p>
                                     <h3 className="text-4xl font-black text-[#1e293b] uppercase leading-none">{newlyAddedStudent.name} {newlyAddedStudent.surname}</h3>
                                   </div>
                                   
                                   <div className="mb-5">
                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grade</p>
                                     <p className="text-xl font-bold text-[#16a34a] uppercase leading-none">{newlyAddedStudent.grade}</p>
                                   </div>
                                   
                                   <div>
                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Home Address</p>
                                     <p className="text-sm font-bold text-gray-800 leading-snug max-w-sm">{newlyAddedStudent.address}</p>
                                   </div>
                                </div>
                             </div>

                             {/* Footer */}
                             <div className="flex justify-between items-end mt-4 pt-4 border-t-2 border-gray-200">
                                <div>
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Issue Date</p>
                                   <p className="text-sm font-bold text-gray-800">28 MAY 2024</p>
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valid Until</p>
                                   <p className="text-sm font-bold text-red-600">28 MAY 2026</p>
                                </div>
                                <div className="flex flex-col items-center pl-10">
                                   <p className="text-2xl font-['Brush_Script_MT',cursive,serif] text-[#1e293b] mb-1 italic">Def. Dom.</p>
                                   <div className="w-40 border-t border-gray-400"></div>
                                   <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Authorized Signature</p>
                                </div>
                             </div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* BACK OF CARD (Matching Reference Image) */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-white rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 flex flex-col font-sans">
                      
                      {/* Lanyard Hole for Back (Mirror position) */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/20 rounded-full border border-gray-300 shadow-inner z-20"></div>

                      {/* Angular Header Replica */}
                      <div className="w-full h-[120px] relative bg-white shrink-0">
                         <svg width="856" height="120" viewBox="0 0 856 120" className="absolute top-0 left-0 z-0">
                           <rect width="856" height="120" fill="#1e293b" />
                           <polygon points="530,0 500,80 520,80 490,120 475,120 505,80 485,80 515,0" fill="#ffffff" />
                         </svg>
                         
                         <div className="absolute inset-0 flex z-10">
                           <div className="w-[500px] flex items-center pl-12">
                              <span className="text-white text-xl font-bold tracking-[0.1em]">TERMS AND CONDITIONS</span>
                           </div>
                           <div className="flex-1 flex items-center justify-center gap-4 pl-8">
                              <img src="/defineddomain.png" className="w-14 h-14 bg-white rounded-md p-1 object-contain shadow-sm" />
                              <div className="text-white flex flex-col justify-center">
                                 <h3 className="font-extrabold text-xl leading-none tracking-wider">DEFINED DOMAINS</h3>
                                 <p className="text-[10px] tracking-widest text-gray-300 mt-1.5 uppercase font-bold">Inclusive School</p>
                              </div>
                           </div>
                         </div>
                      </div>

                      {/* Terms Body */}
                      <div className="flex-1 p-8 px-12 flex flex-col justify-between">
                         <div className="space-y-5">
                            <div className="flex items-start gap-4">
                               <div className="w-1.5 h-1.5 rounded-sm bg-[#1e293b] mt-2 shrink-0"></div>
                               <p className="text-sm text-gray-700 font-medium leading-relaxed pr-8">
                                  This card remains the property of Defined Domains and must be returned upon request. It is strictly non-transferable and issued for the sole purpose of student identification and campus security.
                               </p>
                            </div>
                            <div className="flex items-start gap-4">
                               <div className="w-1.5 h-1.5 rounded-sm bg-[#1e293b] mt-2 shrink-0"></div>
                               <p className="text-sm text-gray-700 font-medium leading-relaxed pr-8">
                                  Grants access to Special Needs Education, Learning Disabilities, Behavior Modification, Individualised Educational Programes, Speech & Occupational Therapies, and Basic Sign Language Training.
                               </p>
                            </div>
                         </div>

                         {/* Footer Info Block */}
                         <div className="flex justify-between items-end mt-4">
                            
                            {/* Contact Grid */}
                            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
                               <span className="font-bold text-gray-500">Phone</span>
                               <span className="font-bold text-[#1e293b]">: 071 451 5323 | 0772 944 837</span>
                               
                               <span className="font-bold text-gray-500">Mail</span>
                               <span className="font-bold text-[#1e293b]">: info@defineddomains.co.zw</span>
                               
                               <span className="font-bold text-gray-500">Website</span>
                               <span className="font-bold text-[#1e293b]">: www.defineddomains.co.zw</span>
                            </div>

                            {/* Signature Center */}
                            <div className="flex flex-col items-center pb-1 px-8">
                               <p className="text-3xl font-['Brush_Script_MT',cursive,serif] text-[#1e293b] -mb-1 z-10 italic">Def. Dom.</p>
                               <span className="font-bold text-lg text-[#1e293b] tracking-widest relative z-20">Principal</span>
                            </div>

                            {/* Barcode & Dates */}
                            <div className="flex flex-col items-end">
                               <div className="mb-3 border border-gray-300 p-1 flex justify-center bg-white">
                                  <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.5} height={35} displayValue={false} margin={0} background="transparent" />
                               </div>
                               <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-[11px]">
                                  <span className="font-bold text-gray-500">Joined Date</span>
                                  <span className="font-bold text-[#1e293b]">: 28/MAY/2024</span>
                                  
                                  <span className="font-bold text-gray-500">Expire Date</span>
                                  <span className="font-bold text-[#1e293b]">: 28/MAY/2026</span>
                               </div>
                            </div>

                         </div>
                      </div>

                    </div>
                  </div>"""

content = re.sub(
    r'\{\/\* Card Container for Scaling \*\/\}.*?<\/div>\s*<\/div>\s*<\/div>',
    lambda m: new_card_view,
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
