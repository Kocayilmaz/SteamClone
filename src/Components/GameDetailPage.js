import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAward,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import {
  startDownload,
  updateDownloadProgress,
  finishDownload,
} from "../Redux/downloadSlice";
import "../ScssComponents/GameDetailPage.scss";

const GameDetailPage = () => {
  const dispatch = useDispatch();
  const selectedGame = useSelector((state) => state.games.selectedGame);
  const downloadProgress = useSelector(
    (state) => state.download.downloadProgress
  );

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
    dispatch(startDownload());
    const downloadDuration = selectedGame.size / 1000; // Size in seconds

    const interval = setInterval(() => {
      dispatch(
        updateDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            dispatch(finishDownload());
            return 100;
          }
          return prev + 100 / downloadDuration;
        })
      );
    }, 1000);
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
          <button className="upload-button" onClick={startDownloadProcess}>
            <FontAwesomeIcon icon={faDownload} className="upload-icon" />Y Ü K L
            E
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
