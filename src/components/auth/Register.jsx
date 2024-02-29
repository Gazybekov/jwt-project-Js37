import React, { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { handleRegister, error } = useAuth();
  const handleSave = () => {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("Заполните все поля");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirm", passwordConfirm);
      handleRegister(formData);
      console.log(formData);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      {error ? <h2>{error}</h2> : null}
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button onClick={handleSave}>register</button>
    </div>
  );
};

export default Register;
