import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  useAuthState,
  useSendSignInLinkToEmail,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Header from "./Components/Header";
import Slidebar from "./Components/Slidebar";
import MainContent from "./Components/MainContent";
import GameDetailPage from "./Components/GameDetailPage";
import FooterBar from "./Components/FooterBar";
import DownloadsPage from "./Components/DownloadsPage";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import "./App.scss";
import { sendEmailVerification } from "firebase/auth";

function App() {
  const [user, loading] = useAuthState(auth);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.emailVerified);
    }
  }, [user]);

  const handleSendVerificationEmail = () => {
    if (user && !isEmailVerified) {
      sendEmailVerification(user)
        .then(() => {
          alert(
            "Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin."
          );
        })
        .catch((error) => {
          alert(
            "E-posta doğrulama gönderiminde bir hata oluştu: " + error.message
          );
        });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("rememberMe")) {
      auth.signOut();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && !isEmailVerified) {
    return (
      <div>
        <div className="background-image"></div>
        <div className="email-verification">
          <h1>Lütfen e-posta adresinizi doğrulayın.</h1>
          <p>
            Doğrulama bağlantısı e-posta adresinize gönderildi. Lütfen gelen
            kutunuzu kontrol edin ve e-posta adresinizi doğrulamak için
            bağlantıya tıklayın.
          </p>
          <button onClick={handleSendVerificationEmail}>
            Doğrulama E-postasını Yeniden Gönder
          </button>
          <button onClick={() => auth.signOut()}>
            Çıkış Yap ve Yeniden Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {user && isEmailVerified ? (
          <>
            <Route
              path="*"
              element={
                <div className="App">
                  <Header />
                  <div className="content-container">
                    <Slidebar />
                    <Routes>
                      <Route path="/downloads" element={<DownloadsPage />} />
                      <Route path="/" element={<MainContent />} />
                      <Route
                        path="/game-detail/:id"
                        element={<GameDetailPage />}
                      />
                    </Routes>
                  </div>
                  <FooterBar />
                </div>
              }
            />
          </>
        ) : (
          <>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/CreateAccount" element={<CreateAccountPage />} />
            <Route path="*" element={<Navigate to="/LoginPage" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
