import React from "react";
import "../ScssComponents/DownloadsPage.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadsPage = () => {
  const downloadProgress = useSelector(
    (state) => state.download.downloadProgress
  );
  const isDownloading = useSelector((state) => state.download.isDownloading);
  const gameDetailPageSelectedGame = useSelector(
    (state) => state.download.gameDetailPageSelectedGame
  );

  const remainingTime = "00:30";

  return (
    <div className="downloads-page">
      <div className="top-container"></div>
      {true ? (
        <div className="downloading-container">
          {gameDetailPageSelectedGame && (
            <div className="game-info">
              <div className="photo-and-text">
                <img
                  src={gameDetailPageSelectedGame.gridPhoto}
                  alt="Grid Photo"
                  className="grid-photo"
                />
                <div className="text">{gameDetailPageSelectedGame.name}</div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-top">
                  <div className="percent">
                    İNDİRİLİYOR
                    {`   ${Math.round(downloadProgress)}%`}
                  </div>
                  <div className="remaining-time-text">
                    {remainingTime} <span>Kaldı</span>
                  </div>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>

                <div className="remaining-time">
                  <div className="download-info">
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="download-icon"
                    />
                    <div className="download-size">
                      {`${Math.round(downloadProgress)}MB / 1GB`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="separator-section">
            <div className="stitle">Sıradaki</div>
            <div className="sline"></div>
          </div>
        </div>
      ) : (
        <div className="separator-section-default">
          <div className="stitle">Sıradaki</div>
          <div className="sline"></div>
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
