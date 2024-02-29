import React, { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import Loader from "../homepage/Loader";

const Login = () => {
  const { handleLogin, error, loader } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните все поля!");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      handleLogin(formData, email);
    }
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Login</h1>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password " onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSave}>Login</button>
    </div>
  );
};

export default Login;
