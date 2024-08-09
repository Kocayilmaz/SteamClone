import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Slidebar from "./Components/Slidebar";
import MainContent from "./Components/MainContent";
import GameDetailPage from "./Components/GameDetailPage";
import FooterBar from "./Components/FooterBar";
import DownloadsPage from "./Components/DownloadsPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-container">
          <Slidebar />
          <Routes>
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/" element={<MainContent />} />
            <Route path="/game-detail/:id" element={<GameDetailPage />} />
          </Routes>
        </div>
        <FooterBar />
      </div>
    </Router>
  );
}

export default App;
