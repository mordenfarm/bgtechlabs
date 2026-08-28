import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import CookieBanner from './CookieBanner';
import { AuthModal } from './AuthModal';

export function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeModal = searchParams.get('modal');
  const location = useLocation();

  const isFullscreenPage = location.pathname.includes('/clients');

  const closeModal = () => {
    setSearchParams((prev) => {
      prev.delete('modal');
      return prev;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#f4f4f4] ${isFullscreenPage ? 'h-screen overflow-hidden' : ''}`}>
      <Header />
      
      <main className={`flex-grow flex flex-col items-center w-full ${isFullscreenPage ? 'h-full overflow-hidden' : ''}`}>
        <Outlet />
      </main>
      
      {!isFullscreenPage && <Footer />}

      <AuthModal isOpen={activeModal === 'login'} onClose={closeModal} />
      
      <CookieBanner />
    </div>
  );
}
