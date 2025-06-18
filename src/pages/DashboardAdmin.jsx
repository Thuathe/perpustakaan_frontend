import { useEffect, useState } from "react";
import API from "../services/api";

export default function DashboardAdmin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", cover: null });
  const [editId, setEditId] = useState(null);

  const loadBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      alert("❌ Gagal memuat data buku.");
      console.error(err);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setForm({ ...form, cover: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim()) {
      alert("⚠️ Judul dan Penulis wajib diisi.");
      return;
    }

    if (!form.cover && !editId) {
      const confirm = window.confirm("📁 Belum ada cover. Yakin ingin lanjut?");
      if (!confirm) return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("author", form.author);
    if (form.cover) data.append("cover", form.cover);

    try {
      if (editId) {
        await API.post(`/books/${editId}?_method=PUT`, data);
        alert("✅ Buku berhasil diupdate!");
        setEditId(null);
      } else {
        await API.post("/books", data);
        alert("✅ Buku berhasil ditambahkan!");
      }

      setForm({ title: "", author: "", cover: null });
      loadBooks();
    } catch (err) {
      console.error("🛑 Error saat tambah/update buku:", err);
      if (err.response) {
        alert(
          "❌ Gagal menyimpan buku:\n" +
            (err.response.data.message || "Cek isian form atau server error")
        );
      } else {
        alert("❌ Terjadi kesalahan jaringan atau server tidak merespon.");
      }
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, cover: null });
    alert(`✏️ Mode edit aktif untuk buku: ${book.title}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("⚠️ Yakin ingin menghapus buku ini?");
    if (!confirm) return;

    try {
      await API.delete(`/books/${id}`);
      alert("🗑️ Buku berhasil dihapus.");
      loadBooks();
    } catch (err) {
      console.error("Gagal menghapus buku:", err);
      alert("❌ Gagal menghapus buku. Coba lagi.");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("⚠️ Yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("👋 Logout berhasil. Sampai jumpa!");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📚 Kelola Buku</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul"
            required
            className="p-2 border rounded-lg"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Penulis"
            required
            className="p-2 border rounded-lg"
          />
          <label
            htmlFor="cover"
            className="inline-block px-4 py-2 text-white transition bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700"
          >
            📁 Pilih Gambar
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />

          <button
            type="submit"
            className="col-span-1 py-2 text-white transition bg-blue-600 rounded-lg sm:col-span-2 hover:bg-blue-700"
          >
            {editId ? "Update" : "Tambah"} Buku
          </button>
        </form>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="overflow-hidden bg-white border shadow-md rounded-xl"
            >
              {book.cover && (
                <img
                  src={book.cover}
                  alt="cover"
                  className="object-cover w-full h-48"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">Penulis: {book.author}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="px-3 py-1 text-sm text-white transition bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="px-3 py-1 text-sm text-white transition bg-red-500 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            Belum ada buku ditambahkan.
          </p>
        )}
      </div>
    </div>
  );
}
