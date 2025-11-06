// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import Dashboard from './pages/Dashboard';
import FarmersDirectory from './pages/FarmsDirectory';
import TransportDirectory from './pages/TransportDirectory';
import ColdStorageDirectory from './pages/ColdStorageDirectory';
import BuyersDirectory from './pages/BuyersDirectory';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import BuyerDashboard from './pages/dashboard/BuyerDashboard';
import StorageDashboard from './pages/dashboard/StorageDashboard';
import TransportDashboard from './pages/dashboard/TransportDashboard';
import DashboardRouter from './components/DashboardRouter';
import LanguageSelector from './components/LanguageSelector';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            {/* <LanguageSelector /> */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/farmers" element={<FarmersDirectory />} />
              <Route path="/transport" element={<TransportDirectory />} />
              <Route path="/cold-storage" element={<ColdStorageDirectory />} />
              <Route path="/buyers" element={<BuyersDirectory />} />
              <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/transport" element={<TransportDashboard/>}/>
              <Route path="/dashboard/storage" element={<StorageDashboard />} />
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="/" element={
                <>
                  <Navbar />
                  <Hero />
                  <Features />
                  <OrganicFarmers />
                  <Services />
                  <Reviews />
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;