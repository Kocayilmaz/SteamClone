import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import "../ScssComponents/LoginPage.scss";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>
          <FontAwesomeIcon icon={faSteam} className="fa-steam" />
          <span className="steam-title">STEAM</span>
        </h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label>Beni Hatırla</label>
        </div>
        <button type="submit">Giriş Yap</button>
        <div className="form-footer">
          <div className="existing-account">
            <a href="#login">Hesabınız var mı?</a>
          </div>
          <div className="create-account">
            Steam hesabınız yok mu? <a href="#create">Ücretsiz Hesap Oluştur</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
