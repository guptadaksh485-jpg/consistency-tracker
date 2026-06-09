import { useState } from "react";

function Login({ setUserId }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login";
 

      const res = await fetch(url, {
        method: "POST",
        headers: {
  "Content-Type": "application/json"
},
        body: JSON.stringify({ userName, password })
      });

      const data = await res.json();
     console.log(data);
 
      const id = data.userId || data._id;

     if (id) {
  localStorage.setItem("userId", id);
  setUserId(id);
       }
 else {
  alert(data.message || "Signup/Login failed");
}
       
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>{isSignup ? "Signup" : "Login"}</h3>

      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
         onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "New user? Signup"}
      </p>
    </div>
  );
}

export default Login;