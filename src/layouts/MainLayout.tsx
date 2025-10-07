import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import ScrollIndicator from '../components/ScrollIndicator';
import ScrollToTopOnRouteChange from '../components/ScrollToTopOnRouteChange';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black no-bounce">
      <ScrollToTopOnRouteChange />
      <ScrollIndicator />
      <Header />
      <main className="flex-grow mobile-scroll">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;