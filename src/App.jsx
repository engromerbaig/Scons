import React from 'react';
import Heading from './components/Heading/Heading';
import BodyText from './components/BodyText/BodyText';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Heading
      text= "Site Under Maintenance"

      />

      <BodyText
      text= "We are currently working on updating our website. Please check back soon!"
      />
    </div>
  );
}

export default App;

/*

// Original Code (Commented Out)

import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Navbar from './components/Navbar/Navbar';
import FooterWrapper from './components/Footer/FooterWrapper';
import Loader from './utilities/Loader/Loader';
import ScrollToTop from './utilities/ScrollToTop';
import HeroButton from './components/HeroButton/HeroButton';
import ChatModal from './components/ChatModal/ChatModal';

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

import TopScroller from './utilities/TopScroller';

function ServiceDetailsWrapper() {
  const { serviceSlug } = useParams();
  return <ServiceDetails key={serviceSlug} />;
}

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/careers/apply', '/lets-innovate'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App overflow-hidden">
      <Helmet>
        <title>Scons | UK Based Software Innovator's</title>
        <meta name="description" content="Explore innovative software solutions by Scons tailored for startups and enterprises in the UK and worldwide." />
        <meta name="keywords" content="Scons, Software Company UK, Web Development, React, Node.js, Full Stack, Startups" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <TopScroller />
      <Navbar />
      <HeroButton onClick={() => setModalOpen(true)} />
      <ChatModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<KnowUs />} />
          <Route path="/portfolio" element={<OurWork />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:heading/:jobType" element={<JobDetails />} />
          <Route path="/careers/apply" element={<Apply />} />
          <Route path="/lets-innovate" element={<LetsInnovate />} />
          <Route path="/service/:serviceSlug" element={<ServiceDetailsWrapper />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogSlug" element={<BlogDetails />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {shouldShowFooter && <FooterWrapper />}
      <ScrollToTop />
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

*/
