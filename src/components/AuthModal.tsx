import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Reset step when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setMode('signin');
        setEmail('');
        setPassword('');
        setName('');
        setLoading(false);
        setGoogleLoading(false);
      }, 300);
      setError('');
    }
  }, [isOpen]);

  const saveUserToFirestore = async (user: any, displayName: string = '') => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(res.user);
      onClose(); // Close on success
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during authentication.');
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        await saveUserToFirestore(userCredential.user, name);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden min-h-[350px] flex"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center justify-center p-10 text-center"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg">
                <img
                  src="https://i.ibb.co/1GWbN1WD/blackgiftlogo.png"
                  alt="Blackgift Logo"
                  className="w-8 h-8 filter brightness-0 invert object-contain"
                />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                Become part of the Black Gift Family
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                Unlock exclusive tools, real-time analytics, and premium project management.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => { setMode('signin'); setStep(2); }}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform active:scale-95"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setMode('signup'); setStep(2); }}
                  className="flex-1 bg-[#f50057] hover:bg-[#d8004d] text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col p-8 pt-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-900">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </h2>
              </div>
              
              {error && <p className="text-red-500 text-sm mb-4 font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              
              <form className="space-y-4 flex-1" onSubmit={handleEmailAuth}>
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#f50057] focus:ring-0 outline-none transition-all font-medium text-gray-900 bg-gray-50 focus:bg-white" 
                      placeholder="John Doe" 
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#f50057] focus:ring-0 outline-none transition-all font-medium text-gray-900 bg-gray-50 focus:bg-white" 
                    placeholder="you@example.com" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#f50057] focus:ring-0 outline-none transition-all font-medium text-gray-900 bg-gray-50 focus:bg-white" 
                    placeholder="••••••••" 
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95 mt-2 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {!loading && (mode === 'signin' ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-xl transition-all active:scale-95"
              >
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
