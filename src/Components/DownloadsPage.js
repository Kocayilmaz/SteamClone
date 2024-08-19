import React from "react";
import "../ScssComponents/DownloadsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPause,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  toggleDownload,
  resetDownload,
  setCurrentDownload,
} from "../Redux/downloadSlice";

const DownloadsPage = () => {
  const dispatch = useDispatch();
  const downloadProgress = useSelector(
    (state) => state.download.downloadProgress
  );
  const isDownloading = useSelector((state) => state.download.isDownloading);
  const isPaused = useSelector((state) => state.download.isPaused);
  const gameDetailPageSelectedGame = useSelector(
    (state) => state.download.gameDetailPageSelectedGame
  );
  const currentDownload = useSelector(
    (state) => state.download.currentDownload
  );
  const downloadQueue = useSelector((state) => state.download.downloadQueue);

  const totalDownloadTime = 14;
  const gameSizeInGB = gameDetailPageSelectedGame?.size / 1024;

  const remainingTime = Math.max(
    totalDownloadTime - (downloadProgress / 100) * totalDownloadTime,
    0
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const downloadedSize = (downloadProgress / 100) * gameSizeInGB;
  const formattedSize = `${downloadedSize.toFixed(2)} GB`;
  const totalSize = `${gameSizeInGB?.toFixed(2)} GB`;

  const handleStopButtonClick = () => {
    dispatch(toggleDownload());
  };

  const handleCloseButtonClick = () => {
    dispatch(resetDownload());
    dispatch(toggleDownload());
  };
  const lineChartPoints = [
    { x: 10, y: 100 },

    { x: 20, y: 100 - downloadProgress / 2 + Math.sin(10) * 10 },
    { x: 30, y: 100 - downloadProgress / 2.2 + Math.sin(20) * 20 },
    { x: 40, y: 100 - downloadProgress / 2.5 + Math.sin(30) * 30 },
    { x: 45, y: 100 - downloadProgress / 2.8 + Math.sin(40) * 40 },
    { x: 50, y: 100 - downloadProgress / 3 + Math.sin(50) * 50 },
    { x: 55, y: 100 - downloadProgress / 3.2 + Math.sin(55) * 55 },
    { x: 65, y: 100 - downloadProgress / 3.5 + Math.sin(60) * 60 },
    { x: 70, y: 150 - downloadProgress / 3.8 + Math.sin(65) * 65 },
    { x: 75, y: 100 - downloadProgress / 4 + Math.sin(70) * 70 },
    { x: 80, y: 100 - downloadProgress / 4.2 + Math.sin(80) * 80 },
    { x: 84, y: 100 - downloadProgress / 4.5 + Math.sin(90) * 90 },
    { x: 100, y: 100 },
  ];

  const bars = lineChartPoints.map((point, index) => {
    if (index === 0) return null;
    const prevPoint = lineChartPoints[index - 1];
    const barWidth = point.x - prevPoint.x + 1;
    const barHeight = Math.max(100 - point.y, 0);
    const barY = Math.max(100 - barHeight, 0);
    return (
      <rect
        key={index}
        x={prevPoint.x}
        y={barY}
        width={barWidth}
        height={barHeight}
        fill="#1c9efb"
        stroke="#000"
        strokeWidth="1.5"
      />
    );
  });
  const waveChartPath = `M0,50 C20,${
    50 - downloadProgress / 5 + Math.sin(downloadProgress / 10) * 10
  } 40,${50 - downloadProgress / 4 + Math.sin(downloadProgress / 20) * 20} 60,${
    50 - downloadProgress / 3 + Math.sin(downloadProgress / 15) * 20
  } C80,${
    50 - downloadProgress / 2.5 + Math.sin(downloadProgress / 18) * 20
  } 100,${
    50 - downloadProgress / 2 + Math.sin(downloadProgress / 20) * 20
  } 120,50`;

  return (
    <div className="downloads-page">
      <div className="top-container">
        {currentDownload && (
          <>
            <div
              className="left-photo"
              style={{
                backgroundImage: `url(${currentDownload.gameDetailPhoto})`,
              }}
            ></div>
            <div className="content">
              <div className="chart-container">
                <div className="line-chart">
                  <svg width="100%" height="100%">
                    {bars}
                  </svg>
                </div>
                <div className="wave-chart">
                  <svg width="100%" height="100%">
                    <path
                      fill="none"
                      stroke="#00ff00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d={waveChartPath}
                      style={{
                        animation: "waveChartAnimation 2s ease-in-out infinite",
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isDownloading || downloadProgress > 0 ? (
        <div className="downloading-container">
          {currentDownload && (
            <div className="game-info">
              <div className="photo-and-text">
                <img
                  src={currentDownload.gridPhoto}
                  alt="Grid Photo"
                  className="grid-photo"
                />
                <div className="text">{currentDownload.name}</div>
              </div>
              <div className="progresses">
                <div className="progress-detail">
                  <div className="progress-detail-bar-top">
                    <div className="percent">
                      İNDİRİLİYOR
                      {`   ${Math.round(downloadProgress)}%`}
                    </div>
                    <div className="remaining-time-text">
                      {formatTime(remainingTime)}
                      <div className="span-kaldı">
                        <span> sn Kaldı</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-detail-bar-wrapper">
                    <div className="progress-detail-bar-container">
                      <div
                        className="progress-detail-bar"
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
                        {formattedSize}
                        <div className="all-size">
                          <span>/{totalSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="progresses-button">
                  <button
                    className="stop-button"
                    onClick={handleStopButtonClick}
                  >
                    <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
                  </button>
                  <button
                    className="close-button"
                    onClick={handleCloseButtonClick}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="queue">
            <div className="separator-section">
              <div className="stitle">Sıradaki</div>
              <div className="sline"></div>
            </div>
            {downloadQueue.length > 0 ? (
              downloadQueue.map((game) => (
                <div key={game.id} className="queue-item">
                  <div
                    className="queue-item-photo"
                    style={{ backgroundImage: `url(${game.icon})` }}
                  ></div>
                  <div className="queue-item-text">{game.name}</div>
                </div>
              ))
            ) : (
              <div className="queue-item-text">Kuyruk boş</div>
            )}
          </div>
        </div>
      ) : (
        <div className="separator-section-default">
          <div className="title">Sıradaki</div>
          <div className="line"></div>
          <div className="queue-item-text">Kuyruk boş</div>
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
