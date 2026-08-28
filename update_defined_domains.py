import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# Add isFlipped state
content = re.sub(
    r'const \[scanSuccess, setScanSuccess\] = useState\(false\);',
    'const [scanSuccess, setScanSuccess] = useState(false);\n  const [isFlipped, setIsFlipped] = useState(false);',
    content
)

# Update the header logo
content = re.sub(
    r'<div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-green-500 rounded-\[9px\] flex items-center justify-center text-white font-bold text-xs tracking-wider">\s*LOGO\s*</div>',
    '<img src="/defineddomain.png" alt="Defined Domains Logo" className="w-12 h-12 object-contain" />',
    content
)

new_id_card = """
          {/* Newly Added Student ID View */}
          {activeTab === 'add' && newlyAddedStudent && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
              <div 
                className="relative w-full aspect-[2/3] perspective-1000 cursor-pointer" 
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: '1000px' }}
              >
                <motion.div 
                  className="w-full h-full relative preserve-3d transition-transform duration-700 shadow-2xl rounded-[9px]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-green-500 rounded-[9px] overflow-hidden flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="bg-green-600 p-4 flex flex-col items-center">
                      <img src="/defineddomain.png" alt="Logo" className="h-10 mb-2 object-contain bg-white rounded-full p-1" />
                      <h3 className="text-white font-bold text-lg uppercase tracking-widest leading-tight text-center">Defined Domains<br/><span className="text-sm font-medium">Inclusive School</span></h3>
                    </div>
                    <div className="p-6 flex flex-col items-center flex-1 justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-[9px] overflow-hidden border-4 border-white shadow-lg mb-4 bg-gray-100">
                          {newlyAddedStudent.image ? (
                            <img src={newlyAddedStudent.image} alt={newlyAddedStudent.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs text-center p-2">NO IMAGE</div>
                          )}
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 text-center uppercase">{newlyAddedStudent.name} {newlyAddedStudent.surname}</h2>
                        <p className="text-purple-700 font-bold text-lg mb-2">{newlyAddedStudent.grade}</p>
                        <div className="w-full max-w-[200px] mb-4">
                          <p className="text-xs text-gray-500 font-semibold uppercase text-center">Address</p>
                          <p className="text-gray-800 text-center font-medium leading-tight text-sm">{newlyAddedStudent.address}</p>
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded-[9px] shadow-sm border border-gray-100 mb-2">
                        <QRCode value={`https://blackgiftlabs.com/defined-domains/${newlyAddedStudent.slug}`} size={100} fgColor="#1a1a1a" />
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center px-4 py-3 bg-purple-50 border-t border-purple-100">
                      <span className="text-xs font-bold text-purple-600 uppercase">Valid Until</span>
                      <span className="text-sm font-extrabold text-gray-900">{newlyAddedStudent.expiryDate}</span>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-purple-500 rounded-[9px] overflow-hidden flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <div className="bg-purple-600 p-4 flex flex-col items-center">
                      <img src="/defineddomain.png" alt="Logo" className="h-10 mb-2 object-contain bg-white rounded-full p-1" />
                      <h3 className="text-white font-bold text-lg uppercase tracking-widest leading-tight text-center">Defined Domains<br/><span className="text-sm font-medium">Inclusive School</span></h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1 relative bg-gray-50">
                      <h4 className="text-xl font-extrabold text-red-600 mb-4 text-center border-b-2 border-red-200 pb-2 uppercase tracking-wide">Skills Orientation</h4>
                      <ul className="space-y-3 mb-6 flex-1">
                        {[
                          'Special Needs Education',
                          'Learning Disabilities',
                          'Behavior Modification',
                          'Individualised Educational Programes',
                          'Speech and Occupational Therapies',
                          'Basic Sign Language training'
                        ].map((skill, idx) => (
                          <li key={idx} className="flex items-start text-sm font-medium text-gray-800">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto space-y-3 bg-white p-4 rounded-[9px] border border-gray-200 shadow-sm">
                        <div className="flex items-start gap-2 text-xs font-bold text-gray-700">
                          <span className="text-purple-600">📞</span>
                          <span>071 451 5323 | 0772 944 837 | 077 143 7464</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs font-bold text-gray-700">
                          <span className="text-purple-600">📍</span>
                          <span>24 ELIOT STREET, RHODENE, MASVINGO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4 font-bold uppercase tracking-wider">Tap card to flip</p>
              <div className="mt-6 flex justify-center">
                <button onClick={() => setNewlyAddedStudent(null)} className="text-gray-500 font-bold hover:text-gray-800 px-6 py-2 rounded-[9px] bg-gray-100">
                  + Add Another Student
                </button>
              </div>
            </motion.div>
          )}
"""

content = re.sub(
    r'\{\/\* Newly Added Student ID View \*\/\}.*?\{\/\* Student List Tab \*\/\}',
    new_id_card + '\n\n          {/* Student List Tab */}',
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)

