import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import routes from './routes';

// import Header from '@/components/common/Header';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';
import { useDesktopEnforcer } from '@/hooks/useDesktopEnforcer';
import DesktopModeModal from '@/components/common/DesktopModeModal';
import { useVisitorTracker } from '@/hooks/useVisitorTracker';

const App: React.FC = () => {
  const { showModal, dismissModal } = useDesktopEnforcer();
  useVisitorTracker();

  return (
    <Router>
      <DesktopModeModal isOpen={showModal} onClose={dismissModal} />
      {/*<AuthProvider>*/}
      {/*<RouteGuard>*/}
      <div className="flex flex-col min-h-screen">
        {/*<Header />*/}
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
