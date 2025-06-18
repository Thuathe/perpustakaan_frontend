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
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-gray-50 via-purple-50 to-white">
      <div className="max-w-6xl p-6 mx-auto bg-white border border-purple-100 shadow-xl rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-purple-700">📚 Daftar Buku</h2>
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-full shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {books.length === 0 ? (
          <p className="italic text-center text-gray-500">Belum ada buku tersedia.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {books.map(book => (
              <div
                key={book.id}
                className="overflow-hidden transition bg-white border border-purple-100 shadow rounded-2xl hover:shadow-md"
              >
                {book.cover && (
                  <div className="w-full overflow-hidden aspect-square">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">✍️ {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
