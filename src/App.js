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

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [sendSignInLinkToEmail, sending, sendLinkError] =
    useSendSignInLinkToEmail(auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendSignInLink = async () => {
    const actionCodeSettings = {
      url: "https://www.example.com/finishSignUp?cartId=1234",
      handleCodeInApp: true,
    };
    const success = await sendSignInLinkToEmail(email, actionCodeSettings);
    setEmailSent(success);
  };

  useEffect(() => {
    if (!localStorage.getItem("rememberMe")) {
      auth.signOut();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {user ? (
          <Route
            path="/"
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
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
                <FooterBar />
              </div>
            }
          />
        ) : (
          <>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/CreateAccount" element={<CreateAccountPage />} />
            <Route path="*" element={<Navigate to="/LoginPage" />} />
            {emailSent && <div>Email sent successfully!</div>}
            {sendLinkError && <div>Error: {sendLinkError.message}</div>}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
