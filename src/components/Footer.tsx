import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Twitter, Linkedin, Youtube, ChevronDown, X, Scan } from 'lucide-react';
import React, { useState } from 'react';

export function Footer() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setClickCount(0);
      setShowAdminPrompt(true);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1677') {
      setShowAdminPrompt(false);
      setPin('');
      setPinError(false);
      navigate('/admin-dashboard');
    } else {
      setPinError(true);
    }
  };


  return (
    <footer className="w-full bg-[#EEEEEE] pt-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="flex items-center justify-center w-9 h-9 bg-black rounded-full flex-shrink-0 overflow-hidden">
                <img src="https://i.ibb.co/1GWbN1WD/blackgiftlogo.png" alt="Blackgift Logo" className="h-[20px] w-[20px] object-contain filter brightness-0 invert" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-sans text-[15px] lg:text-lg tracking-widest text-[#0B3A5A] leading-none uppercase font-extrabold whitespace-nowrap">BLACKGIFT <span className="font-medium text-blue-500">TECH LABS</span></span>
              </div>
            </Link>
            <ul className="space-y-4 text-gray-700 font-bold mb-8">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Digital Transformation Engineering</h3>
              <ul className="space-y-3 text-gray-600 text-xs font-semibold">
                <li><Link to="/services/custom-software" className="hover:text-blue-600 transition-colors hover:underline">Custom Software Development</Link></li>
                <li><Link to="/services/business-process" className="hover:text-blue-600 transition-colors hover:underline">Business Process Automation</Link></li>
                <li><Link to="/services/crm" className="hover:text-blue-600 transition-colors hover:underline">CRM Services</Link></li>
                <li><Link to="/services/erp" className="hover:text-blue-600 transition-colors hover:underline">ERP Services</Link></li>
                <li><Link to="/services/ecommerce" className="hover:text-blue-600 transition-colors hover:underline">Digital Commerce</Link></li>
                <li><Link to="/services/system-integration" className="hover:text-blue-600 transition-colors hover:underline">System Integration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Data Engineering</h3>
              <ul className="space-y-3 text-gray-600 text-xs font-semibold">
                <li><Link to="/services/databricks" className="hover:text-blue-600 transition-colors hover:underline">Databricks Consulting</Link></li>
                <li><Link to="/services/data-platform" className="hover:text-blue-600 transition-colors hover:underline">Data Platform Modernization</Link></li>
                <li><Link to="/services/data-migration" className="hover:text-blue-600 transition-colors hover:underline">Data Migration Services</Link></li>
                <li><Link to="/services/data-warehouse" className="hover:text-blue-600 transition-colors hover:underline">Data Warehouse Consulting</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-8">
             <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Mobile App Development</h3>
              <ul className="space-y-3 text-gray-600 text-xs font-semibold">
                <li><Link to="/services/native-app" className="hover:text-blue-600 transition-colors hover:underline">Native App Development</Link></li>
                <li><Link to="/services/cross-platform" className="hover:text-blue-600 transition-colors hover:underline">Cross-Platform App Development</Link></li>
                <li><Link to="/services/legacy" className="hover:text-blue-600 transition-colors hover:underline">Legacy App Modernization</Link></li>
                <li><Link to="/services/pwa" className="hover:text-blue-600 transition-colors hover:underline">Progressive Web App Development</Link></li>
                <li><Link to="/services/bluetooth" className="hover:text-blue-600 transition-colors hover:underline">Bluetooth-enabled Apps</Link></li>
                <li><Link to="/services/smart-tv" className="hover:text-blue-600 transition-colors hover:underline">Smart TV Apps</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Next-Gen Engineering</h3>
              <ul className="space-y-3 text-gray-600 text-xs font-semibold">
                <li><Link to="/services/ai-integration" className="hover:text-blue-600 transition-colors hover:underline">AI Integration</Link></li>
                <li><Link to="/services/generative-ai" className="hover:text-blue-600 transition-colors hover:underline">Generative AI</Link></li>
                <li><Link to="/services/iot" className="hover:text-blue-600 transition-colors hover:underline">Internet of Things (IoT)</Link></li>
                <li><Link to="/services/platform-engineering" className="hover:text-blue-600 transition-colors hover:underline">Platform Engineering</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Subscribe to our Newsletter!</h3>
            <form className="flex w-full mb-8">
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 outline-none text-sm text-gray-700 bg-white" />
              <button type="submit" className="bg-[#f0c14b] text-white px-4 py-3 hover:bg-[#d9ab38] transition-colors flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center gap-4 mb-4">
              <span className="font-bold text-gray-900 text-sm">Follow Us</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <a href="#" className="hover:-translate-y-1 transition-transform">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                 <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                 <img src="/instagram.png" alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                 <img src="/facebook.png" alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:-translate-y-1 transition-transform">
                 <img src="/twitter.png" alt="Twitter" className="w-6 h-6 object-contain" />
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="tel:+263782456936" className="flex items-center gap-2 text-gray-600 hover:text-black">
                 <img src="/phone-call.png" alt="Phone" className="w-5 h-5 object-contain" />
                 <span className="font-bold text-sm">+263 78 245 6936</span>
              </a>
              <a href="https://wa.me/263782456936" className="flex items-center gap-2 text-gray-600 hover:text-black">
                 <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                 <span className="font-bold text-sm">+263 78 245 6936</span>
              </a>
              <a href="tel:+263781835425" className="flex items-center gap-2 text-gray-600 hover:text-black">
                 <img src="/phone-call.png" alt="Phone" className="w-5 h-5 object-contain" />
                 <span className="font-bold text-sm">+263 78 183 5425</span>
              </a>
              <a href="https://wa.me/263781835425" className="flex items-center gap-2 text-gray-600 hover:text-black">
                 <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                 <span className="font-bold text-sm">+263 78 183 5425</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 mt-16 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs font-bold text-gray-600 gap-4">
          <p>&copy; <span onClick={handleAdminClick} className="cursor-pointer select-none">{new Date().getFullYear()}</span> Blackgift Tech Labs. All Rights Reserved.</p>
          <div className="flex flex-col items-center md:items-end gap-4">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/defined-domains" className="flex items-center gap-2 hover:bg-gray-200 transition-colors bg-gray-100 border border-gray-300 px-4 py-2 rounded-[9px] text-gray-800 shadow-sm">
              <Scan className="w-4 h-4" />
              Verify ID Card
            </Link>
          </div>
        </div>
      </div>

      {/* Services Bottom Bar */}
      <div className="bg-[#0B3A5A] text-white py-3 flex justify-center items-center cursor-pointer hover:bg-[#082c44] transition-colors">
        <span className="font-bold text-sm tracking-widest flex items-center gap-2">SERVICES <ChevronDown className="w-4 h-4" /></span>
      </div>

      {/* Admin PIN Prompt */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Admin Login</h3>
              <button onClick={() => { setShowAdminPrompt(false); setPin(''); setPinError(false); }} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                placeholder="Enter PIN"
                className={`w-full px-4 py-3 border rounded-xl mb-4 text-center tracking-widest font-bold text-lg ${pinError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                autoFocus
              />
              {pinError && <p className="text-red-500 text-sm font-bold mb-4 text-center">Invalid PIN</p>}
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
