import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Navbar from './components/Navbar/Navbar';
import FooterWrapper from './components/Footer/FooterWrapper';
import Loader from './utilities/Loader/Loader';
import ScrollToTop from './utilities/ScrollToTop';
import HeroButton from './components/HeroButton/HeroButton';
import ChatModal from './components/ChatModal/ChatModal';
import ReturnButton from './utilities/ReturnButton';
import ThankYou from './pages/ThankYou/ThankYou';
import GAListener from './ga/GAListener';
import { initGA } from './ga/ga';

const Home = lazy(() => import('./pages/Home/Home'));
const KnowUs = lazy(() => import('./pages/KnowUs/KnowUs'));
const OurWork = lazy(() => import('./pages/OurWork/OurWork'));
const Careers = lazy(() => import('./pages/Careers/Careers'));
const JobDetails = lazy(() => import('./pages/JobDetails/JobDetails'));
const LetsInnovate = lazy(() => import('./pages/LetsInnovate/LetsInnovate'));
const Apply = lazy(() => import('./components/Apply/Apply'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails/ServiceDetails'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));
const Blogs = lazy(() => import('./pages/Blogs/Blogs'));
const BlogDetails = lazy(() => import('./pages/BlogDetails/BlogDetails'));
const ProjectDetail = lazy(() => import('./pages/OurWork/ProjectDetail'));
const ContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));
const Packages = lazy(() => import('./pages/Packages/Packages'));

import TopScroller from './utilities/TopScroller';

function ServiceDetailsWrapper() {
  const { serviceSlug } = useParams();
  return <ServiceDetails key={serviceSlug} />;
}

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/careers/apply', '/lets-innovate'];
  const hideHeroButtonRoutes = ['/contact-us', '/thank-you'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const shouldShowHeroButton = !hideHeroButtonRoutes.includes(location.pathname);
  const isPortfolioDetail = location.pathname.startsWith('/portfolio/');

  const isBlogDetail = location.pathname.startsWith('/blogs/');

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    initGA();
  }, []);

  // Fallback meta tags
  const defaultMeta = {
    title: 'Scons | UK Based Software Innovators',
    description: 'Explore innovative software solutions by Scons tailored for startups and enterprises in the UK and worldwide.',
    keywords: 'Scons, Software Company UK, Web Development, React, Node.js, Full Stack, Startups',
  };

  return (
    <div className="App overflow-hidden">
      <Helmet>
        {/* Fallback meta tags, overridden by page-specific tags */}
        <title>{defaultMeta.title}</title>
        <meta name="description" content={defaultMeta.description} />
        <meta name="keywords" content={defaultMeta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://sconstech.com${location.pathname}`} />
      </Helmet>

      <TopScroller />
      <Navbar />
      {shouldShowHeroButton && <HeroButton onClick={() => setModalOpen(true)} />}
      <ChatModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <Suspense fallback={<Loader />}>
                      <GAListener />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/why-scons" element={<KnowUs />} />
          <Route path="/portfolio" element={<OurWork />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/service/:serviceSlug" element={<ServiceDetailsWrapper />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogSlug" element={<BlogDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {shouldShowFooter && <FooterWrapper />}
      <ScrollToTop />
      {isPortfolioDetail && <ReturnButton />}
      {isBlogDetail && <ReturnButton text="Blogs" link="/blogs" />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;