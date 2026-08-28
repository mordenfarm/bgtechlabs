import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# 1. Update Imports
if 'ChevronLeft' not in content:
    content = content.replace(
        "import { Seo } from '../components/Seo';",
        "import { Seo } from '../components/Seo';\nimport { QrCode, UserPlus, Users, ChevronLeft, ChevronRight } from 'lucide-react';"
    )

# 2. Add Pagination State
if 'currentPage' not in content:
    content = content.replace(
        "const [scanSuccess, setScanSuccess] = useState(false);",
        "const [scanSuccess, setScanSuccess] = useState(false);\n  const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 5;"
    )

# 3. Update Header
new_header = """      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-widest uppercase leading-tight">
            DEFINED DOMAINS
          </h1>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider uppercase leading-tight">
            ID Verification
          </span>
        </div>
        <img src="/defineddomain.png" alt="Defined Domains Logo" className="w-8 h-8 object-contain" />
      </header>"""
content = re.sub(
    r'\{\/\* Header \*\/\}.*?<\/header>',
    new_header,
    content,
    flags=re.DOTALL
)

# 4. Remove Top Tabs, Add Bottom Nav, update main container
content = re.sub(
    r'<main className="max-w-\[1200px\] mx-auto p-6 md:p-10">',
    '<main className="max-w-[1200px] mx-auto p-4 md:p-6 pb-24">',
    content
)

content = re.sub(
    r'\{\/\* Tabs \*\/\}.*?\{\/\* Tab Content \*\/\}',
    '{/* Tab Content */}',
    content,
    flags=re.DOTALL
)

# 5. Form Redesign (Vercel Style)
new_add_student_tab = """          {/* Add Student Tab */}
          {activeTab === 'add' && !newlyAddedStudent && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-[9px] p-5 sm:p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Register Student</h2>
                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. John" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Surname</label>
                      <input required type="text" value={surname} onChange={e => setSurname(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade / Class</label>
                    <input required type="text" value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. Form 4A" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Home Address</label>
                    <textarea required value={address} onChange={e => setAddress(e.target.value)} rows={2} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm resize-none" placeholder="Enter full address" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Student Photo</label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 border border-dashed border-gray-300 rounded-[9px] p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-xs text-gray-500 font-medium">Capture or upload photo</span>
                        <input required type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="hidden" />
                      </label>
                      {image && (
                        <div className="w-16 h-16 rounded-[9px] border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3 rounded-[9px] shadow-sm transition-colors mt-2">
                    Generate Student ID
                  </button>
                </form>
              </div>
            </motion.div>
          )}"""

content = re.sub(
    r'\{\/\* Add Student Tab \*\/\}.*?\{\/\* Newly Added Student ID View \*\/\}',
    new_add_student_tab + '\n\n          {/* Newly Added Student ID View */}',
    content,
    flags=re.DOTALL
)

# 6. Pagination logic
if 'indexOfLastStudent' not in content:
    content = content.replace(
        'return (',
        '''const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  return ('''
    )

new_list_tab = """          {/* Student List Tab */}
          {activeTab === 'list' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-[9px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 font-bold text-gray-700 text-xs uppercase tracking-wider">Student</th>
                        <th className="py-3 px-4 font-bold text-gray-700 text-xs uppercase tracking-wider hidden sm:table-cell">Grade</th>
                        <th className="py-3 px-4 font-bold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-gray-500 font-medium text-sm">No students found.</td>
                        </tr>
                      ) : (
                        currentStudents.map(student => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-[6px] overflow-hidden bg-gray-200 shrink-0">
                                  {student.image && <img src={student.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900 leading-tight">{student.name} {student.surname}</div>
                                  <div className="text-[10px] text-gray-500 leading-tight mt-0.5 sm:hidden">{student.grade}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-600 hidden sm:table-cell">{student.grade}</td>
                            <td className="py-3 px-4 text-right">
                              <button 
                                onClick={() => {
                                  setNewlyAddedStudent(student);
                                  setActiveTab('add');
                                }}
                                className="text-xs font-bold text-gray-900 hover:text-black bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-[6px] transition-colors shadow-sm"
                              >
                                View ID
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-[6px] bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-[6px] bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}"""

content = re.sub(
    r'\{\/\* Student List Tab \*\/\}.*?\{\/\* Scan QR Code Tab \*\/\}',
    new_list_tab + '\n\n          {/* Scan QR Code Tab */}',
    content,
    flags=re.DOTALL
)

# 7. Add Bottom Nav Bar
new_bottom_nav = """      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
        <button onClick={() => { setActiveTab('scan'); setNewlyAddedStudent(null); }} className={`flex flex-col items-center py-3 px-4 w-full transition-colors ${activeTab === 'scan' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
          <QrCode className="w-6 h-6 stroke-[2.5] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
        </button>
        <button onClick={() => { setActiveTab('add'); setNewlyAddedStudent(null); }} className={`flex flex-col items-center py-3 px-4 w-full transition-colors ${activeTab === 'add' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
          <UserPlus className="w-6 h-6 stroke-[2.5] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Add</span>
        </button>
        <button onClick={() => { setActiveTab('list'); setNewlyAddedStudent(null); }} className={`flex flex-col items-center py-3 px-4 w-full transition-colors ${activeTab === 'list' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
          <Users className="w-6 h-6 stroke-[2.5] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">List</span>
        </button>
      </nav>
    </div>"""

if 'Bottom Navigation' not in content:
    content = re.sub(
        r'<\/div>\s*<\/main>\s*<\/div>\s*\);\s*\}',
        '</div>\n      </main>\n' + new_bottom_nav + '\n  );\n}',
        content
    )

# Fix Scan Form styling
new_scan_tab = """          {/* Scan QR Code Tab */}
          {activeTab === 'scan' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-[9px] p-6 flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Verify ID Card</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Scan QR code to verify validity.</p>
                
                <div className="w-full aspect-square max-w-xs bg-gray-50 rounded-[9px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden mb-6">
                  {scanSuccess ? (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                    >
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  ) : isValidating ? (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3"></div>
                      <p className="font-bold text-purple-600 text-sm">Verifying...</p>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-12 h-12 border-4 border-gray-300 rounded-[9px] mx-auto mb-3 opacity-50 relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/50 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                      </div>
                      <p className="font-bold text-sm text-gray-400">Camera Active</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Position QR code</p>
                    </div>
                  )}
                </div>

                {scanSuccess && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-green-50 border border-green-200 rounded-[9px] p-4 text-center mb-6 shadow-sm">
                    <h3 className="text-green-800 font-extrabold text-lg mb-0.5">VALID ID</h3>
                    <p className="text-green-600 font-medium text-xs">Authentic and active.</p>
                  </motion.div>
                )}

                <form onSubmit={simulateScan} className="w-full max-w-xs">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Manual Entry (Simulation)</label>
                  <div className="flex gap-2">
                    <input type="text" value={scanResult} onChange={e => setScanResult(e.target.value)} placeholder="Paste link..." className="flex-1 bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" />
                    <button type="submit" className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-[9px] text-sm transition-colors shadow-sm">
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}"""

content = re.sub(
    r'\{\/\* Scan QR Code Tab \*\/\}.*?<\/div>\s*<\/main>',
    new_scan_tab + '\n\n        </div>\n      </main>',
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
