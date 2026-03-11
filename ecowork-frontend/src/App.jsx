import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Accueil from './pages/Accueil.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx'
import SpaceShow from './pages/SpaceShow';
import Spaces from './pages/Spaces';
import AdminOverview from './pages/admin/AdminOverview';
import AdminSpaces from './pages/admin/AdminSpaces';
import AdminSpaceForm from './pages/admin/AdminSpaceForm';
import AdminReservations from './pages/admin/AdminReservations';
import AdminReservationForm from './pages/admin/AdminReservationForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProfil from './pages/admin/AdminProfil'
// import Register from './pages/Register';
// import Spaces from './pages/Spaces';
// import Dashboard from './pages/Dashboard';
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
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/spaces/:id" element={<SpaceShow />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/spaces" element={<AdminSpaces />} />
          <Route path="/admin/spaces/create" element={<AdminSpaceForm />} />
          <Route path="/admin/spaces/:id/edit" element={<AdminSpaceForm />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/reservations/create" element={<AdminReservationForm />} />
          <Route path="/admin/reservations/:id/edit" element={<AdminReservationForm />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/profil" element={<AdminProfil />} />
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
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
