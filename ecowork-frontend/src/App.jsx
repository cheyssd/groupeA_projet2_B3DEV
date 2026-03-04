import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // <-- Ajoute Navigate ici
// import Home from './pages/Home';
import Login from './pages/Login';
import Accueil from './pages/Accueil.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx'
// import Register from './pages/Register';
// import Spaces from './pages/Spaces';
// import Dashboard from './pages/Dashboard';
import './App.css';

// 1. Définis ProtectedRoute EN DEHORS de la fonction App (plus propre)
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
      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/accueil" element={<Accueil />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/spaces" element={<Spaces />} /> */}

        {/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
