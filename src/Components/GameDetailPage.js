import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAward,
  faDownload,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  startDownloadThunk,
  setGameDetailPageSelectedGame,
} from "../Redux/downloadSlice";
import "../ScssComponents/GameDetailPage.scss";

const GameDetailPage = () => {
  const dispatch = useDispatch();
  const selectedGame = useSelector((state) => state.games.selectedGame);
  const downloadedGames = useSelector(
    (state) => state.downloadedGames.downloadedGames
  );
  const isGameDownloaded = (id) => {
    return downloadedGames.some((game) => game.id === id);
  };

  if (!selectedGame) {
    return <div>Oyun bilgileri yükleniyor...</div>;
  }

  const sizeInGB = (selectedGame.size / 1000)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  const lastTwoWeeksPlaytime = selectedGame.lasttwoweeks;
  const playtime = selectedGame.playtime;
  const achievements = selectedGame.achievement;
  const totalAchievements = selectedGame.totalachievement;
  const progressPercentage = (achievements / totalAchievements) * 100;

  const startDownloadProcess = () => {
    dispatch(setGameDetailPageSelectedGame(selectedGame.gameicon));
    dispatch(
      startDownloadThunk({ id: selectedGame.id, icon: selectedGame.gameicon })
    );
  };

  return (
    <div className="game-detail-page">
      <div className="game-detail-container">
        <div className="game-detail-photo-container">
          <img
            src={selectedGame.gameDetailPhoto}
            alt={selectedGame.title}
            className="game-detail-photo1"
          />
          <img
            src={selectedGame.gameDetailPhoto}
            alt={selectedGame.title}
            className="game-detail-photo2"
          />
          <div className="game-detail-overlay" />
          <button
            className={`action-button ${
              isGameDownloaded(selectedGame.id)
                ? "play-button"
                : "upload-button"
            }`}
            onClick={
              isGameDownloaded(selectedGame.id)
                ? () => {}
                : startDownloadProcess
            }
          >
            <FontAwesomeIcon
              icon={isGameDownloaded(selectedGame.id) ? faPlay : faDownload}
              className="action-icon"
            />
            {isGameDownloaded(selectedGame.id) ? "Oyna" : "Yükle"}
          </button>
          <div className="info-section">
            <div className="info-item">
              <div className="info-text">
                <p className="info-title">GEREKLİ ALAN</p>
                <p className="info-size">{sizeInGB} GB</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-text">
                <p className="info-title">SON OYNAMA</p>
                <p className="info-last-played">{lastTwoWeeksPlaytime} saat</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <FontAwesomeIcon icon={faClock} className="info-icon" />
                <div className="info-text">
                  <p className="info-title">OYNAMA SÜRESİ</p>
                  <p className="info-playtime">{playtime} saat</p>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <FontAwesomeIcon icon={faAward} className="info-icon" />
                <div className="info-text">
                  <p className="info-title">BAŞARIMLAR</p>
                  <p className="info-achievements">
                    {achievements}/{totalAchievements}
                  </p>
                </div>
              </div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <button className="bottom-bar-button">Mağaza Sayfası</button>
            <button className="bottom-bar-button">DLC</button>
            <button className="bottom-bar-button">Topluluk Merkezi</button>
            <button className="bottom-bar-button">Tartışmalar</button>
            <button className="bottom-bar-button">Rehberler</button>
            <button className="bottom-bar-button">Destek</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
