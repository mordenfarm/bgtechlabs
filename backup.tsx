     1	import React, { useState, useRef, useEffect } from 'react';
     2	import QRCode from 'react-qr-code';
     3	import Barcode from 'react-barcode';
     4	import html2canvas from 'html2canvas';
     5	import { motion, AnimatePresence } from 'motion/react';
     6	import { Seo } from '../components/Seo';
     7	import { db } from '../lib/firebase';
     8	import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';
     9	import { QrCode, UserPlus, Users, ChevronLeft, ChevronRight, Download, Repeat, MapPin, User, Shield, GraduationCap } from 'lucide-react';
    10	
    11	interface Student {
    12	  id: string;
    13	  name: string;
    14	  surname: string;
    15	  grade: string;
    16	  address: string;
    17	  expiryDate: string;
    18	  image: string; // Base64 or URL
    19	  slug: string;
    20	}
    21	
    22	export function DefinedDomains() {
    23	  const [activeTab, setActiveTab] = useState<'scan' | 'add' | 'list'>('add');
    24	  const [students, setStudents] = useState<Student[]>([]);
    25	  
    26	  // Add Student Form State
    27	  const [name, setName] = useState('');
    28	  const [surname, setSurname] = useState('');
    29	  const [grade, setGrade] = useState('');
    30	  const [address, setAddress] = useState('');
    31	  const [image, setImage] = useState('');
    32	  const [newlyAddedStudent, setNewlyAddedStudent] = useState<Student | null>(null);
    33	
    34	  // Scan State
    35	  const [scanResult, setScanResult] = useState('');
    36	  const [isValidating, setIsValidating] = useState(false);
    37	  const [scanSuccess, setScanSuccess] = useState(false);
    38	  useEffect(() => {
    39	    const fetchStudents = async () => {
    40	      try {
    41	        const q = query(collection(db, 'dd_students'), orderBy('createdAt', 'desc'));
    42	        const snap = await getDocs(q);
    43	        const data = snap.docs.map(doc => doc.data() as Student);
    44	        setStudents(data);
    45	      } catch (error) {
    46	        console.error("Error fetching students: ", error);
    47	      }
    48	    };
    49	    fetchStudents();
    50	  }, []);
    51	  const [currentPage, setCurrentPage] = useState(1);
    52	  const itemsPerPage = 5;
    53	    const [showingBack, setShowingBack] = useState(false);
    54	  const [isDownloading, setIsDownloading] = useState(false);
    55	  const cardContainerRef = useRef<HTMLDivElement>(null);
    56	  const [cardScale, setCardScale] = useState(1);
    57	
    58	  useEffect(() => {
    59	    const handleResize = () => {
    60	      if (cardContainerRef.current) {
    61	        const containerWidth = cardContainerRef.current.clientWidth;
    62	        // 800px is our target width. Scale it down if the container is smaller.
    63	        const scale = Math.min(1, (containerWidth - 32) / 800);
    64	        setCardScale(scale);
    65	      }
    66	    };
    67	    handleResize();
    68	    window.addEventListener('resize', handleResize);
    69	    return () => window.removeEventListener('resize', handleResize);
    70	  }, [newlyAddedStudent, showingBack]);
    71	
    72	  const downloadID = async () => {
    73	    const element = document.getElementById(showingBack ? 'id-card-back' : 'id-card-front');
    74	    if (!element || !newlyAddedStudent) return;
    75	    setIsDownloading(true);
    76	    try {
    77	      const canvas = await html2canvas(element, { scale: 3, backgroundColor: null, useCORS: true });
    78	      const link = document.createElement('a');
    79	      link.download = `student-id-${newlyAddedStudent.slug}-${showingBack ? 'back' : 'front'}.png`;
    80	      link.href = canvas.toDataURL('image/png');
    81	      link.click();
    82	    } catch (err) {
    83	      console.error("Failed to download", err);
    84	    }
    85	    setIsDownloading(false);
    86	  };
    87	
    88	    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    89	    const file = e.target.files?.[0];
    90	    if (file) {
    91	      const reader = new FileReader();
    92	      reader.onloadend = () => {
    93	        const img = new Image();
    94	        img.onload = () => {
    95	          const canvas = document.createElement('canvas');
    96	          const MAX_WIDTH = 300;
    97	          const scaleSize = MAX_WIDTH / img.width;
    98	          canvas.width = MAX_WIDTH;
    99	          canvas.height = img.height * scaleSize;
   100	          const ctx = canvas.getContext('2d');
   101	          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
   102	          setImage(canvas.toDataURL('image/jpeg', 0.7));
   103	        };
   104	        img.src = reader.result as string;
   105	      };
   106	      reader.readAsDataURL(file);
   107	    }
   108	  };
   109	
   110	    const handleAddStudent = async (e: React.FormEvent) => {
   111	    e.preventDefault();
   112	    if (!name || !surname || !grade || !address || !image) return;
   113	
   114	    const expiryDate = new Date();
   115	    expiryDate.setFullYear(expiryDate.getFullYear() + 2);
   116	
   117	    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${surname.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
   118	
   119	    const newStudent: Student = {
   120	      id: Date.now().toString(),
   121	      name,
   122	      surname,
   123	      grade,
   124	      address,
   125	      expiryDate: expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
   126	      image,
   127	      slug
   128	    };
   129	
   130	    try {
   131	      // Save to Firebase Firestore
   132	      await setDoc(doc(db, 'dd_students', slug), {
   133	        ...newStudent,
   134	        createdAt: serverTimestamp()
   135	      });
   136	      
   137	      setStudents(prev => [newStudent, ...prev]);
   138	      setNewlyAddedStudent(newStudent);
   139	      
   140	      // Reset form
   141	      setName('');
   142	      setSurname('');
   143	      setGrade('');
   144	      setAddress('');
   145	      setImage('');
   146	    } catch (error) {
   147	      console.error("Error saving student to database: ", error);
   148	      alert("Failed to save student to database.");
   149	    }
   150	  };
   151	
   152	  const simulateScan = (e: React.FormEvent) => {
   153	    e.preventDefault();
   154	    setIsValidating(true);
   155	    setScanSuccess(false);
   156	    
   157	    setTimeout(() => {
   158	      setIsValidating(false);
   159	      setScanSuccess(true);
   160	      
   161	      setTimeout(() => {
   162	        setScanSuccess(false);
   163	        setScanResult('');
   164	      }, 5000);
   165	    }, 1500);
   166	  };
   167	
   168	  const indexOfLastStudent = currentPage * itemsPerPage;
   169	  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
   170	  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
   171	  const totalPages = Math.ceil(students.length / itemsPerPage);
   172	
   173	  return (
   174	    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-purple-200">
   175	      <Seo title="Defined Domains | ID Verification" description="ID Verification and Management System" />
   176	      
   177	            {/* Header */}
   178	      <header className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between sticky top-0 z-50">
   179	        <div className="flex flex-col">
   180	          <h1 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-widest uppercase leading-tight">
   181	            DEFINED DOMAINS
   182	          </h1>
   183	          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider uppercase leading-tight">
   184	            ID Verification
   185	          </span>
   186	        </div>
   187	        <img src="/defineddomain.png" alt="Defined Domains Logo" className="w-8 h-8 object-contain" />
   188	      </header>
   189	
   190	      <main className="max-w-[1200px] mx-auto p-4 md:p-6 pb-24">
   191	        
   192	        {/* Tab Content */}
   193	        <div className="w-full">
   194	          
   195	                    {/* Add Student Tab */}
   196	          {activeTab === 'add' && !newlyAddedStudent && (
   197	            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
   198	              <div className="bg-white border border-gray-200 shadow-sm rounded-[9px] p-5 sm:p-6">
   199	                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Register Student</h2>
   200	                <form onSubmit={handleAddStudent} className="space-y-4">
   201	                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   202	                    <div>
   203	                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
   204	                      <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. John" />
   205	                    </div>
   206	                    <div>
   207	                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Surname</label>
   208	                      <input required type="text" value={surname} onChange={e => setSurname(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. Doe" />
   209	                    </div>
   210	                  </div>
   211	                  <div>
   212	                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade / Class</label>
   213	                    <input required type="text" value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm" placeholder="e.g. Form 4A" />
   214	                  </div>
   215	                  <div>
   216	                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Home Address</label>
   217	                    <textarea required value={address} onChange={e => setAddress(e.target.value)} rows={2} className="w-full bg-white border border-gray-300 rounded-[9px] px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm resize-none" placeholder="Enter full address" />
   218	                  </div>
   219	                  <div>
   220	                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Student Photo</label>
   221	                    <div className="flex items-center gap-3">
   222	                      <label className="flex-1 border border-dashed border-gray-300 rounded-[9px] p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
   223	                        <span className="text-xs text-gray-500 font-medium">Capture or upload photo</span>
   224	                        <input required type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
   225	                      </label>
   226	                      {image && (
   227	                        <div className="w-16 h-16 rounded-[9px] border border-gray-200 overflow-hidden shrink-0 shadow-sm">
   228	                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
   229	                        </div>
   230	                      )}
   231	                </div>
   232	              </div>
   233	                  <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3 rounded-[9px] shadow-sm transition-colors mt-2">
   234	                    Generate Student ID
   235	                  </button>
   236	                </form>
   237	              </div>
   238	            </motion.div>
   239	          )}
   240	
   241	                              {/* Newly Added Student ID View */}
   242	          {activeTab === 'add' && newlyAddedStudent && (
   243	            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
   244	              
   245	              {/* Controls */}
   246	              <div className="flex gap-3 sm:gap-4 mb-6">
   247	                <button 
   248	                  onClick={() => setShowingBack(!showingBack)} 
   249	                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold px-3 sm:px-4 py-2 rounded-[9px] shadow-sm hover:bg-gray-50 transition-colors text-sm"
   250	                >
   251	                  <Repeat className="w-4 h-4" />
   252	                  {showingBack ? 'See Front' : 'See Back'}
   253	                </button>
   254	                <button 
   255	                  onClick={downloadID}
   256	                  disabled={isDownloading}
   257	                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 sm:px-4 py-2 rounded-[9px] shadow-sm transition-colors disabled:opacity-50 text-sm"
   258	                >
   259	                  <Download className="w-4 h-4" />
   260	                  {isDownloading ? 'Downloading...' : 'Download HD'}
   261	                </button>
   262	              </div>
   263	
   264	                                          {/* Card Container for Scaling */}
   265	              <div ref={cardContainerRef} className="w-full flex justify-center items-start overflow-visible" style={{ height: `${540 * cardScale}px` }}>
   266	                
   267	                <div 
   268	                  className="relative transition-transform duration-300"
   269	                  style={{ 
   270	                    width: '856px', 
   271	                    minWidth: '856px',
   272	                    height: '540px', 
   273	                    transform: `scale(${cardScale})`,
   274	                    transformOrigin: 'top center'
   275	                  }}
   276	                >
   277	                  {/* FRONT OF CARD (GHIC Style) */}
   278	                  {!showingBack && (
   279	                    <div id="id-card-front" className="absolute inset-0 bg-[#f4f6f9] rounded-[24px] overflow-hidden shadow-2xl flex flex-col font-sans border-2 border-gray-300">
   280	                       {/* Background Watermark */}
   281	                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
   282	                          <img src="/defineddomain.png" className="w-full h-full object-contain grayscale" />
   283	                       </div>
   284	
   285	                       {/* HEADER */}
   286	                       <div className="relative w-full h-[140px] bg-[#0b1f38] flex items-center px-8 shrink-0">
   287	                          {/* Lanyard Hole */}
   288	                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#f4f6f9] rounded-full border border-gray-300 shadow-inner z-20"></div>
   289	
   290	                          {/* Gold separator overlay */}
   291	                          <div className="absolute -bottom-0.5 left-0 w-full overflow-hidden leading-none z-0">
   292	                             <svg className="w-full h-8 block" viewBox="0 0 856 32" fill="none" preserveAspectRatio="none">
   293	                                <path d="M0,0 L856,24 L856,32 L0,32 Z" fill="#f4f6f9" />
   294	                                <path d="M0,0 L856,16 L856,24 L0,8 Z" fill="#c5a059" />
   295	                             </svg>
   296	                          </div>
   297	
   298	                          <div className="flex items-center gap-5 z-10 w-full relative -mt-3">
   299	                             <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
   300	                                 <img src="/defineddomain.png" className="w-full h-full object-contain" />
   301	                             </div>
   302	                             <div className="flex flex-col">
   303	                                <h2 className="text-[32px] font-black text-white uppercase tracking-widest leading-none">Defined Domains</h2>
   304	                                <p className="text-[13px] font-bold text-[#c5a059] uppercase tracking-[0.15em] mt-2">Inclusive Educational Institute</p>
   305	                             </div>
   306	                             <div className="ml-auto flex items-center gap-3 border border-[#c5a059]/40 bg-[#c5a059]/10 px-4 py-2 rounded-xl">
   307	                                <Shield className="w-8 h-8 text-[#c5a059]" />
   308	                                <div className="flex flex-col text-left">
   309	                                   <span className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">Verified</span>
   310	                                   <span className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">& Secured</span>
   311	                                </div>
   312	                             </div>
   313	                          </div>
   314	
   315	                       {/* BODY */}
   316	                       <div className="flex flex-1 p-8 pt-7 relative z-10">
   317	                           {/* LEFT COLUMN */}
   318	                           <div className="w-[230px] flex flex-col shrink-0">
   319	                              <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-4 border-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] relative">
   320	                                 {newlyAddedStudent.image ? <img src={newlyAddedStudent.image} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">NO PHOTO</div>}
   321	                              </div>
   322	                              <div className="bg-[#0b1f38] text-white text-center py-3 rounded-b-xl shadow-lg -mt-3 z-10 relative">
   323	                                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] mb-1">Student ID</p>
   324	                                 <p className="text-[17px] font-mono font-bold tracking-wider">{newlyAddedStudent.id.toUpperCase()}</p>
   325	                              </div>
   326	                              <div className="mt-5 flex justify-center bg-white p-2.5 rounded-xl border border-gray-300 shadow-sm">
   327	                                 <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.9} height={40} displayValue={false} margin={0} background="transparent" />
   328	                              </div>
   329	                           </div>
   330	
   331	                           {/* RIGHT COLUMN */}
   332	                           <div className="flex-1 pl-10 flex flex-col">
   333	                              <h3 className="text-[42px] font-black text-[#0b1f38] uppercase leading-none tracking-tighter">{newlyAddedStudent.name} {newlyAddedStudent.surname}</h3>
   334	                              <p className="text-[20px] font-bold text-[#c5a059] uppercase tracking-[0.15em] mt-3">{newlyAddedStudent.grade}</p>
   335	                              
   336	                              <div className="w-full h-0.5 bg-gray-300 my-5"></div>
   337	
   338	                              <div className="flex flex-col gap-5 flex-1">
   339	                                 <div className="flex items-center gap-4">
   340	                                    <div className="w-10 h-10 rounded-full bg-[#0b1f38] flex items-center justify-center shrink-0 shadow-md">
   341	                                       <MapPin className="w-5 h-5 text-white" />
   342	                                    </div>
   343	                                    <div>
   344	                                       <p className="text-[11px] font-bold text-[#0b1f38] uppercase tracking-[0.15em] mb-0.5">Home Address</p>
   345	                                       <p className="text-[15px] font-bold text-gray-700 leading-tight">{newlyAddedStudent.address}</p>
   346	                                    </div>
   347	                                 </div>
   348	                                 <div className="flex items-center gap-4">
   349	                                    <div className="w-10 h-10 rounded-full bg-[#0b1f38] flex items-center justify-center shrink-0 shadow-md">
   350	                                       <GraduationCap className="w-5 h-5 text-white" />
   351	                                    </div>
   352	                                    <div>
   353	                                       <p className="text-[11px] font-bold text-[#0b1f38] uppercase tracking-[0.15em] mb-0.5">Access Level & Division</p>
   354	                                       <p className="text-[15px] font-bold text-gray-700 leading-tight">Special Needs Education & Inclusive Learning</p>
   355	                                    </div>
   356	                                 </div>
   357	                              </div>
   358	
   359	                              {/* Signature & QR Row */}
   360	                              <div className="flex justify-between items-end mt-2">
   361	                                 <div className="flex flex-col items-center px-2">
   362	                                    <p className="text-5xl font-['Brush_Script_MT',_cursive,_serif] text-[#0b1f38] -mb-2 z-10 italic">Def. Dom.</p>
   363	                                    <div className="w-56 border-t-[1.5px] border-gray-400"></div>
   364	                                    <span className="font-bold text-[10px] text-[#0b1f38] uppercase mt-1.5 tracking-widest">Authorized Signature</span>
   365	                                 </div>
   366	                                 
   367	                                 <div className="flex flex-col items-center">
   368	                                    <p className="text-[10px] font-bold text-[#0b1f38] uppercase tracking-widest mb-1">Issue Date</p>
   369	                                    <p className="text-[14px] font-bold text-gray-700">28 MAY 2024</p>
   370	                                 </div>
   371	
   372	                                 <div className="flex flex-col items-center">
   373	                                    <div className="bg-white p-2 border border-gray-300 rounded-xl shadow-sm mb-2 relative">
   374	                                      <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={80} fgColor="#0b1f38" />
   375	                                    </div>
   376	                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-[#c5a059] text-white px-3 py-1.5 rounded-md shadow-sm w-full text-center">Scan to Verify</span>
   377	                                 </div>
   378	                              </div>
   379	                           </div>
   380	                       </div>
   381	
   382	                       {/* FOOTER */}
   383	                       <div className="w-full h-[36px] bg-[#0b1f38] shrink-0 flex items-center justify-center gap-10 z-20">
   384	                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Education</span>
   385	                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
   386	                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Inclusion</span>
   387	                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
   388	                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Empowerment</span>
   389	                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
   390	                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Trust</span>
   391	                       </div>
   392	                    </div>
   393	                    </div>
   394	                  )}
   395	                </div>
   396	                  {/* BACK OF CARD (Navy & Gold Corporate Style) */}
   397	                  {showingBack && (
   398	                    <div id="id-card-back" className="absolute inset-0 bg-white rounded-[24px] overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans">
   399	                      
   400	                      {/* Lanyard Hole for Back */}
   401	                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-white/30 rounded-full border border-gray-300 shadow-inner z-30"></div>
   402	
   403	                      {/* Angular Header Replica */}
   404	                      <div className="w-full h-[140px] relative bg-white shrink-0">
   405	                         <svg width="856" height="140" viewBox="0 0 856 140" className="absolute top-0 left-0 z-0">
   406	                           <rect width="856" height="140" fill="#0b1f38" />
   407	                           <polygon points="550,0 520,100 540,100 510,140 495,140 525,100 505,100 535,0" fill="#c5a059" />
   408	                           <polygon points="540,0 510,100 530,100 500,140 480,140 510,100 490,100 520,0" fill="#ffffff" />
   409	                         </svg>
   410	                         
   411	                         <div className="absolute inset-0 flex z-10">
   412	                           <div className="w-[520px] flex items-center pl-16">
   413	                              <span className="text-white text-2xl font-bold tracking-[0.15em] uppercase">Terms and Conditions</span>
   414	                           </div>
   415	                           <div className="flex-1 flex items-center justify-center gap-5 pl-8">
   416	                              <div className="bg-white p-1.5 rounded-xl shadow-md">
   417	                                <img src="/defineddomain.png" className="w-16 h-16 object-contain" />
   418	                              </div>
   419	                              <div className="text-white flex flex-col justify-center">
   420	                                 <h3 className="font-extrabold text-2xl leading-none tracking-widest uppercase">Defined Domains</h3>
   421	                                 <p className="text-[11px] tracking-[0.2em] text-[#c5a059] mt-1.5 uppercase font-bold">Inclusive School</p>
   422	                              </div>
   423	                           </div>
   424	                         </div>
   425	                      </div>
   426	
   427	                      {/* Terms Body */}
   428	                      <div className="flex-1 p-10 px-16 flex flex-col justify-between">
   429	                         <div className="space-y-6">
   430	                            <div className="flex items-start gap-5">
   431	                               <div className="w-2 h-2 rounded-sm bg-[#c5a059] mt-2 shrink-0"></div>
   432	                               <p className="text-[15px] text-gray-700 font-medium leading-relaxed pr-10">
   433	                                  This card remains the property of Defined Domains and must be returned upon request. It is strictly non-transferable and issued for the sole purpose of student identification and campus security.
   434	                               </p>
   435	                            </div>
   436	                            <div className="flex items-start gap-5">
   437	                               <div className="w-2 h-2 rounded-sm bg-[#c5a059] mt-2 shrink-0"></div>
   438	                               <p className="text-[15px] text-gray-700 font-medium leading-relaxed pr-10">
   439	                                  Grants access to Special Needs Education, Learning Disabilities, Behavior Modification, Individualised Educational Programes, Speech & Occupational Therapies, and Basic Sign Language Training.
   440	                               </p>
   441	                            </div>
   442	                         </div>
   443	
   444	                         {/* Footer Info Block */}
   445	                         <div className="flex justify-between items-end mt-4 pt-6 border-t border-gray-200">
   446	                            
   447	                            {/* Contact Grid */}
   448	                            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[14px]">
   449	                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Phone</span>
   450	                               <span className="font-bold text-[#0b1f38]">: 071 451 5323 | 0772 944 837</span>
   451	                               
   452	                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Mail</span>
   453	                               <span className="font-bold text-[#0b1f38]">: info@defineddomains.co.zw</span>
   454	                               
   455	                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Website</span>
   456	                               <span className="font-bold text-[#0b1f38]">: www.defineddomains.co.zw</span>
   457	                            </div>
   458	
   459	                            {/* Signature Center */}
   460	                            <div className="flex flex-col items-center pb-2 px-10">
   461	                               <p className="text-4xl font-['Brush_Script_MT',_cursive,_serif] text-[#0b1f38] -mb-1 z-10 italic">Def. Dom.</p>
   462	                               <span className="font-bold text-[14px] text-[#0b1f38] tracking-[0.2em] uppercase relative z-20">Principal</span>
   463	                            </div>
   464	
   465	                            {/* Barcode & Dates */}
   466	                            <div className="flex flex-col items-end">
   467	                               <div className="mb-4 border border-gray-300 p-2 flex justify-center bg-white rounded-lg">
   468	                                  <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.8} height={40} displayValue={false} margin={0} background="transparent" />
   469	                               </div>
   470	                               <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12px]">
   471	                                  <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] flex items-center">Joined Date</span>
   472	                                  <span className="font-bold text-[#0b1f38]">: 28/MAY/2024</span>
   473	                                  
   474	                                  <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] flex items-center">Expire Date</span>
   475	                                  <span className="font-bold text-[#0b1f38]">: 28/MAY/2026</span>
   476	                               </div>
   477	                            </div>
   478	
   479	                         </div>
   480	                      </div>
   481	
   482	                    </div>
   483	                  )}
   484	                  </div>
   485	                  </div>
   486	                </div>
   487	              </div>
   488	              {/* END SCALING CONTAINER */}
   489	            </motion.div>
   490	          )}
