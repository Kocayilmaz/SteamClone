import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Header from "./Components/Header";
import Slidebar from "./Components/Slidebar";
import MainContent from "./Components/MainContent";
import GameDetailPage from "./Components/GameDetailPage";
import FooterBar from "./Components/FooterBar";
import DownloadsPage from "./Components/DownloadsPage";
import LoginPage from "./Components/LoginPage";
import "./App.scss";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");

    if (!rememberMe) {
      signOut(auth);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return (
      <Router>
        <Routes>
          <>
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
            <Route path="/LoginPage" element={<Navigate to="/" />} />
          </>
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
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
            <Route path="/LoginPage" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/LoginPage" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
