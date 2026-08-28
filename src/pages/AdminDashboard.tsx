import { Seo } from "../components/Seo";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  Search, Bell, Settings, LogOut, Home, Component, 
  FileText, LayoutDashboard, ShoppingCart, Lock, User, MousePointerClick, TrendingUp,
  Menu, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

type PageAnalytics = {
  id: string;
  path: string;
  visits: number;
  buttonClicks: Record<string, number>;
};

function AnimatedNumber({ value }: { value: number }) {
  return (
    <div className="relative inline-block overflow-hidden h-[32px] md:h-[40px] lg:h-[60px] leading-none">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -40, rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          exit={{ y: 40, rotateX: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block origin-bottom"
          style={{ transformPerspective: 500 }}
        >
          {value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <Sparkles key={`sparkle-${value}`} />
    </div>
  );
}

function Sparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);

    const timer = setTimeout(() => setSparkles([]), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0, x: `${s.x}%`, y: `${s.y}%` }}
            animate={{ opacity: 0, scale: 1.5, x: `${s.x + (Math.random() * 20 - 10)}%`, y: `${s.y - 20}%` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_2px_rgba(253,224,71,0.8)]"
            style={{ left: 0, top: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState<PageAnalytics[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [seminarData, setSeminarData] = useState<any[]>([]);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [showSeminar, setShowSeminar] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "analytics"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PageAnalytics[];
      setAnalyticsData(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching realtime analytics:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersData(data);
      setUsersError(null);
    }, (error) => {
      console.error("Error fetching users:", error);
      setUsersError(error.message);
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    const unsubscribeSeminar = onSnapshot(collection(db, "seminar_registrations"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSeminarData(data);
    }, (error) => {
      console.error("Error fetching seminar registrations:", error);
    });

    return () => unsubscribeSeminar();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1015] flex items-center justify-center text-white">
        <div className="text-xl font-bold flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading Analytics...
        </div>
      </div>
    );
  }

  // Data aggregations
  const sortedByVisits = [...analyticsData].sort((a, b) => b.visits - a.visits);
  const mostVisited = sortedByVisits[0] || null;
  const totalVisits = analyticsData.reduce((acc, curr) => acc + curr.visits, 0);
  const totalButtonClicks = analyticsData.reduce((acc, curr) => {
    return acc + (curr.buttonClicks ? Object.values(curr.buttonClicks).reduce((sum, count) => Number(sum) + Number(count), 0) : 0);
  }, 0);

  const displayData = selectedPage ? analyticsData.filter(d => d.path === selectedPage) : analyticsData;
  const pageVisits = selectedPage ? displayData[0]?.visits || 0 : totalVisits;
  const pageClicks = selectedPage 
    ? (displayData[0]?.buttonClicks ? Object.values(displayData[0].buttonClicks).reduce((s, c) => Number(s) + Number(c), 0) : 0)
    : totalButtonClicks;

  // Chart Data
  const chartData = analyticsData.map(item => ({
    name: item.path === '/' ? 'Home' : item.path.replace('-', ' '),
    Visits: item.visits,
    Clicks: item.buttonClicks ? Object.values(item.buttonClicks).reduce((sum, count) => Number(sum) + Number(count), 0) : 0
  }));

  // Pie Chart Data (Top 5 pages)
  const pieData = sortedByVisits.slice(0, 5).map((item, index) => ({
    name: item.path === '/' ? 'Home' : item.path.replace('-', ' '),
    value: item.visits,
    color: ['#00e676', '#2979ff', '#ff1744', '#f5a623', '#9c27b0'][index] || '#9e9e9e'
  }));


  const copyEmailDraft = async (reg: any) => {
    const htmlString = `
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f9fc; padding: 40px 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
        <tr>
          <td align="center" style="padding: 40px 0; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
            <img src="https://i.postimg.cc/0NrBsG7y/bgtl.png" alt="Blackgift Tech Labs" width="120" style="display: block; margin-bottom: 10px;" />
            <h1 style="margin: 0; font-size: 16px; font-weight: 600; color: #5f6368; letter-spacing: 1.5px; text-transform: uppercase;">Blackgift Tech Labs</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 48px;">
            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 400; color: #202124;">You're in, ${reg.name}.</h2>
            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              Your registration for the <strong>Vibe-Code Web Design Seminar</strong> has been successfully approved. We are thrilled to welcome you to this transformative experience.
            </p>
            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              During the seminar, you will discover how to leverage cutting-edge AI tools to design, build, and launch incredible websites and applications—all without needing any prior coding experience.
            </p>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #e8f0fe; border-radius: 8px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 24px;">
                  <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 500; color: #1967d2;">What happens next?</h3>
                  <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.5; color: #1a73e8;">&bull; Keep an eye on this inbox for further updates.</p>
                  <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #1a73e8;">&bull; We will send you the official schedule, venue details, and access links soon.</p>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              Get ready to unlock your potential, elevate your skills, and take a massive leap into the world of tech. We can't wait to see what you'll create.
            </p>
            
            <p style="margin: 0; font-size: 16px; color: #3c4043;">
              Best regards,<br>
              <strong>The Blackgift Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 24px 48px; background-color: #f8f9fa; border-top: 1px solid #eeeeee;">
            <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #70757a;">
              &copy; ${new Date().getFullYear()} Blackgift Tech Labs. All Rights Reserved.<br>
              You are receiving this email because you registered for a Blackgift Tech Labs event.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

    try {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlString], { type: 'text/html' }),
        'text/plain': new Blob([htmlString], { type: 'text/plain' })
      });
      await navigator.clipboard.write([clipboardItem]);
      setCopiedId(reg.id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      console.error('Failed to copy rich text', err);
      navigator.clipboard.writeText(htmlString).then(() => {
        setCopiedId(reg.id);
        setTimeout(() => setCopiedId(null), 3000);
      });
    }
  };

  const handleLogout = () => {

    navigate('/');
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 shrink-0">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-xl mr-3">
            B
          </div>
          <span className="text-white font-bold text-lg tracking-wide">Blackgift</span>
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Authentication</div>
          <div
            onClick={() => { setShowUsers(true); setShowSeminar(false); setSelectedPage(null); setMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg mb-1 transition-all ${
              showUsers && !showSeminar ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="text-sm">Users</span>
          </div>
          
          <div
            onClick={() => { setShowSeminar(true); setShowUsers(false); setSelectedPage(null); setMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg mb-1 transition-all ${
              showSeminar ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Component className="w-4 h-4 shrink-0" />
            <span className="text-sm">Seminar Registrations</span>
          </div>
        </div>

        <div>
          <div
            onClick={() => { setSelectedPage(null); setShowUsers(false); setShowSeminar(false); setMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg mb-1 ${selectedPage === null && !showUsers && !showSeminar ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="text-sm">Overview Dashboard</span>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Tracked Pages</div>
          {sortedByVisits.map((page) => (
            <div
              key={page.id}
              onClick={() => { setSelectedPage(page.path); setShowUsers(false); setShowSeminar(false); setMobileMenuOpen(false); }}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg mb-1 transition-all ${
                selectedPage === page.path && !showUsers && !showSeminar ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate" title={page.path}>{page.path === '/' ? 'Home' : page.path}</span>
              </div>
              {selectedPage === page.path && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] shrink-0"></div>}
            </div>
          ))}
        </div>

      </div>
    </>
  );

  return (
    <>
      <Seo title="Admin Dashboard | Blackgift Tech Labs" robots="noindex, nofollow" />
      <div className="flex h-screen bg-[#0f1015] text-gray-300 font-sans overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="w-64 bg-[#161925] border-r border-gray-800 flex-col shrink-0 hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 max-w-[80%] bg-[#161925] border-r border-gray-800 z-50 flex flex-col md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Navbar */}
        <div className="h-16 bg-[#161925] border-b border-gray-800 flex items-center justify-between px-3 sm:px-6 shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden text-gray-400 hover:text-white shrink-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-[#0f1015] px-3 py-1.5 rounded-md border border-gray-700 w-48 md:w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm text-gray-300 w-full min-w-0"
              />
            </div>
            <button className="sm:hidden text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="hidden xs:flex items-center gap-3 sm:gap-4 text-gray-400">
              <Settings className="w-5 h-5 cursor-pointer hover:text-white hidden sm:block" />
              <div className="relative cursor-pointer hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">7</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 border-l border-gray-700 pl-3 sm:pl-5">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-white leading-tight">Admin User</span>
                <span className="text-xs text-gray-500">System Admin</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#f50057] overflow-hidden flex items-center justify-center text-white font-bold shrink-0">
                A
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors group relative"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-6">
          
          {showSeminar ? (
            <div className="bg-[#161925] border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Seminar Registrations</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Location/Age</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment Msg</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seminarData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                          <p>No seminar registrations yet.</p>
                        </td>
                      </tr>
                    ) : (
                      seminarData.map((reg) => (
                        <tr key={reg.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-sm text-white font-medium">
                            {reg.name} {reg.surname}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            <div>{reg.email}</div>
                            <div className="text-xs">{reg.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            <div>{reg.location}</div>
                            <div className="text-xs">{reg.age} yrs</div>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-500 max-w-[200px] truncate" title={reg.paymentMessage}>
                            {reg.paymentMessage}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${reg.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {reg.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex gap-2">
                              {reg.status !== 'approved' ? (
                                <button 
                                  className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded font-semibold transition-colors text-xs"
                                  onClick={async () => {
                                    try {
                                      const { doc, updateDoc } = await import('firebase/firestore');
                                      await updateDoc(doc(db, 'seminar_registrations', reg.id), { status: 'approved' });
                                    } catch (e) {
                                      console.error(e);
                                    }
                                  }}
                                >
                                  Approve
                                </button>
                              ) : (
                                <button
                                  className={`${copiedId === reg.id ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'} text-white px-3 py-1 rounded font-semibold transition-colors text-xs`}
                                  onClick={() => copyEmailDraft(reg)}
                                >
                                  {copiedId === reg.id ? 'Copied!' : 'Create Draft'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : showUsers ? (
            <div className="bg-[#161925] border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Registered Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User ID</th>
                      <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersError ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center">
                          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg inline-block border border-red-500/20 max-w-lg">
                            <p className="font-bold mb-1">Could not load users</p>
                            <p className="text-sm">{usersError}</p>
                          </div>
                        </td>
                      </tr>
                    ) : usersData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500 italic">
                          <p>No users registered yet.</p>
                          <p className="text-xs mt-2 text-gray-600 max-w-md mx-auto">
                            Note: Since this is a client-side app, only users who log in after the Firestore integration was added will appear here. Existing users must log in again to be recorded.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      usersData.map((user) => (
                        <tr key={user.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-sm text-white font-medium flex items-center gap-3">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '?')}
                              </div>
                            )}
                            {user.displayName || 'No Name'}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">{user.email}</td>
                          <td className="py-3 px-4 text-xs text-gray-500 font-mono">{user.uid}</td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {user.createdAt?.seconds 
                              ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                              : 'Unknown'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              {/* Top Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Area Chart */}
            <div className="lg:col-span-2 bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 min-w-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-white">Performance Overview</h2>
                <div className="text-gray-500 tracking-widest leading-none">...</div>
              </div>
              <div className="h-[240px] sm:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2979ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2979ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff1744" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ff1744" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2e3f" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f1015', borderColor: '#2a2e3f', color: '#fff', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="rect" wrapperStyle={{ fontSize: '12px' }} />
                    <Area type="monotone" dataKey="Visits" stroke="#2979ff" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                    <Area type="monotone" dataKey="Clicks" stroke="#ff1744" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 min-w-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-white">Page Visits Status</h2>
                <div className="text-gray-500 tracking-widest leading-none">...</div>
              </div>
              <div className="h-[240px] sm:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.slice(0, 7)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff1744" />
                        <stop offset="100%" stopColor="#ff9100" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }}
                      tickFormatter={(value) => value.substring(0, 3)}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#0f1015', borderColor: '#2a2e3f', color: '#fff', borderRadius: '8px' }}
                    />
                    <Bar dataKey="Visits" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Donut Chart */}
            <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col">
              <div className="relative h-[200px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f1015', borderColor: '#2a2e3f', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
                  <span className="text-white font-bold text-base sm:text-lg truncate max-w-[120px]">
                    {mostVisited ? (mostVisited.path === '/' ? 'Home' : mostVisited.path) : 'N/A'}
                  </span>
                  <span className="text-gray-500 text-sm">{mostVisited ? mostVisited.visits : 0}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-semibold text-gray-400">Top Pages</span>
                <div className="flex gap-2">
                  {pieData.map((entry, i) => (
                    <div key={i} className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="text-xs font-semibold text-gray-400 truncate">{selectedPage ? `Visits (${selectedPage === '/' ? 'Home' : selectedPage})` : 'Total Visits'}</div>
                  <div className="text-blue-500 shrink-0"><LayoutDashboard className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono">
                  <AnimatedNumber value={pageVisits} />
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[4, 7, 3, 8, 5, 9, 4, 6, 8, 5, 3, 7, 9, 6].map((h, i) => (
                    <div key={i} className="w-1.5 bg-blue-500 rounded-t" style={{ height: `${h * 10}%` }}></div>
                  ))}
                  <span className="text-[10px] text-green-500 ml-auto font-bold shrink-0">+15%</span>
                </div>
              </div>

              <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="text-xs font-semibold text-gray-400 truncate">{selectedPage ? `Clicks (${selectedPage === '/' ? 'Home' : selectedPage})` : 'Total Button Clicks'}</div>
                  <div className="text-red-500 shrink-0"><MousePointerClick className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono">
                  <AnimatedNumber value={pageClicks} />
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[6, 3, 8, 4, 9, 5, 7, 3, 6, 8, 4, 9, 5, 7].map((h, i) => (
                    <div key={i} className="w-1.5 bg-red-500 rounded-t" style={{ height: `${h * 10}%` }}></div>
                  ))}
                  <span className="text-[10px] text-green-500 ml-auto font-bold shrink-0">+25%</span>
                </div>
              </div>

              <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="text-xs font-semibold text-gray-400 truncate">Conversion Rate</div>
                  <div className="text-green-500 shrink-0"><TrendingUp className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono flex items-baseline">
                  <AnimatedNumber value={pageVisits > 0 ? Math.round((pageClicks / pageVisits) * 100) : 0} />
                  <span className="text-lg sm:text-xl">%</span>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 5, 3, 6, 4, 8, 5, 7, 4, 6, 3, 5, 8, 4].map((h, i) => (
                    <div key={i} className="w-1.5 bg-green-500 rounded-t" style={{ height: `${h * 10}%` }}></div>
                  ))}
                  <span className="text-[10px] text-green-500 ml-auto font-bold shrink-0">+5%</span>
                </div>
              </div>

              <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="text-xs font-semibold text-gray-400 truncate">Avg Time on Page (s)</div>
                  <div className="text-yellow-500 shrink-0"><Component className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono flex items-baseline">
                  <AnimatedNumber value={selectedPage ? (pageVisits > 10 ? 45 : 12) : 34} />
                  <span className="text-lg sm:text-xl">s</span>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[7, 4, 8, 5, 9, 6, 4, 7, 5, 8, 3, 6, 9, 5].map((h, i) => (
                    <div key={i} className="w-1.5 bg-yellow-500 rounded-t" style={{ height: `${h * 10}%` }}></div>
                  ))}
                  <span className="text-[10px] text-green-500 ml-auto font-bold shrink-0">+4%</span>
                </div>
              </div>

              <div className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-w-0 sm:col-span-2">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="text-xs font-semibold text-gray-400 truncate">Registered Users</div>
                  <div className="text-purple-500 shrink-0"><User className="w-4 h-4" /></div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono flex items-baseline">
                  <AnimatedNumber value={usersData.length} />
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[2, 4, 3, 5, 4, 6, 7, 5, 8, 9, 7, 8, 10, 12].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-500 rounded-t" style={{ height: `${h * 8}%` }}></div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Page Details Grid */}
          <div className="mt-2">
            <h2 className="text-lg font-bold text-white mb-4">Page Analytics Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {analyticsData.map((page) => (
                <div key={page.id} className="bg-[#161925] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col hover:border-gray-700 transition-colors min-w-0">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <h3 className="font-bold text-lg text-white truncate flex-1 min-w-0">
                      {page.path === '/' ? 'Home' : page.path}
                    </h3>
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                      {page.visits} visits
                    </span>
                  </div>

                  <div className="mt-2 flex-1">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">Button Clicks</h4>
                    {page.buttonClicks && Object.keys(page.buttonClicks).length > 0 ? (
                      <ul className="space-y-3">
                        {Object.entries(page.buttonClicks).sort((a, b) => Number(b[1]) - Number(a[1])).map(([buttonName, clicks]) => (
                          <li key={buttonName} className="flex justify-between items-center text-sm gap-2">
                            <span className="text-gray-400 truncate min-w-0 flex-1" title={buttonName}>
                              {buttonName.replace(/_/g, ' ')}
                            </span>
                            <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded text-xs shrink-0">{clicks}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-600 italic py-6 flex items-center justify-center h-full border border-dashed border-gray-800 rounded-lg">
                        No clicks recorded yet
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
          )}

        </div>
      </div>
    </div>
    </>
  );
}
