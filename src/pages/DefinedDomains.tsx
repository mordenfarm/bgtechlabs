import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { Seo } from '../components/Seo';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { 
  QrCode, UserPlus, Users, ChevronLeft, ChevronRight, 
  Download, Repeat, MapPin, User, Shield, GraduationCap, 
  Search, CheckCircle2, ArrowRight, ExternalLink, PlusCircle, Check
} from 'lucide-react';

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

  // Scan & Search State
  const [scanLookup, setScanLookup] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [scanNotFound, setScanNotFound] = useState(false);

  // Directory Search & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Card view state
  const [showingBack, setShowingBack] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(1);

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

  useEffect(() => {
    const handleResize = () => {
      if (cardContainerRef.current) {
        const containerWidth = cardContainerRef.current.clientWidth;
        // 800px target width scaled to fit container
        const scale = Math.min(1, (containerWidth - 24) / 856);
        setCardScale(scale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [newlyAddedStudent, showingBack, activeTab]);

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

  const handleScanLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanLookup.trim()) return;
    setIsValidating(true);
    setScannedStudent(null);
    setScanNotFound(false);

    setTimeout(() => {
      setIsValidating(false);
      const queryStr = scanLookup.trim().toLowerCase();
      const found = students.find(s => 
        s.slug.toLowerCase() === queryStr ||
        s.id.toLowerCase() === queryStr ||
        s.name.toLowerCase() === queryStr ||
        s.surname.toLowerCase() === queryStr ||
        `${s.name} ${s.surname}`.toLowerCase() === queryStr
      );
      if (found) {
        setScannedStudent(found);
      } else {
        setScanNotFound(true);
      }
    }, 600);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans selection:bg-purple-200 pb-20 md:pb-12">
      <Seo title="Defined Domains | ID Verification" description="ID Verification and Management System" />
      
      {/* Header with Desktop Navigation */}
      <header className="w-full bg-white border-b border-gray-200 py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <img src="/defineddomain.png" alt="Defined Domains Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-wider uppercase leading-tight">
              DEFINED DOMAINS
            </h1>
            <span className="text-[10px] sm:text-xs font-bold text-purple-700 tracking-wider uppercase leading-tight">
              ID Verification System
            </span>
          </div>
        </div>

        {/* Desktop Header Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'add'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Student</span>
          </button>
          
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'scan'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Verify ID</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'list'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Directory ({students.length})</span>
          </button>
        </nav>
      </header>

      <main className="max-w-[1200px] mx-auto p-4 sm:p-6 md:p-8">
        
        {/* Tab Content */}
        <div className="w-full">
          
          {/* 1. Add Student Tab (Form View) */}
          {activeTab === 'add' && !newlyAddedStudent && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Register Student</h2>
                    <p className="text-xs text-slate-500 font-medium">Generate instant institutional ID card & QR credentials</p>
                  </div>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name</label>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all" placeholder="e.g. John" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Surname</label>
                      <input required type="text" value={surname} onChange={e => setSurname(e.target.value)} className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all" placeholder="e.g. Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Grade / Class</label>
                    <input required type="text" value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all" placeholder="e.g. Form 4A" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Home Address</label>
                    <textarea required value={address} onChange={e => setAddress(e.target.value)} rows={2} className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all resize-none" placeholder="e.g. 24 Eliot Street, Rhodene, Masvingo" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Photo</label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-purple-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-purple-50/50 transition-all">
                        <span className="text-xs text-slate-600 font-semibold">Upload student photo</span>
                        <input required type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      {image && (
                        <div className="w-16 h-16 rounded-xl border-2 border-purple-500 overflow-hidden shrink-0 shadow-sm">
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all mt-2 flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Generate Student ID</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* 1b. Add Student Tab (Generated ID Card View) */}
          {activeTab === 'add' && newlyAddedStudent && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
              
              {/* Card Action Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
                <button 
                  onClick={() => setShowingBack(!showingBack)} 
                  className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition-all text-xs sm:text-sm"
                >
                  <Repeat className="w-4 h-4 text-purple-600" />
                  {showingBack ? 'See Front' : 'See Back'}
                </button>

                <button 
                  onClick={downloadID}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl shadow-sm transition-all disabled:opacity-50 text-xs sm:text-sm"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Downloading...' : 'Download HD'}
                </button>

                <button 
                  onClick={() => {
                    setNewlyAddedStudent(null);
                    setShowingBack(false);
                  }} 
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl transition-all text-xs sm:text-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Register Another</span>
                </button>

                <a 
                  href={`/defined-domains/${newlyAddedStudent.slug}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold px-4 py-2 rounded-xl transition-all text-xs sm:text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Portal</span>
                </a>
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
                  {/* FRONT OF CARD (Exact Match to Reference with Green, Purple, Dark Navy on White Theme) */}
                  {!showingBack && (
                    <div id="id-card-front" className="absolute inset-0 bg-white rounded-[22px] overflow-hidden shadow-2xl flex flex-col font-sans border-2 border-slate-200 select-none">
                      {/* Subtle Background Watermark on Right */}
                      <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[370px] h-[370px] opacity-[0.045] pointer-events-none z-0">
                        <img src="/defineddomain.png" className="w-full h-full object-contain grayscale" alt="" />
                      </div>

                      {/* TOP HEADER (Deep Navy Bar with Dynamic Green/Purple Swoop) */}
                      <div className="relative w-full h-[106px] bg-[#0b1b36] flex items-center justify-between px-8 shrink-0 z-10">
                        {/* Lanyard Hole */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/20 rounded-full border border-white/30 shadow-inner z-30"></div>

                        {/* Diagonal/Swoop Accent Layer along bottom of header */}
                        <div className="absolute -bottom-0.5 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
                          <svg className="w-full h-6 block" viewBox="0 0 856 24" fill="none" preserveAspectRatio="none">
                            <path d="M0,0 L856,18 L856,24 L0,24 Z" fill="#ffffff" />
                            <path d="M0,0 L856,12 L856,18 L0,6 Z" fill="#16a34a" />
                            <path d="M0,0 L856,6 L856,12 L0,0 Z" fill="#7c3aed" />
                          </svg>
                        </div>

                        {/* Brand Logo & Name */}
                        <div className="flex items-center gap-4 z-10 -mt-2">
                          <div className="w-14 h-14 bg-white rounded-full p-1.5 flex items-center justify-center shadow-md border-2 border-emerald-500">
                            <img src="/defineddomain.png" className="w-full h-full object-contain" alt="Defined Domains Logo" />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-[25px] font-black text-white uppercase tracking-wider leading-none">Defined Domains</h2>
                            <p className="text-[11px] font-extrabold text-[#4ade80] uppercase tracking-[0.18em] mt-1.5">Inclusive Educational Institute</p>
                          </div>
                        </div>

                        {/* Verified & Secured Badge on Top Right */}
                        <div className="flex items-center gap-3 border border-emerald-400/40 bg-emerald-950/40 px-3.5 py-1.5 rounded-xl z-10 -mt-2 shadow-xs">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-[#4ade80]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black text-white leading-tight uppercase tracking-wider">VERIFIED</span>
                            <span className="text-[9px] font-black text-[#4ade80] leading-tight uppercase tracking-wider">& SECURED</span>
                          </div>
                        </div>
                      </div>

                      {/* CARD BODY */}
                      <div className="flex flex-1 px-8 py-5 gap-7 relative z-10 items-stretch">
                        {/* LEFT COLUMN: Photo, Connected Navy ID Box, Barcode */}
                        <div className="w-[220px] flex flex-col shrink-0 items-center justify-between">
                          {/* Photo & Connected ID Box Container */}
                          <div className="w-[210px] flex flex-col rounded-[16px] overflow-hidden border-2 border-[#0b1b36] shadow-md bg-slate-100">
                            {/* Photo */}
                            <div className="w-full h-[200px] bg-slate-200 relative overflow-hidden">
                              {newlyAddedStudent.image ? (
                                <img src={newlyAddedStudent.image} className="w-full h-full object-cover" alt="Student" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                  <User className="w-12 h-12 text-slate-300" />
                                  <span className="text-xs font-bold uppercase tracking-wider">Photo</span>
                                </div>
                              )}
                            </div>

                            {/* Connected Student ID Box */}
                            <div className="bg-[#0b1b36] py-2 px-2 text-center border-t-2 border-emerald-500">
                              <p className="text-[9.5px] font-black uppercase tracking-widest text-[#4ade80]">STUDENT ID</p>
                              <p className="text-[17px] font-mono font-black tracking-wider text-white leading-tight mt-0.5">{newlyAddedStudent.id.toUpperCase()}</p>
                            </div>
                          </div>

                          {/* Barcode Block */}
                          <div className="w-[210px] bg-white p-2 rounded-xl border border-slate-300 flex flex-col items-center justify-center shadow-xs">
                            <Barcode value={newlyAddedStudent.id.toUpperCase()} width={1.6} height={32} displayValue={false} margin={0} background="transparent" />
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Name, Role/Grade, 3 Details Rows, Signature & QR Row */}
                        <div className="flex-1 flex flex-col justify-between pl-1">
                          {/* Name & Title */}
                          <div>
                            <h3 className="text-[34px] font-black text-[#0b1b36] uppercase tracking-tight leading-none line-clamp-1">
                              {newlyAddedStudent.name} {newlyAddedStudent.surname}
                            </h3>
                            <p className="text-[15px] font-extrabold text-[#16a34a] uppercase tracking-wider mt-2">
                              GRADE – {newlyAddedStudent.grade.toUpperCase()}
                            </p>
                          </div>

                          {/* 3 Information Rows with Dark Navy Round Icons */}
                          <div className="space-y-2.5 my-auto py-1">
                            {/* Row 1: Department */}
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0b1b36] text-white flex items-center justify-center shrink-0 shadow-xs">
                                <User className="w-4 h-4 text-[#4ade80]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9.5px] font-black text-[#0b1b36] uppercase tracking-wider leading-none">DEPARTMENT</p>
                                <p className="text-[12px] font-semibold text-slate-700 leading-snug truncate mt-0.5">Special Needs Education & Inclusive Learning</p>
                              </div>
                            </div>

                            {/* Row 2: Address */}
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0b1b36] text-white flex items-center justify-center shrink-0 shadow-xs">
                                <MapPin className="w-4 h-4 text-purple-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9.5px] font-black text-[#0b1b36] uppercase tracking-wider leading-none">CAMPUS / ADDRESS</p>
                                <p className="text-[12px] font-semibold text-slate-700 leading-snug truncate mt-0.5">{newlyAddedStudent.address}</p>
                              </div>
                            </div>

                            {/* Row 3: Access Level */}
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0b1b36] text-white flex items-center justify-center shrink-0 shadow-xs">
                                <GraduationCap className="w-4 h-4 text-[#4ade80]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9.5px] font-black text-[#0b1b36] uppercase tracking-wider leading-none">ACCESS LEVEL</p>
                                <p className="text-[12px] font-semibold text-slate-700 leading-snug truncate mt-0.5">IEP Programs, Specialized Therapies & Campus Access</p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row: Signature, Date, and Prominent QR */}
                          <div className="flex items-end justify-between pt-2 border-t border-slate-200">
                            {/* Authorized Signature */}
                            <div className="flex flex-col items-center">
                              <p className="text-[28px] font-['Brush_Script_MT',_cursive,_serif] text-[#0b1b36] leading-none mb-1 italic">Def. Dom.</p>
                              <div className="w-32 border-t-[1.5px] border-slate-600"></div>
                              <span className="font-extrabold text-[8.5px] text-slate-700 uppercase mt-1 tracking-wider">AUTHORIZED SIGNATURE</span>
                            </div>

                            {/* Divider Line */}
                            <div className="w-[1px] h-11 bg-slate-300 mx-2"></div>

                            {/* Issue & Expiry Dates */}
                            <div className="flex flex-col justify-center text-left">
                              <p className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">ISSUE DATE</p>
                              <p className="text-[12px] font-bold text-slate-800 leading-snug mt-0.5">28 MAY 2024</p>
                              <p className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest leading-none mt-1">EXPIRY DATE</p>
                              <p className="text-[11px] font-bold text-red-600 leading-none mt-0.5">28 MAY 2026</p>
                            </div>

                            {/* Prominent QR Code with Badge */}
                            <div className="flex flex-col items-center shrink-0 pl-2">
                              <div className="bg-white p-1 border-2 border-[#0b1b36] rounded-xl shadow-xs">
                                <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={72} fgColor="#0b1b36" />
                              </div>
                              <div className="bg-emerald-600 text-white text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-center mt-1 shadow-xs">
                                SCAN TO VERIFY
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER BAR (Deep Navy with Green Core Values) */}
                      <div className="w-full h-[34px] bg-[#0b1b36] shrink-0 flex items-center justify-center px-8 border-t-2 border-emerald-500 z-20">
                        <div className="flex items-center gap-4 text-[10.5px] font-extrabold text-[#4ade80] uppercase tracking-[0.25em]">
                          <span>INTEGRITY</span>
                          <span className="text-purple-400">•</span>
                          <span>INCLUSION</span>
                          <span className="text-purple-400">•</span>
                          <span>EMPOWERMENT</span>
                          <span className="text-purple-400">•</span>
                          <span>SECURITY</span>
                          <span className="text-purple-400">•</span>
                          <span>TRUST</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BACK OF CARD (Matching Theme with Green, Purple, Dark Navy on White) */}
                  {showingBack && (
                    <div id="id-card-back" className="absolute inset-0 bg-white rounded-[22px] overflow-hidden shadow-2xl border-2 border-slate-200 flex flex-col font-sans select-none">
                      {/* Lanyard Hole for Back */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/20 rounded-full border border-white/30 shadow-inner z-30"></div>

                      {/* Top Header */}
                      <div className="relative w-full h-[100px] bg-[#0b1b36] shrink-0 flex items-center justify-between px-8 z-10">
                        {/* Swoop accent along bottom */}
                        <div className="absolute -bottom-0.5 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
                          <svg className="w-full h-6 block" viewBox="0 0 856 24" fill="none" preserveAspectRatio="none">
                            <path d="M0,0 L856,18 L856,24 L0,24 Z" fill="#ffffff" />
                            <path d="M0,0 L856,12 L856,18 L0,6 Z" fill="#16a34a" />
                            <path d="M0,0 L856,6 L856,12 L0,0 Z" fill="#7c3aed" />
                          </svg>
                        </div>

                        <div className="flex items-center gap-4 z-10 -mt-2">
                          <div className="w-12 h-12 bg-white rounded-full p-1.5 flex items-center justify-center shadow-md border-2 border-emerald-500">
                            <img src="/defineddomain.png" className="w-full h-full object-contain" alt="Logo" />
                          </div>
                          <div className="text-white flex flex-col">
                            <h3 className="font-black text-[22px] leading-none tracking-wider uppercase">Defined Domains</h3>
                            <p className="text-[10px] tracking-[0.2em] text-[#4ade80] mt-1 uppercase font-bold">Terms of Use & Student Record</p>
                          </div>
                        </div>

                        <div className="bg-purple-900/60 border border-purple-400/40 px-3.5 py-1.5 rounded-xl z-10 -mt-2">
                          <span className="text-[10px] font-black text-purple-200 uppercase tracking-wider">Campus Security</span>
                        </div>
                      </div>

                      {/* Terms & Verification Body */}
                      <div className="flex-1 p-6 px-8 flex gap-7 justify-between items-center">
                        {/* Left Column: Terms & Authorized Curriculum */}
                        <div className="flex-1 flex flex-col justify-between pr-4 border-r border-slate-200 h-full">
                          <div>
                            <h4 className="text-xs font-black text-[#0b1b36] uppercase tracking-wider mb-2">Terms and Conditions</h4>
                            <div className="space-y-2 text-[11px] text-slate-600 font-medium leading-relaxed">
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
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Authorized Programs & Therapies</h4>
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
                                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                    <span className="text-white text-[8px] font-bold">✓</span>
                                  </div>
                                  <span className="text-[9.5px] font-bold text-slate-700 truncate">{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Prominent QR & Contact Info */}
                        <div className="w-[280px] flex flex-col justify-between items-center bg-slate-50 border-2 border-[#0b1b36] rounded-2xl p-4 shadow-xs h-full">
                          <div className="text-center w-full">
                            <p className="text-[10px] font-black text-[#0b1b36] uppercase tracking-wider mb-1.5">Identity Verification</p>
                            <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-300 inline-block">
                              <QRCode value={`https://${window.location.host}/defined-domains/${newlyAddedStudent.slug}`} size={98} fgColor="#0b1b36" />
                            </div>
                            <p className="text-[9.5px] text-emerald-700 font-bold mt-1">Scan for Live Profile Verification</p>
                          </div>

                          {/* Contact Details */}
                          <div className="w-full pt-2 border-t border-slate-200 text-center text-[10.5px]">
                            <p className="font-black text-slate-900">Phone: 071 451 5323 | 0772 944 837</p>
                            <p className="font-bold text-purple-700">info@defineddomains.co.zw</p>
                            <p className="text-[9.5px] text-slate-500 font-medium mt-0.5">24 Eliot Street, Rhodene, Masvingo</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Bar */}
                      <div className="w-full h-[34px] bg-[#0b1b36] text-white px-8 flex items-center justify-between border-t-2 border-emerald-500 z-20">
                        <span className="text-[10px] font-bold text-slate-300 uppercase font-mono tracking-widest">ID: {newlyAddedStudent.id.toUpperCase()}</span>
                        <span className="text-[9.5px] font-bold text-[#4ade80] uppercase tracking-wider">Property of Defined Domains Institute</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* END SCALING CONTAINER */}
            </motion.div>
          )}

          {/* 2. Scan & Verify Tab */}
          {activeTab === 'scan' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Verify Student Identity</h2>
                    <p className="text-xs text-slate-500 font-medium">Scan QR code or search by Student ID or Slug</p>
                  </div>
                </div>

                {/* Scan / Lookup Form */}
                <form onSubmit={handleScanLookup} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Enter Student ID or Full Name</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={scanLookup} 
                        onChange={e => {
                          setScanLookup(e.target.value);
                          setScanNotFound(false);
                        }} 
                        placeholder="e.g. john-doe or 1714515323" 
                        className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isValidating}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{isValidating ? 'Validating Registry...' : 'Verify Identity Record'}</span>
                  </button>
                </form>

                {/* Loading State */}
                {isValidating && (
                  <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Checking National Registry...</p>
                  </div>
                )}

                {/* Scanned Student Profile Result */}
                {!isValidating && scannedStudent && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-400">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-4 pb-2 border-b border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Authentic & Verified Student Identity</span>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-24 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0 shadow-xs">
                        {scannedStudent.image ? (
                          <img src={scannedStudent.image} alt={scannedStudent.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] font-bold">No Photo</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-slate-900 uppercase leading-tight truncate">
                          {scannedStudent.name} {scannedStudent.surname}
                        </h3>
                        <p className="text-xs font-bold text-purple-700 uppercase mt-0.5">{scannedStudent.grade}</p>
                        <p className="text-[11px] font-mono text-slate-500 font-bold mt-1">ID: {scannedStudent.id.toUpperCase()}</p>
                        <p className="text-[11px] text-slate-600 truncate mt-0.5">{scannedStudent.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-emerald-200">
                      <button
                        onClick={() => {
                          setNewlyAddedStudent(scannedStudent);
                          setActiveTab('add');
                        }}
                        className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Repeat className="w-3.5 h-3.5 text-purple-600" />
                        <span>View ID Card</span>
                      </button>

                      <a
                        href={`/defined-domains/${scannedStudent.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Verification</span>
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Not Found Notice */}
                {!isValidating && scanNotFound && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                    <p className="text-xs font-bold text-red-700 uppercase">Student Record Not Found</p>
                    <p className="text-[11px] text-red-500 mt-0.5">Please check the ID number or slug spelling and try again.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* 3. Student Directory Tab */}
          {activeTab === 'list' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Student Directory</h2>
                      <p className="text-xs text-slate-500 font-medium">Total Registered Students: {students.length}</p>
                    </div>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search students..."
                      className="w-full bg-slate-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  </div>
                </div>

                {/* Students Grid / List */}
                {currentStudents.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm font-bold text-slate-500">No students found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="mt-3 inline-flex items-center gap-1.5 bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Register First Student</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentStudents.map((st) => (
                      <div key={st.slug} className="bg-slate-50 hover:bg-purple-50/40 border border-slate-200 rounded-xl p-4 flex flex-col justify-between transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-14 h-16 rounded-lg bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
                            {st.image ? (
                              <img src={st.image} alt={st.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px] font-bold">No Photo</div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-black text-slate-900 uppercase leading-tight truncate">
                              {st.name} {st.surname}
                            </h4>
                            <p className="text-xs font-bold text-purple-700 uppercase mt-0.5 truncate">{st.grade}</p>
                            <p className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">ID: {st.id.toUpperCase()}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex gap-2">
                          <button
                            onClick={() => {
                              setNewlyAddedStudent(st);
                              setActiveTab('add');
                            }}
                            className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-1.5 rounded-lg text-xs transition-all shadow-xs flex items-center justify-center gap-1"
                          >
                            <Repeat className="w-3 h-3 text-purple-600" />
                            <span>View Card</span>
                          </button>
                          <a
                            href={`/defined-domains/${st.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold p-1.5 rounded-lg transition-all"
                            title="Open Public Verification Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 px-3 py-1.5 rounded-lg bg-slate-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    <span className="text-xs font-bold text-slate-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 px-3 py-1.5 rounded-lg bg-slate-100"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center shadow-lg md:hidden">
        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'add'
              ? 'text-purple-700 font-bold bg-purple-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserPlus className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Register</span>
        </button>

        <button
          onClick={() => setActiveTab('scan')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'scan'
              ? 'text-emerald-700 font-bold bg-emerald-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Verify ID</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'list'
              ? 'text-purple-700 font-bold bg-purple-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Users className="w-5 h-5" />
            {students.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {students.length > 99 ? '99+' : students.length}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider">Directory</span>
        </button>
      </nav>
    </div>
  );
}
