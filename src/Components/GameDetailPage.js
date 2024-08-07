// src/pages/GameDetailPage.js
import React from "react";
import { useSelector } from "react-redux";
import "../ScssComponents/GameDetailPage.scss";

const GameDetailPage = () => {
  const selectedGame = useSelector((state) => state.games.selectedGame);

  if (!selectedGame) {
    return <div>Oyun bilgileri yükleniyor...</div>;
  }

  // Dinamik arka plan rengi için bir renk ayarlayın
  const overlayBackgroundColor = selectedGame.backgroundColor || "#292f3b"; // Varsayılan renk

  return (
    <div
      className="game-detail-page"
      style={{
        background: `linear-gradient(to bottom, ${overlayBackgroundColor}, ${overlayBackgroundColor} 100%)`,
      }}
    >
      <div className="game-detail-container">
        <img
          src={selectedGame.gameDetailPhoto}
          alt={selectedGame.title}
          className="game-detail-photo"
        />
        <div
          className="game-detail-overlay"
          style={{
            background: `linear-gradient(to right, ${overlayBackgroundColor}, ${overlayBackgroundColor} 0%, transparent)`,
          }}
        >
          <div className="game-detail-content">
            <h1>{selectedGame.title}</h1>
            <p>{selectedGame.description}</p>
            <button className="load-button">Yükle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
