import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.warn('Gagal parsing user:', e);
  }

  // ✅ Di sinilah kamu pasang log-nya
  console.log("🔑 Token:", token);
  console.log("👤 User:", user);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/user" replace />;
  }

  return children;
}
