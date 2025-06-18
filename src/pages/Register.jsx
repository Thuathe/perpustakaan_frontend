import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', form);

      alert('✅ Berhasil daftar! Silakan login.');
      navigate('/');
    } catch (err) {
      console.error(err.response?.data);
      const msg = err.response?.data?.message || 'Terjadi kesalahan saat mendaftar.';
      alert(`❌ Register gagal:\n\n${msg}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Daftar Akun Baru</h2>
        <form onSubmit={register} className="space-y-4">
          <input
            name="name"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Daftar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/" className="font-medium text-purple-600 hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}
