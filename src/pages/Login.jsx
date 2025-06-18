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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login ke Akunmu</h2>
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
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
    </div>
  );
}
