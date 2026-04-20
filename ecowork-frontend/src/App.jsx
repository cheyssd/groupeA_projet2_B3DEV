import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import './App.css';

import Login from './pages/Login';
import Register from './pages/register';
import Accueil from './pages/Accueil.jsx';

const Spaces = lazy(() => import('./pages/Spaces'));
const SpaceShow = lazy(() => import('./pages/SpaceShow'));

const Dashboard = lazy(() => import('./pages/user/Dashboard.jsx'));
const Reservation = lazy(() => import('./pages/user/Reservation.jsx'));
const Profile = lazy(() => import('./pages/user/Profile.jsx'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage.jsx'));
const ConfirmationReservation = lazy(() => import('./pages/checkout/ConfirmationReservation.jsx'));

const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminSpaces = lazy(() => import('./pages/admin/AdminSpaces'));
const AdminSpaceForm = lazy(() => import('./pages/admin/AdminSpaceForm'));
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminProfil = lazy(() => import('./pages/admin/AdminProfil'));
const AdminEquipements = lazy(() => import('./pages/admin/AdminEquipements'));

// ✅ Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen" 
      style={{ background: "var(--bg-primary)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}></div>
        <p style={{ 
          color: "var(--text-muted)", 
          fontFamily: "'Rajdhani', sans-serif", 
          letterSpacing: "3px",
          fontSize: "11px"
        }}>
          CHARGEMENT...
        </p>
      </div>
    </div>
  );
}

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
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Accueil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spaces"
              element={
                <ProtectedRoute>
                  <Spaces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spaces/:id"
              element={
                <ProtectedRoute>
                  <SpaceShow />
                </ProtectedRoute>
              }
            />

            {/* Routes user */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <ConfirmationReservation />
                </ProtectedRoute>
              }
            />
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

            {/* Routes admin */}
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
            <Route
              path="/admin/equipements"
              element={
                <AdminRoute>
                  <AdminEquipements />
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;