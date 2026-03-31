/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const ScrollToTop = () => { const { pathname } = useLocation(); React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; };
import { Layout } from '@/src/components/Layout';
import { Home } from '@/src/pages/Home';
import { Customize } from '@/src/pages/Customize';
import { Collections } from '@/src/pages/Collections';
import { HowItWorks } from '@/src/pages/HowItWorks';
import { PolicyPage } from '@/src/pages/PolicyPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        {/* Fallback */}
        <Route path="/policy/:page" element={<PolicyPage />} />
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  );
}
