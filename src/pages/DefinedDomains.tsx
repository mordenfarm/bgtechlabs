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
                  {/* FRONT OF CARD (White Theme with Green, Grey, and Purple Accents) */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-white rounded-[22px] overflow-hidden shadow-2xl flex flex-col font-sans border-2 border-slate-200 select-none">
                       {/* Subtle Background Watermark */}
                       <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] opacity-[0.035] pointer-events-none">
                          <img src="/defineddomain.png" className="w-full h-full object-contain grayscale" alt="" />
                       </div>

                       {/* HEADER (White base with purple/green accents) */}
                       <div className="relative w-full h-[92px] bg-white flex items-center justify-between px-7 shrink-0 border-b-[3.5px] border-purple-600">
                          {/* Lanyard Hole */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-slate-100 rounded-full border border-slate-300 shadow-inner z-20"></div>

                          {/* Brand Info */}
                          <div className="flex items-center gap-4 z-10">
                             <div className="w-14 h-14 bg-white rounded-xl p-1 flex items-center justify-center shadow-sm border border-slate-200">
                                <img src="/defineddomain.png" className="w-full h-full object-contain" alt="Logo" />
                             </div>
                             <div className="flex flex-col">
                                <h2 className="text-[26px] font-black text-slate-900 uppercase tracking-wider leading-none">Defined Domains</h2>
                                <p className="text-[11px] font-bold text-purple-700 uppercase tracking-[0.2em] mt-1.5">Inclusive Educational Institute</p>
                             </div>
                          </div>

                          {/* Security Badge */}
                          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-3.5 py-1.5 rounded-xl shadow-xs z-10">
                             <Shield className="w-5 h-5 text-emerald-600" />
                             <div className="flex flex-col text-left">
                                <span className="text-[10px] font-black leading-tight uppercase tracking-wider">Official ID</span>
                                <span className="text-[9px] font-bold text-emerald-600 leading-tight uppercase tracking-wider">Verified</span>
                             </div>
                          </div>
                       </div>

                       {/* BODY */}
                       <div className="flex flex-1 p-6 pt-5 gap-6 relative z-10">
                          {/* LEFT COLUMN (Photo, Student ID badge, Barcode) */}
                          <div className="w-[210px] flex flex-col shrink-0 items-center">
                             <div className="w-[195px] h-[225px] bg-slate-100 rounded-2xl overflow-hidden border-2 border-purple-500 shadow-md relative">
                                {newlyAddedStudent.image ? (
                                   <img src={newlyAddedStudent.image} className="w-full h-full object-cover" alt="Student" />
                                ) : (
                                   <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                      <User className="w-12 h-12 text-slate-300" />
                                      <span className="text-xs font-bold uppercase tracking-wider">Photo</span>
                                   </div>
                                )}
                             </div>

                             {/* Student ID Pill */}
                             <div className="w-[195px] bg-slate-900 text-white text-center py-2 px-2 rounded-xl shadow-sm mt-2.5 border border-slate-700">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Student ID</p>
                                <p className="text-[15px] font-mono font-black tracking-wider text-white mt-0.5">{newlyAddedStudent.id.toUpperCase()}</p>
                             </div>

                             {/* Barcode */}
                             <div className="w-[195px] mt-2.5 bg-white p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                                <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.5} height={28} displayValue={false} margin={0} background="transparent" />
                                <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest mt-0.5">{newlyAddedStudent.id.toUpperCase()}</span>
                             </div>
                          </div>

                          {/* RIGHT COLUMN (Name, Grade, Details, Prominent QR, Signature) */}
                          <div className="flex-1 flex flex-col justify-between">
                             {/* Name & Grade */}
                             <div>
                                <h3 className="text-[30px] font-black text-slate-900 uppercase leading-tight tracking-tight">
                                   {newlyAddedStudent.name} {newlyAddedStudent.surname}
                                </h3>
                                <div className="flex items-center gap-2.5 mt-2">
                                   <span className="bg-purple-100 text-purple-800 border border-purple-300 text-[11px] font-bold px-3 py-0.5 rounded-lg uppercase tracking-wider">
                                      {newlyAddedStudent.grade}
                                   </span>
                                   <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-3 py-0.5 rounded-lg uppercase tracking-wider">
                                      Special Needs & Inclusion
                                   </span>
                                </div>
                             </div>

                             {/* Details Grid */}
                             <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                <div className="flex items-start gap-2.5">
                                   <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                                   <div>
                                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Home Address</p>
                                      <p className="text-[12px] font-bold text-slate-700 leading-snug line-clamp-1">{newlyAddedStudent.address}</p>
                                   </div>
                                </div>
                                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[11px]">
                                   <div>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-1.5">Issued:</span>
                                      <span className="font-bold text-slate-700">28 MAY 2024</span>
                                   </div>
                                   <div>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-1.5">Expires:</span>
                                      <span className="font-bold text-red-600">28 MAY 2026</span>
                                   </div>
                                </div>
                             </div>

                             {/* Signature & Prominent QR Row */}
                             <div className="flex justify-between items-center bg-white p-3 rounded-2xl border-2 border-purple-500 shadow-sm">
                                {/* Signature */}
                                <div className="flex flex-col items-center px-2">
                                   <p className="text-3xl font-['Brush_Script_MT',_cursive,_serif] text-purple-900 -mb-1 italic">Def. Dom.</p>
                                   <div className="w-36 border-t-[1.5px] border-slate-400"></div>
                                   <span className="font-bold text-[8.5px] text-slate-500 uppercase mt-1 tracking-widest">Authorized Signature</span>
                                </div>

                                {/* PROMINENT QR CODE */}
                                <div className="flex items-center gap-3.5 pl-3 border-l border-slate-200">
                                   <div className="bg-white p-1.5 border-2 border-slate-800 rounded-xl shadow-xs">
                                      <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={78} fgColor="#0f172a" />
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-center shadow-xs">
                                         Scan to Verify
                                      </span>
                                      <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-tight mt-1">Official ID</span>
                                      <span className="text-[9px] font-medium text-slate-500">Live Database</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* FOOTER */}
                       <div className="w-full h-[38px] bg-slate-900 shrink-0 flex items-center justify-between px-7 border-t-2 border-emerald-500 z-20">
                          <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">Defined Domains Institute</span>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
                             <span>Education</span>
                             <span className="text-purple-400">•</span>
                             <span>Inclusion</span>
                             <span className="text-purple-400">•</span>
                             <span>Empowerment</span>
                             <span className="text-purple-400">•</span>
                             <span>Trust</span>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* BACK OF CARD (White Theme with Green, Grey, and Purple Accents) */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-white rounded-[22px] overflow-hidden shadow-2xl border-2 border-slate-200 flex flex-col font-sans select-none">
                       
                       {/* Lanyard Hole for Back */}
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-slate-100 rounded-full border border-slate-300 shadow-inner z-30"></div>

                       {/* Header */}
                       <div className="w-full h-[88px] bg-slate-900 shrink-0 flex items-center justify-between px-7 border-b-4 border-emerald-500">
                          <div className="flex items-center gap-3.5">
                             <div className="bg-white p-1 rounded-lg shadow-sm">
                                <img src="/defineddomain.png" className="w-10 h-10 object-contain" alt="Logo" />
                             </div>
                             <div className="text-white flex flex-col">
                                <h3 className="font-black text-xl leading-none tracking-wider uppercase">Defined Domains</h3>
                                <p className="text-[10px] tracking-[0.2em] text-emerald-400 mt-1 uppercase font-bold">Terms of Use & Student Record</p>
                             </div>
                          </div>
                          <div className="bg-purple-900/60 border border-purple-400/40 px-3 py-1 rounded-lg">
                             <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">Campus Security</span>
                          </div>
                       </div>

                       {/* Terms Body */}
                       <div className="flex-1 p-5 px-7 flex gap-6 justify-between">
                          {/* Left Column: Terms & Skills */}
                          <div className="flex-1 flex flex-col justify-between pr-4 border-r border-slate-200">
                             <div>
                                <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider mb-2">Terms and Conditions</h4>
                                <div className="space-y-1.5 text-[11px] text-slate-600 font-medium leading-relaxed">
                                   <p className="flex items-start gap-2">
                                      <span className="text-emerald-600 font-black">•</span>
                                      This card is the property of Defined Domains and must be presented upon request. Strictly non-transferable.
                                   </p>
                                   <p className="flex items-start gap-2">
                                      <span className="text-emerald-600 font-black">•</span>
                                      Grants access to Special Needs Education, IEP Programs, Therapies, and Campus Facilities.
                                   </p>
                                </div>
                             </div>

                             {/* Curriculum Badges */}
                             <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Curriculum & Therapies</h4>
                                <div className="grid grid-cols-2 gap-1.5">
                                   {[
                                      'Special Needs Education',
                                      'Learning Disabilities',
                                      'Behavior Modification',
                                      'IEP Programs',
                                      'Speech & OT Therapies',
                                      'Basic Sign Language'
                                   ].map((skill, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                                         <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                            <span className="text-white text-[8px] font-bold">✓</span>
                                         </div>
                                         <span className="text-[9.5px] font-bold text-slate-700 truncate">{skill}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          {/* Right Column: Prominent QR & Contact */}
                          <div className="w-[280px] flex flex-col justify-between items-center bg-purple-50/70 border-2 border-purple-500 rounded-2xl p-3.5 shadow-xs">
                             <div className="text-center w-full">
                                <p className="text-[10px] font-black text-purple-900 uppercase tracking-wider mb-1.5">Identity Verification</p>
                                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 inline-block">
                                   <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={105} fgColor="#0f172a" />
                                </div>
                                <p className="text-[9px] text-slate-500 font-semibold mt-1">Scan for Verified Profile</p>
                             </div>

                             {/* Contact Details */}
                             <div className="w-full pt-2 border-t border-purple-200 text-center text-[10.5px]">
                                <p className="font-bold text-slate-900">Phone: 071 451 5323 | 0772 944 837</p>
                                <p className="font-bold text-purple-700">info@defineddomains.co.zw</p>
                                <p className="text-[9.5px] text-slate-500 font-medium">24 Eliot Street, Rhodene, Masvingo</p>
                             </div>
                          </div>
                       </div>

                       {/* Footer */}
                       <div className="w-full h-[38px] bg-slate-900 text-white px-7 flex items-center justify-between border-t-2 border-purple-500 z-20">
                          <span className="text-[10px] font-bold text-slate-300 uppercase font-mono tracking-widest">ID: {newlyAddedStudent.id.toUpperCase()}</span>
                          <span className="text-[9.5px] font-bold text-emerald-400 uppercase tracking-wider">Property of Defined Domains Institute</span>
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
