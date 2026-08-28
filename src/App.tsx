import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';
import { Estimate } from './pages/Estimate';
import { Products } from './pages/Products';
import { Clients } from './pages/Clients';
import { AIDevelopment } from './pages/services/AIDevelopment';
import { MobileDevelopment } from './pages/services/MobileDevelopment';
import { BackendDevelopment } from './pages/services/BackendDevelopment';
import { FrontendDevelopment } from './pages/services/FrontendDevelopment';
import { TeamAugmentation } from './pages/services/TeamAugmentation';
import { WebDevelopment } from './pages/services/WebDevelopment';
import { ScrollToTop } from './components/ScrollToTop';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { NotFound } from './pages/NotFound';
import { AdminDashboard } from './pages/AdminDashboard';
import { VibeCodeSeminar } from './pages/VibeCodeSeminar';
import { SeminarRegister } from './pages/SeminarRegister';
import { Privacy } from './pages/Privacy';

import { DefinedDomains } from './pages/DefinedDomains';
import { DefinedDomainsPublic } from './pages/DefinedDomainsPublic';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
            <Route path="estimate" element={<Estimate />} />
            <Route path="products" element={<Products />} />
            <Route path="clients" element={<Clients />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="services/ai-development" element={<AIDevelopment />} />
            <Route path="services/team-augmentation" element={<TeamAugmentation />} />
            <Route path="services/frontend-development" element={<FrontendDevelopment />} />
            <Route path="services/mobile-development" element={<MobileDevelopment />} />
            <Route path="services/backend-development" element={<BackendDevelopment />} />
            <Route path="services/web-development" element={<WebDevelopment />} />
            <Route path="vibe-code-seminar" element={<VibeCodeSeminar />} />
            <Route path="vibe-code-seminar/register" element={<SeminarRegister />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="defined-domains" element={<DefinedDomains />} />
          <Route path="defined-domains/:studentId" element={<DefinedDomainsPublic />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
