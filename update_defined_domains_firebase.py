import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# 1. Imports
if 'firebase/firestore' not in content:
    content = content.replace(
        "import { QrCode",
        "import { db } from '../lib/firebase';\nimport { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';\nimport { QrCode"
    )

# 2. handleImageUpload
new_handleImageUpload = """  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          setImage(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };"""
content = re.sub(
    r'const handleImageUpload =.*?reader\.readAsDataURL\(file\);\s*\}\s*\};',
    lambda m: new_handleImageUpload,
    content,
    flags=re.DOTALL
)

# 3. handleAddStudent
new_handleAddStudent = """  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !surname || !grade || !address || !image) return;

    const id = Math.random().toString(36).substr(2, 9);
    const slug = `${name.toLowerCase()}-${surname.toLowerCase()}-${id}`;
    
    const newStudent: Student = {
      id,
      name,
      surname,
      grade,
      address,
      expiryDate: '28 MAY 2026',
      image,
      slug
    };

    try {
      // Save to Firebase Firestore
      await setDoc(doc(db, 'dd_students', slug), {
        ...newStudent,
        createdAt: serverTimestamp()
      });
      
      setStudents(prev => [newStudent, ...prev]);
      setNewlyAddedStudent(newStudent);
      
      // Reset form
      setName('');
      setSurname('');
      setGrade('');
      setAddress('');
      setImage(null);
    } catch (error) {
      console.error("Error saving student to database: ", error);
      alert("Failed to save student to database.");
    }
  };"""
content = re.sub(
    r'const handleAddStudent =.*?setImage\(null\);\s*\};',
    lambda m: new_handleAddStudent,
    content,
    flags=re.DOTALL
)

# 4. Fetch students on load
fetch_students = """  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const q = query(collection(db, 'dd_students'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => doc.data() as Student);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };
    fetchStudents();
  }, []);"""

if 'fetchStudents' not in content:
    content = content.replace(
        "const [scanSuccess, setScanSuccess] = useState(false);",
        "const [scanSuccess, setScanSuccess] = useState(false);\n" + fetch_students
    )

# 5. Redesign Card to exact 856x540 (National ID standard) & styling
old_card_pattern = r'\{\/\* Card Container for Scaling \*\/\}.*?\{\/\* BACK OF CARD \*\/\}.*?<\/div>\s*<\/div>\s*<\/div>'

new_card = """              {/* Card Container for Scaling */}
              <div ref={cardContainerRef} className="w-full flex justify-center max-w-[856px] overflow-hidden" style={{ height: `${540 * cardScale}px` }}>
                
                <div 
                  className="relative origin-top transition-transform duration-300"
                  style={{ width: '856px', height: '540px', transform: `scale(${cardScale})` }}
                >
                  {/* FRONT OF CARD */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-[#f4f7f6] rounded-[24px] overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans">
                      
                      {/* Complex National ID Background Patterns */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16a34a 1px, transparent 1px), radial-gradient(#4c1d95 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                      
                      {/* Clean National ID Header */}
                      <div className="relative w-full h-[100px] shrink-0 bg-[#0f172a] flex items-center px-8 border-b-4 border-[#16a34a]">
                        {/* Lanyard Hole */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#f4f7f6] rounded-full border border-gray-400 shadow-inner z-10"></div>
                        
                        <img src="/defineddomain.png" alt="Logo" className="w-16 h-16 object-contain bg-white rounded-lg p-1 shadow-md mr-6 relative z-10" />
                        <div className="flex flex-col text-white relative z-10">
                          <h2 className="text-2xl font-black uppercase tracking-[0.15em] leading-none">Republic of Defined Domains</h2>
                          <p className="text-[14px] font-bold tracking-[0.2em] text-[#4ade80] uppercase mt-1">Inclusive Educational Institute</p>
                        </div>
                        
                        <div className="ml-auto text-right text-white relative z-10 flex flex-col items-end">
                           <Shield className="w-8 h-8 text-[#4ade80] mb-1" />
                           <span className="text-[10px] uppercase tracking-widest font-bold">Official Document</span>
                        </div>
                      </div>

                      {/* Main Body */}
                      <div className="flex-1 flex relative">
                        {/* Ghost Image (Watermark) */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[280px] h-[350px] opacity-[0.04] pointer-events-none overflow-hidden rounded-xl grayscale">
                          {newlyAddedStudent.image ? <img src={newlyAddedStudent.image} className="w-full h-full object-cover" /> : null}
                        </div>
                        
                        {/* Left Column (Photo & Barcode) */}
                        <div className="w-[30%] p-6 pl-8 flex flex-col">
                          <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm relative">
                            {newlyAddedStudent.image ? (
                              <img src={newlyAddedStudent.image} alt={newlyAddedStudent.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase text-center p-4">Photo<br/>Required</div>
                            )}
                          </div>
                          
                          <div className="mt-4 bg-white border border-gray-300 rounded p-2 flex flex-col items-center">
                            <Barcode value={newlyAddedStudent.slug.split('-')[0].toUpperCase()} width={1.2} height={25} displayValue={false} margin={0} background="transparent" />
                            <span className="text-[9px] font-bold tracking-widest mt-1 text-gray-600">{newlyAddedStudent.slug.split('-')[0].toUpperCase()}</span>
                          </div>
                        </div>

                        {/* Right Column (Structured Data) */}
                        <div className="w-[70%] p-6 pr-8 pl-0 flex flex-col justify-start">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full">
                            
                            <div className="col-span-2">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Surname / Nom</p>
                              <p className="text-2xl font-black text-[#0f172a] uppercase tracking-wide leading-none">{newlyAddedStudent.surname}</p>
                            </div>

                            <div className="col-span-2">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Given Names / Prénoms</p>
                              <p className="text-xl font-bold text-[#16a34a] uppercase tracking-wide leading-none">{newlyAddedStudent.name}</p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">ID Number / N° d'identité</p>
                              <p className="text-lg font-bold text-[#0f172a] font-mono">{newlyAddedStudent.id.toUpperCase()}</p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Grade / Classe</p>
                              <p className="text-lg font-bold text-[#0f172a]">{newlyAddedStudent.grade}</p>
                            </div>

                            <div className="col-span-2">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Address / Adresse</p>
                              <p className="text-sm font-bold text-[#0f172a] leading-tight">{newlyAddedStudent.address}</p>
                            </div>
                          </div>

                          <div className="mt-auto flex justify-between items-end">
                            <div>
                               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Date of Expiry</p>
                               <p className="text-sm font-bold text-red-600 tracking-widest">{newlyAddedStudent.expiryDate}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-xl font-['Brush_Script_MT',cursive,serif] text-[#0f172a] mb-1 italic px-4">Def. Dom.</p>
                              <div className="w-32 border-t border-gray-400"></div>
                              <p className="text-[8px] font-bold text-gray-500 uppercase mt-1 tracking-widest">Issuing Authority</p>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* MRZ Zone (Machine Readable Zone) */}
                      <div className="h-[46px] bg-white border-t border-gray-300 flex items-center px-8 text-[#0f172a] font-mono text-sm tracking-[0.2em] uppercase shrink-0 font-bold">
                        P&lt;DDI{newlyAddedStudent.surname.replace(/\s/g, '<')}&lt;&lt;{newlyAddedStudent.name.replace(/\s/g, '<')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
                        {newlyAddedStudent.id.toUpperCase()}&lt;6DDI&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                      </div>
                    </div>
                  )}

                  {/* BACK OF CARD */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-[#f4f7f6] rounded-[24px] overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans">
                      
                      <div className="relative w-full h-[80px] shrink-0 bg-[#0f172a] border-b-4 border-[#16a34a] flex items-center justify-between px-8">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#f4f7f6] rounded-full border border-gray-400 shadow-inner z-10"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-widest">Administrative Data</h2>
                        <img src="/defineddomain.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded p-1" />
                      </div>

                      <div className="flex-1 p-8 flex">
                        
                        <div className="flex-1 pr-6 border-r border-gray-300">
                           <h3 className="text-lg font-bold text-[#0f172a] uppercase tracking-widest mb-4 border-b border-gray-300 pb-2">Skills Orientation</h3>
                           <div className="grid grid-cols-1 gap-y-3">
                             {[
                               'Special Needs Education',
                               'Learning Disabilities',
                               'Behavior Modification',
                               'Individualised Educational Programes',
                               'Speech & Occupational Therapies',
                               'Basic Sign Language Training'
                             ].map((skill, idx) => (
                               <div key={idx} className="flex items-center gap-3">
                                 <div className="w-4 h-4 rounded-sm bg-[#16a34a] flex items-center justify-center shrink-0">
                                   <span className="text-white text-[10px] font-bold">✓</span>
                                 </div>
                                 <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">{skill}</span>
                               </div>
                             ))}
                           </div>
                        </div>

                        <div className="w-[240px] pl-6 flex flex-col justify-between items-center">
                           <div className="text-center w-full">
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">Verification Scan</p>
                              <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-block">
                                <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={100} fgColor="#0f172a" />
                              </div>
                           </div>
                           
                           <div className="w-full text-center space-y-3 mt-4">
                              <div>
                                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Contact</p>
                                 <p className="text-xs font-bold text-[#0f172a]">071 451 5323<br/>0772 944 837</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Location</p>
                                 <p className="text-[10px] font-bold text-[#0f172a] leading-tight">24 ELIOT STREET<br/>RHODENE, MASVINGO</p>
                              </div>
                           </div>
                        </div>

                      </div>
                      
                      <div className="h-[24px] bg-[#0f172a] text-center text-white text-[9px] tracking-widest uppercase flex items-center justify-center font-bold">
                        Property of Defined Domains Institute
                      </div>

                    </div>
                  )}

                </div>
              </div>"""

content = re.sub(
    old_card_pattern,
    lambda m: new_card,
    content,
    flags=re.DOTALL
)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
