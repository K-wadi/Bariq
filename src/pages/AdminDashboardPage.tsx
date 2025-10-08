import { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import { AdminDashboard } from '../components/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password protection - in productie gebruik je echte authenticatie via Supabase
  const ADMIN_PASSWORD = 'bariq2025'; // Verander dit in je .env variabele

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Onjuist wachtwoord');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Admin Login – Bariq Auto Care"
          description="Admin toegang"
          noindex
        />
        
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-red-600/20 rounded-2xl p-8 shadow-2xl shadow-red-600/10 max-w-md w-full">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Voer je wachtwoord in om toegang te krijgen
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wachtwoord
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white
                             placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20
                             transition-all duration-300 outline-none"
                    placeholder="Voer admin wachtwoord in"
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                         text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300
                         shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transform hover:scale-105"
              >
                Inloggen
              </button>
            </form>
            
            <p className="text-gray-500 text-xs text-center mt-6">
              Neem contact op met de systeembeheerder als je geen toegang hebt
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard – Bariq Auto Care"
        description="Beheer je boekingen en klanten"
        noindex
      />
      
      <AdminDashboard />
    </>
  );
};

export default AdminDashboardPage;
