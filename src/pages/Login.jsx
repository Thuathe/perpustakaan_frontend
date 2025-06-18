import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const user = await API.get("/me");
      localStorage.setItem("user", JSON.stringify(user.data));

      alert(`✅ Login Berhasil!\n\nSelamat datang, ${user.data.name}!\nRole: ${user.data.role}`);
      if (user.data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Email atau password salah, atau server tidak merespon.";
      alert(`❌ Login gagal:\n\n${msg}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-800">
          Selamat Datang di <br />Lvys Library
        </h2>
        <p className="text-sm text-center text-gray-500">Silakan login untuk melanjutkan</p>
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="font-medium text-purple-600 hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>

      {/* Footer Credit */}
      <div className="mt-6 text-sm text-center text-gray-600">
        Dibuat dengan 💜 oleh{" "}
        <span className="font-semibold tracking-wide text-purple-700 cursor-pointer hover:underline">
          Lvy S. – Pembawa Cahaya Web
        </span>
      </div>
    </div>
  );
}
