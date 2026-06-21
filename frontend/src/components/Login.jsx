import { useState } from "react";

function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "https://consistency-tracker-zwqt.onrender.com/api/auth/signup"
        : "https://consistency-tracker-zwqt.onrender.com/api/auth/login";
 

      const res = await fetch(url, {
        method: "POST",
        headers: {
  "Content-Type": "application/json"
},
        body: JSON.stringify({ userName, password })
      });

      const data = await res.json();
     console.log(data);
 
  if (data.token) {
  localStorage.setItem("token", data.token);
  setToken(data.token);
}

 else {
  alert(data.message || "Signup/Login failed");
}
       
    } catch (err) {
      console.error(err);
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 w-full max-w-md">

      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignup ? "Create Account" : "Login"}
      </h2>

      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="
          w-full
          border
          border-slate-300
          rounded-lg
          px-3
          py-2
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          border
          border-slate-300
          rounded-lg
          px-3
          py-2
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        onClick={handleSubmit}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-lg
          font-medium
        "
      >
        {isSignup ? "Signup" : "Login"}
      </button>

      <p
        className="
          text-center
          mt-4
          text-blue-600
          cursor-pointer
          hover:underline
        "
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "New user? Signup"}
      </p>

    </div>
  </div>
);}
export default Login;