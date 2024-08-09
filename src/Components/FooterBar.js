import React from "react";
import { useNavigate } from "react-router-dom";
import "../ScssComponents/FooterBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const FooterBar = () => {
  const navigate = useNavigate();

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
        <div className="right">
          <p>Arkadaşlar ve Sohbet</p>
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
