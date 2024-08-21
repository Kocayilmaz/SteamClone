import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAward,
  faDownload,
  faPlay,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { addToQueueThunk } from "../Redux/downloadSlice";

import "../ScssComponents/GameDetailPage.scss";

const GameDetailPage = () => {
  const dispatch = useDispatch();

  const selectedGame = useSelector((state) => state.games.selectedGame);
  const downloadedGames = useSelector(
    (state) => state.downloadedGames.downloadedGames
  );
  const isDownloading = useSelector((state) => state.download.isDownloading);
  const currentDownload = useSelector(
    (state) => state.download.currentDownload
  );
  const downloadQueue = useSelector((state) => state.download.downloadQueue);

  const isGameDownloaded = (id) => {
    return downloadedGames.some((game) => game.id === id);
  };
  const isGameInQueue = (id) => {
    return downloadQueue.some((game) => game.id === id);
  };
  const isGameDownloading =
    selectedGame && selectedGame.id === currentDownload?.id;
  const isQueueGameDownloading = isGameInQueue(selectedGame.id);

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
    dispatch(addToQueueThunk({ id: selectedGame.id }));
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
                : isGameDownloading || isQueueGameDownloading
                ? "loading-button"
                : "upload-button"
            }`}
            onClick={
              isGameDownloaded(selectedGame.id) ||
              isGameDownloading ||
              isQueueGameDownloading
                ? () => {}
                : startDownloadProcess
            }
            disabled={isGameDownloading || isQueueGameDownloading}
          >
            <FontAwesomeIcon
              icon={
                isGameDownloading || isQueueGameDownloading
                  ? faArrowsRotate
                  : isGameDownloaded(selectedGame.id)
                  ? faPlay
                  : faDownload
              }
              className="action-icon"
              spin={isGameDownloading || isQueueGameDownloading}
            />
            {isGameDownloading || isQueueGameDownloading
              ? "Yükleniyor..."
              : isGameDownloaded(selectedGame.id)
              ? "Oyna"
              : "Yükle"}
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
