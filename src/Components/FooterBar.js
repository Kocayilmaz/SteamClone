import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../ScssComponents/FooterBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const FooterBar = () => {
  const navigate = useNavigate();
  const downloadProgress = useSelector(
    (state) => state.download.downloadProgress
  );
  const isDownloading = useSelector((state) => state.download.isDownloading);
  const selectedGame = useSelector((state) => state.games.selectedGame);

  const handleManageDownloads = () => {
    navigate("/downloads");
  };

  return (
    <div className="footer-bar">
      <div className="footer-content">
        <div className="left" onClick={handleManageDownloads}>
          <FontAwesomeIcon icon={faNotesMedical} />
          <p>İndirmeleri Yönet</p>
        </div>
        <div className="center">
          {isDownloading && (
            <div className="progress-bar-wrapper">
              <div className="percent">{`${Math.round(
                downloadProgress
              )}%`}</div>

              <div className="update-status">Güncelleniyor</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              {selectedGame && (
                <img
                  src={selectedGame.gameicon}
                  alt={selectedGame.name}
                  className="game-icon"
                />
              )}
            </div>
          )}
        </div>
        <div className="right">
          <p>Arkadaşlar ve Sohbet</p>
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
