import re

with open('src/pages/DefinedDomainsPublic.tsx', 'r') as f:
    content = f.read()

new_public_content = """import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Seo } from '../components/Seo';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Student {
  id: string;
  name: string;
  surname: string;
  grade: string;
  address: string;
  expiryDate: string;
  image: string;
  slug: string;
}

export function DefinedDomainsPublic() {
  const { studentId } = useParams<{ studentId: string }>();
  const [isValidating, setIsValidating] = useState(true);
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setIsValidating(false);
        return;
      }
      try {
        const docRef = doc(db, 'dd_students', studentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStudentData(docSnap.data() as Student);
        }
      } catch (err) {
        console.error("Error fetching validation data", err);
      } finally {
        setIsValidating(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col font-sans selection:bg-purple-200">
      <Seo title={`Verify ID | ${studentId}`} description="Defined Domains ID Verification" />
      
      {/* Header */}
      <header className="w-full bg-[#0f172a] shadow-md py-4 px-6 flex justify-center border-b-4 border-[#16a34a]">
        <div className="flex items-center gap-3">
          <img src="/defineddomain.png" alt="Defined Domains Logo" className="w-10 h-10 object-contain bg-white rounded p-1" />
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white uppercase tracking-widest leading-none">Defined Domains</h1>
            <span className="text-[10px] text-[#4ade80] font-bold uppercase tracking-widest mt-0.5">Verification Portal</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-10 flex flex-col items-center relative overflow-hidden">
          
          {isValidating ? (
            <div className="flex flex-col items-center py-12">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-[#16a34a] rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest">Verifying Identity...</h2>
              <p className="text-gray-500 mt-2 text-center text-sm">Securely checking national database</p>
            </div>
          ) : studentData ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center w-full"
            >
              <div className="w-full flex items-start gap-4 mb-8 bg-[#f8faf9] p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#16a34a]"></div>
                
                <div className="w-24 h-32 rounded-lg bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-md relative">
                  {studentData.image ? (
                    <img src={studentData.image} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase text-center">No Photo</div>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Student</p>
                  <h3 className="text-xl font-black text-[#0f172a] uppercase leading-tight mb-1">
                    {studentData.name}<br/>{studentData.surname}
                  </h3>
                  <div className="mt-3">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Grade</p>
                    <p className="text-sm font-bold text-[#16a34a]">{studentData.grade}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">ID Number</p>
                  <p className="text-sm font-bold text-[#0f172a] font-mono">{studentData.id.toUpperCase()}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Valid Until</p>
                  <p className="text-sm font-bold text-red-600">{studentData.expiryDate}</p>
                </div>
              </div>

              <motion.div 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
                className="w-full flex items-center justify-center gap-3 bg-green-50 py-3 rounded-xl border border-green-200"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-700 font-bold uppercase tracking-widest text-sm">Valid Identity</span>
              </motion.div>

              <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
                <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">Secured by Blackgift Tech Labs</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center w-full py-6"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 text-center uppercase tracking-tight">ID Not Found</h2>
              <p className="text-gray-500 text-center text-sm font-medium">This ID does not exist in the national registry or has been revoked.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
"""

with open('src/pages/DefinedDomainsPublic.tsx', 'w') as f:
    f.write(new_public_content)
