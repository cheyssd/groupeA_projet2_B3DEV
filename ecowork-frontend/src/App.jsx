import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthProvider.jsx'
import Register from './pages/register';

import Dashboard from './pages/user/Dashboard.jsx';
import Reservation from './pages/user/Reservation.jsx';
import Profile from './pages/user/Profile.jsx';
import UserNavbar from './pages/user/components/UserNavbar.jsx';
import './App.css';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Exemple pour vos futures routes protégées */}

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reservation"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
