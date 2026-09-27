import React from "react";
import { useRef } from "react";
function LoginLayout() {
  const LoginRef = useRef();
  const ParolRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: LoginRef.current.value,
      password: ParolRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Tokenni brauzer xotirasiga saqlash
        localStorage.setItem("admin_token", data.token);
        alert("Xush kelibsiz, Admin!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik!");
    }
  };
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <span className="text-white text-2xl font-bold">V</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Admin panel</h1>

          <p className="text-gray-500 mt-2">
            Tizimga kirish uchun ma'lumotlaringizni kiriting
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 p-7 border border-gray-100"
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login
            </label>

            <input
              ref={LoginRef}
              type="text"
              placeholder="Loginni kiriting"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none
              focus:border-blue-500 focus:ring-4 focus:ring-blue-100
              transition-all text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Parol
              </label>
            </div>

            <input
              ref={ParolRef}
              type="password"
              placeholder="Parolni kiriting"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none
              focus:border-blue-500 focus:ring-4 focus:ring-blue-100
              transition-all text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700
            active:scale-[0.98] text-white font-semibold rounded-xl
            transition-all shadow-lg shadow-blue-200"
          >
            Tizimga kirish
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 Admin tizimi
        </p>
      </div>
    </div>
  );
}

export default LoginLayout;
