import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);
  console.log(isAuthenticated);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="App">
          <Header />
          <div className="content-container">
            <Slidebar />
            <Routes>
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/" element={<MainContent />} />
              <Route path="/game-detail/:id" element={<GameDetailPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <FooterBar />
        </div>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
}

export default App;
