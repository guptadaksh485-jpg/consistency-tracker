import { useState } from "react";
import * as api from "../api";

function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userName.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = isSignup
        ? await api.signup(userName, password)
        : await api.login(userName, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
       console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <input
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignup ? "Signup" : "Login"}
        </button>

        <p
          className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
        >
          {isSignup ? "Already have an account? Login" : "New user? Signup"}
        </p>
      </div>
    </div>
  );
}
export default Login;