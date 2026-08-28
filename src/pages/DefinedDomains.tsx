import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { Seo } from '../components/Seo';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { QrCode, UserPlus, Users, ChevronLeft, ChevronRight, Download, Repeat, MapPin, User, Shield, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  surname: string;
  grade: string;
  address: string;
  expiryDate: string;
  image: string; // Base64 or URL
  slug: string;
}

export function DefinedDomains() {
  const [activeTab, setActiveTab] = useState<'scan' | 'add' | 'list'>('add');
  const [students, setStudents] = useState<Student[]>([]);
  
  // Add Student Form State
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [newlyAddedStudent, setNewlyAddedStudent] = useState<Student | null>(null);

  // Scan State
  const [scanResult, setScanResult] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  useEffect(() => {
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
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
    const [showingBack, setShowingBack] = useState(false);
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
  };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

    const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !surname || !grade || !address || !image) return;

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${surname.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      surname,
      grade,
      address,
      expiryDate: expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
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
      setImage('');
    } catch (error) {
      console.error("Error saving student to database: ", error);
      alert("Failed to save student to database.");
    }
  };

  const simulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setScanSuccess(false);
    
    setTimeout(() => {
      setIsValidating(false);
      setScanSuccess(true);
      
      setTimeout(() => {
        setScanSuccess(false);
        setScanResult('');
      }, 5000);
    }, 1500);
  };

  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-purple-200">
      <Seo title="Defined Domains | ID Verification" description="ID Verification and Management System" />
      
            {/* Header */}
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
      </header>

      <main className="max-w-[1200px] mx-auto p-4 md:p-6 pb-24">
        
        {/* Tab Content */}
        <div className="w-full">
          
                    {/* Add Student Tab */}
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
                        <input required type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
          )}

                              {/* Newly Added Student ID View */}
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
              <div ref={cardContainerRef} className="w-full flex justify-center items-start overflow-visible" style={{ height: `${540 * cardScale}px` }}>
                
                <div 
                  className="relative transition-transform duration-300"
                  style={{ 
                    width: '856px', 
                    minWidth: '856px',
                    height: '540px', 
                    transform: `scale(${cardScale})`,
                    transformOrigin: 'top center'
                  }}
                >
                  {/* FRONT OF CARD (GHIC Style) */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-[#f4f6f9] rounded-[24px] overflow-hidden shadow-2xl flex flex-col font-sans border-2 border-gray-300">
                       {/* Background Watermark */}
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
                          <img src="/defineddomain.png" className="w-full h-full object-contain grayscale" />
                       </div>

                       {/* HEADER */}
                       <div className="relative w-full h-[140px] bg-[#0b1f38] flex items-center px-8 shrink-0">
                          {/* Lanyard Hole */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#f4f6f9] rounded-full border border-gray-300 shadow-inner z-20"></div>

                          {/* Gold separator overlay */}
                          <div className="absolute -bottom-0.5 left-0 w-full overflow-hidden leading-none z-0">
                             <svg className="w-full h-8 block" viewBox="0 0 856 32" fill="none" preserveAspectRatio="none">
                                <path d="M0,0 L856,24 L856,32 L0,32 Z" fill="#f4f6f9" />
                                <path d="M0,0 L856,16 L856,24 L0,8 Z" fill="#c5a059" />
                             </svg>
                          </div>

                          <div className="flex items-center gap-5 z-10 w-full relative -mt-3">
                             <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                                 <img src="/defineddomain.png" className="w-full h-full object-contain" />
                             </div>
                             <div className="flex flex-col">
                                <h2 className="text-[32px] font-black text-white uppercase tracking-widest leading-none">Defined Domains</h2>
                                <p className="text-[13px] font-bold text-[#c5a059] uppercase tracking-[0.15em] mt-2">Inclusive Educational Institute</p>
                             </div>
                             <div className="ml-auto flex items-center gap-3 border border-[#c5a059]/40 bg-[#c5a059]/10 px-4 py-2 rounded-xl">
                                <Shield className="w-8 h-8 text-[#c5a059]" />
                                <div className="flex flex-col text-left">
                                   <span className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">Verified</span>
                                   <span className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">& Secured</span>
                                </div>
                             </div>
                           </div>
                        </div>

                       {/* BODY */}
                       <div className="flex flex-1 p-8 pt-7 relative z-10">
                           {/* LEFT COLUMN */}
                           <div className="w-[230px] flex flex-col shrink-0">
                              <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border-4 border-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] relative">
                                 {newlyAddedStudent.image ? <img src={newlyAddedStudent.image} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">NO PHOTO</div>}
                              </div>
                              <div className="bg-[#0b1f38] text-white text-center py-3 rounded-b-xl shadow-lg -mt-3 z-10 relative">
                                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] mb-1">Student ID</p>
                                 <p className="text-[17px] font-mono font-bold tracking-wider">{newlyAddedStudent.id.toUpperCase()}</p>
                              </div>
                              <div className="mt-5 flex justify-center bg-white p-2.5 rounded-xl border border-gray-300 shadow-sm">
                                 <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.9} height={40} displayValue={false} margin={0} background="transparent" />
                              </div>
                           </div>

                           {/* RIGHT COLUMN */}
                           <div className="flex-1 pl-10 flex flex-col">
                              <h3 className="text-[42px] font-black text-[#0b1f38] uppercase leading-none tracking-tighter">{newlyAddedStudent.name} {newlyAddedStudent.surname}</h3>
                              <p className="text-[20px] font-bold text-[#c5a059] uppercase tracking-[0.15em] mt-3">{newlyAddedStudent.grade}</p>
                              
                              <div className="w-full h-0.5 bg-gray-300 my-5"></div>

                              <div className="flex flex-col gap-5 flex-1">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#0b1f38] flex items-center justify-center shrink-0 shadow-md">
                                       <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                       <p className="text-[11px] font-bold text-[#0b1f38] uppercase tracking-[0.15em] mb-0.5">Home Address</p>
                                       <p className="text-[15px] font-bold text-gray-700 leading-tight">{newlyAddedStudent.address}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#0b1f38] flex items-center justify-center shrink-0 shadow-md">
                                       <GraduationCap className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                       <p className="text-[11px] font-bold text-[#0b1f38] uppercase tracking-[0.15em] mb-0.5">Access Level & Division</p>
                                       <p className="text-[15px] font-bold text-gray-700 leading-tight">Special Needs Education & Inclusive Learning</p>
                                    </div>
                                 </div>
                              </div>

                              {/* Signature & QR Row */}
                              <div className="flex justify-between items-end mt-2">
                                 <div className="flex flex-col items-center px-2">
                                    <p className="text-5xl font-['Brush_Script_MT',_cursive,_serif] text-[#0b1f38] -mb-2 z-10 italic">Def. Dom.</p>
                                    <div className="w-56 border-t-[1.5px] border-gray-400"></div>
                                    <span className="font-bold text-[10px] text-[#0b1f38] uppercase mt-1.5 tracking-widest">Authorized Signature</span>
                                 </div>
                                 
                                 <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-[#0b1f38] uppercase tracking-widest mb-1">Issue Date</p>
                                    <p className="text-[14px] font-bold text-gray-700">28 MAY 2024</p>
                                 </div>

                                 <div className="flex flex-col items-center">
                                    <div className="bg-white p-2 border border-gray-300 rounded-xl shadow-sm mb-2 relative">
                                      <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={80} fgColor="#0b1f38" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-[#c5a059] text-white px-3 py-1.5 rounded-md shadow-sm w-full text-center">Scan to Verify</span>
                                 </div>
                              </div>
                           </div>
                       </div>

                       {/* FOOTER */}
                       <div className="w-full h-[36px] bg-[#0b1f38] shrink-0 flex items-center justify-center gap-10 z-20">
                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Education</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Inclusion</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Empowerment</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
                           <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Trust</span>
                       </div>
                    </div>
                  )}

                  {/* BACK OF CARD (Navy & Gold Corporate Style) */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-white rounded-[24px] overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans">
                      
                      {/* Lanyard Hole for Back */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-white/30 rounded-full border border-gray-300 shadow-inner z-30"></div>

                      {/* Angular Header Replica */}
                      <div className="w-full h-[140px] relative bg-white shrink-0">
                         <svg width="856" height="140" viewBox="0 0 856 140" className="absolute top-0 left-0 z-0">
                           <rect width="856" height="140" fill="#0b1f38" />
                           <polygon points="550,0 520,100 540,100 510,140 495,140 525,100 505,100 535,0" fill="#c5a059" />
                           <polygon points="540,0 510,100 530,100 500,140 480,140 510,100 490,100 520,0" fill="#ffffff" />
                         </svg>
                         
                         <div className="absolute inset-0 flex z-10">
                           <div className="w-[520px] flex items-center pl-16">
                              <span className="text-white text-2xl font-bold tracking-[0.15em] uppercase">Terms and Conditions</span>
                           </div>
                           <div className="flex-1 flex items-center justify-center gap-5 pl-8">
                              <div className="bg-white p-1.5 rounded-xl shadow-md">
                                <img src="/defineddomain.png" className="w-16 h-16 object-contain" />
                              </div>
                              <div className="text-white flex flex-col justify-center">
                                 <h3 className="font-extrabold text-2xl leading-none tracking-widest uppercase">Defined Domains</h3>
                                 <p className="text-[11px] tracking-[0.2em] text-[#c5a059] mt-1.5 uppercase font-bold">Inclusive School</p>
                              </div>
                           </div>
                         </div>
                      </div>

                      {/* Terms Body */}
                      <div className="flex-1 p-10 px-16 flex flex-col justify-between">
                         <div className="space-y-6">
                            <div className="flex items-start gap-5">
                               <div className="w-2 h-2 rounded-sm bg-[#c5a059] mt-2 shrink-0"></div>
                               <p className="text-[15px] text-gray-700 font-medium leading-relaxed pr-10">
                                  This card remains the property of Defined Domains and must be returned upon request. It is strictly non-transferable and issued for the sole purpose of student identification and campus security.
                               </p>
                            </div>
                            <div className="flex items-start gap-5">
                               <div className="w-2 h-2 rounded-sm bg-[#c5a059] mt-2 shrink-0"></div>
                               <p className="text-[15px] text-gray-700 font-medium leading-relaxed pr-10">
                                  Grants access to Special Needs Education, Learning Disabilities, Behavior Modification, Individualised Educational Programes, Speech & Occupational Therapies, and Basic Sign Language Training.
                               </p>
                            </div>
                         </div>

                         {/* Footer Info Block */}
                         <div className="flex justify-between items-end mt-4 pt-6 border-t border-gray-200">
                            
                            {/* Contact Grid */}
                            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[14px]">
                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Phone</span>
                               <span className="font-bold text-[#0b1f38]">: 071 451 5323 | 0772 944 837</span>
                               
                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Mail</span>
                               <span className="font-bold text-[#0b1f38]">: info@defineddomains.co.zw</span>
                               
                               <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center">Website</span>
                               <span className="font-bold text-[#0b1f38]">: www.defineddomains.co.zw</span>
                            </div>

                            {/* Signature Center */}
                            <div className="flex flex-col items-center pb-2 px-10">
                               <p className="text-4xl font-['Brush_Script_MT',_cursive,_serif] text-[#0b1f38] -mb-1 z-10 italic">Def. Dom.</p>
                               <span className="font-bold text-[14px] text-[#0b1f38] tracking-[0.2em] uppercase relative z-20">Principal</span>
                            </div>

                            {/* Barcode & Dates */}
                            <div className="flex flex-col items-end">
                               <div className="mb-4 border border-gray-300 p-2 flex justify-center bg-white rounded-lg">
                                  <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.8} height={40} displayValue={false} margin={0} background="transparent" />
                               </div>
                               <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12px]">
                                  <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] flex items-center">Joined Date</span>
                                  <span className="font-bold text-[#0b1f38]">: 28/MAY/2024</span>
                                  
                                  <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] flex items-center">Expire Date</span>
                                  <span className="font-bold text-[#0b1f38]">: 28/MAY/2026</span>
                                </div>
                            </div>

                         </div>
                      </div>

                    </div>
                  )}
                </div>
              </div>
              {/* END SCALING CONTAINER */}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
