import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";
import { AuthApi } from "../../api/authApi.js";
import { loginSchema } from "../../validation/auth.validation.jsx";
import style from "./login.module.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //validiert Benutzername,Passwort mit Hilfe loginSchema
  function handleLogin() {
    const { error } = loginSchema.validate({ username, password });
    if (error) return toast.warn(error.message);
    //else =>post req an :http://localhost:2020/api/auth/login
    AuthApi.login(username, password)
      .then((res) => {
        //then save that 
        localStorage.setItem("token", res.data.token);
        // um wider  den site zu reloaden
        window.location.reload();
      })
      .catch((err) => toast.error("Please fill out the form",err));
  }
  function handleNavigateToRegister() {
    navigate("/register");
    
  }

  return (
    <div className={style.login}>
      <div className={style.login_form}>
        <h1>Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="👤"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleNavigateToRegister} className={style.linkChange}>
          <p> Sign up </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
