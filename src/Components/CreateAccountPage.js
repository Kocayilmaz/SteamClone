import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../ScssComponents/LoginPage.scss";

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      localStorage.setItem("username", username);

      alert("E-posta adresinize doğrulama e-postası gönderildi.");
      navigate("/LoginPage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleCreateAccount}>
        <h2>
          <FontAwesomeIcon icon={faSteam} className="fa-steam" />
          <span className="steam-title">STEAM</span>
        </h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Hesap Oluştur</button>
        <div className="form-footer">
          <div className="existing-account">
            <a href="/LoginPage">Hesabınız var mı?</a>
          </div>
          <div className="create-account">
            Steam hesabınız yok mu?{" "}
            <a href="/CreateAccount">Ücretsiz Hesap Oluştur</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountPage;
