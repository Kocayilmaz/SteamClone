import React from "react";
import "../ScssComponents/Header.scss";
import logo from "../assets/icons8-steam-24.png";
import manIcon from "../assets/man.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBell,
  faBullhorn,
  faTimes,
  faMinus,
  faExpand,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // React Router v6 için

const Header = () => {
  const navigate = useNavigate(); // React Router v6

  const handleBack = () => {
    navigate(-1); // Tarayıcı geçmişinde bir adım geri gider
  };

  const handleForward = () => {
    navigate(1); // Tarayıcı geçmişinde bir adım ileri gider
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src={logo} alt="Steam Logo" />
        </div>
        <nav className="header-nav">
          <ul>
            <li>Steam</li>
            <li>Görünüm</li>
            <li>Arkadaşlar</li>
            <li>Oyunlar</li>
            <li>Yardım</li>
          </ul>
        </nav>
        <nav className="header-controls">
          <ul>
            <li className="blue-box">
              <b>
                <FontAwesomeIcon
                  icon={faBullhorn}
                  beatFade
                  style={{ color: "#fafafa" }}
                />
              </b>
            </li>
            <li className="green-box">
              <b>
                <FontAwesomeIcon
                  icon={faBell}
                  shake
                  style={{ color: "#ffffff" }}
                />
              </b>
            </li>
            <li className="wide-box">
              <div
                className="icon"
                style={{ backgroundImage: `url(${manIcon})` }}
              ></div>
              <div className="text">Profile</div>
            </li>
            <li className="icon-box">
              <FontAwesomeIcon icon={faTv} />
            </li>
            <li className="icon-box">
              <FontAwesomeIcon icon={faMinus} />
            </li>
            <li className="icon-box">
              <FontAwesomeIcon icon={faExpand} />
            </li>

            <li className="icon-box">
              <FontAwesomeIcon icon={faTimes} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-bottom">
        <div className="nav-icons">
          <div className="left" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="right" onClick={handleForward}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
        <nav className="header-nav-main">
          <ul>
            <li>Mağaza</li>
            <li className="active">Kütüphane</li>
            <li>Topluluk</li>
            <li>Profil</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
