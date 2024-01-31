import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthApi } from "../../api/authApi";
import style from "./register.module.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    AuthApi.register({
      username: username,
      email: email,
      password: password,
      fullName: fullName,
    })
      .then(() => {
        toast.success("👍 Registration successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Registration failed. Please fill out the form completely.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleChangeFullName(e) {
    setFullName(e.target.value);
  }

  function handleNavigateToLogin() {
    navigate("/login");
  }

  return (
    <div className={style.register}>
      <div className={style.register_form}>
        <h1>Register</h1>
        <input
          type="text"
          value={fullName}
          onChange={handleChangeFullName}
          placeholder="fullName"
        />
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
        />
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="E-Mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒"
        />
        <button onClick={handleSubmit}>Register</button>{" "}
        <button onClick={handleNavigateToLogin} className={style.linkChange}>
          <p>Login </p>{" "}
        </button>
      </div>
    </div>
  );
};

export default Register;
