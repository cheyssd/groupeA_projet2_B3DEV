import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';

// Pages publiques
import Login from './pages/Login';
import Register from './pages/Register';
import Accueil from './pages/Accueil.jsx';
import Spaces from './pages/Spaces';
import SpaceShow from './pages/SpaceShow';

// Pages user
import Dashboard from './pages/user/Dashboard.jsx';
import Reservation from './pages/user/Reservation.jsx';
import Profile from './pages/user/Profile.jsx';

// Pages admin
import AdminOverview from './pages/admin/AdminOverview';
import AdminSpaces from './pages/admin/AdminSpaces';
import AdminSpaceForm from './pages/admin/AdminSpaceForm';
import AdminReservations from './pages/admin/AdminReservations';
import AdminReservationForm from './pages/admin/AdminReservationForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProfil from './pages/admin/AdminProfil';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) {
    return <Navigate to="/login" replace />;
  }
    if (user.role !== 'admin') {
    return <Navigate to="/user/dashboard" replace />;
  }
    return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces/:id" element={<SpaceShow />} />

          {/* Routes user protégées */}
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

          {/* Routes admin protégées */}
          <Route
            path="/admin/adminOverview"
            element={
              <AdminRoute>
                <AdminOverview />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/spaces"
            element={
              <AdminRoute>
                <AdminSpaces />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/spaces/create"
            element={
              <AdminRoute>
                <AdminSpaceForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/spaces/:id/edit"
            element={
              <AdminRoute>
                <AdminSpaceForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <AdminRoute>
                <AdminReservations />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reservations/create"
            element={
              <AdminRoute>
                <AdminReservationForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reservations/:id/edit"
            element={
              <AdminRoute>
                <AdminReservationForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profil"
            element={
              <AdminRoute>
                <AdminProfil />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;