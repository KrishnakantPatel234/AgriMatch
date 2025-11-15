import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { SocketProvider } from './context/SocketContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import OrganicFarmers from './components/OrganicFarmers';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import BuyersDirectory from './pages/BuyersDirectory';
import Marketplace from './pages/MarketPlace';

import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import LanguageSelector from './components/LanguageSelector';
import GlobalAssistant from './components/GlobalAssistant';
import VoiceNavigator from './components/VoiceNavigator';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" replace />;
};

// Role-based redirect
const RoleBasedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'farmer': return <Navigate to="/dashboard/farmer" replace />;
    case 'buyer': return <Navigate to="/dashboard/buyer" replace />;
    default: return <Navigate to="/" replace />;
  }
};

// Public Layout
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

function App() {
  return (
    <LanguageProvider>
    <SocketProvider>
      <VoiceNavigator />
      <GlobalAssistant />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <OrganicFarmers />
                  <Services />
                  <Reviews />
                </>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/buyers" element={<BuyersDirectory />} />
          </Route>

          {/* Dashboard Routes */}
          <Route
            path="/dashboard/farmer"
            element={
              <ProtectedRoute>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/buyer"
            element={
              <ProtectedRoute>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />

         
          <Route path="/dashboard" element={<RoleBasedRoute />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </SocketProvider>
    </LanguageProvider>
  );
}

export default App;
