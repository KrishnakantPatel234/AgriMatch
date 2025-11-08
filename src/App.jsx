import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import OrganicFarmers from './components/OrganicFarmers';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmersDirectory from './pages/FarmsDirectory';
import TransportDirectory from './pages/TransportDirectory';
import ColdStorageDirectory from './pages/ColdStorageDirectory';
import BuyersDirectory from './pages/BuyersDirectory';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import StorageDashboard from './pages/dashboard/StorageDashboard';
import TransportDashboard from './pages/dashboard/TransportDashboard';
import LanguageSelector from './components/LanguageSelector';
import GlobalAssistant from './components/GlobalAssistant';
import VoiceNavigator from './components/VoiceNavigator';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Role-based Route Component
const RoleBasedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on role
  switch (user.role) {
    case 'farmer':
      return <Navigate to="/dashboard/farmer" replace />;
    case 'buyer':
      return <Navigate to="/dashboard/buyer" replace />;
    case 'transport':
      return <Navigate to="/dashboard/transport" replace />;
    case 'storage':
      return <Navigate to="/dashboard/storage" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

// Public Layout Component
const PublicLayout = () => (
  <>
    <Navbar />
    <LanguageSelector />
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
    <Footer />
  </>
);

// Dashboard Layout Component (for consistent dashboard structure)
const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    {children}
  </div>
);

function App() {
  return (
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <VoiceNavigator />
              <GlobalAssistant />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public routes with layout */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <Features />
                        <OrganicFarmers />
                        <Services />
                        <Reviews />
                      </>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/farmers" element={<FarmersDirectory />} />
                    <Route path="/transport" element={<TransportDirectory />} />
                    <Route path="/cold-storage" element={<ColdStorageDirectory />} />
                    <Route path="/buyers" element={<BuyersDirectory />} />
                  </Route>

                  {/* Protected Dashboard Routes */}
                  <Route 
                    path="/dashboard/farmer" 
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <FarmerDashboard />
                        </DashboardLayout>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard/buyer" 
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <BuyerDashboard />
                        </DashboardLayout>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard/transport" 
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <TransportDashboard />
                        </DashboardLayout>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard/storage" 
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <StorageDashboard />
                        </DashboardLayout>
                      </ProtectedRoute>
                    } 
                  />

                  {/* Role-based redirect */}
                  <Route path="/dashboard" element={<RoleBasedRoute />} />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
  );
}

export default App;