import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './utilities/Loader/Loader';
import ScrollToTop from './utilities/ScrollToTop';

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

import FooterWrapper from './components/Footer/FooterWrapper';

// Blogs
 const Blogs = lazy(() => import('./pages/Blogs/Blogs'));
 const BlogDetails = lazy(() => import('./pages/BlogDetails/BlogDetails'));


// Wrapper component to force remount on param change
function ServiceDetailsWrapper() {
  const { serviceSlug } = useParams();
  return <ServiceDetails key={serviceSlug} />;
}

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/careers/apply', '/lets-innovate'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="App overflow-hidden">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/know-us" element={<KnowUs />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:heading/:jobType" element={<JobDetails />} />
          <Route path="/careers/apply" element={<Apply />} />
          <Route path="/lets-innovate" element={<LetsInnovate />} />
          <Route path="/service/:serviceSlug" element={<ServiceDetailsWrapper />} />

          {/* Blogs */}
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

// App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
