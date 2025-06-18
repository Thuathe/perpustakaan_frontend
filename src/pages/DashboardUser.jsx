import { useEffect, useState } from 'react';
import API from '../services/api';

export default function DashboardUser() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('/books')
      .then(res => setBooks(res.data))
      .catch(() => alert('❌ Gagal memuat daftar buku.'));
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('⚠️ Yakin ingin logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('👋 Logout berhasil. Sampai jumpa!');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📚 Daftar Buku</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada buku tersedia.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {books.map(book => (
              <div
                key={book.id}
                className="overflow-hidden transition bg-white border shadow-md rounded-xl hover:shadow-lg"
              >
                {book.cover && (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600">Penulis: {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
