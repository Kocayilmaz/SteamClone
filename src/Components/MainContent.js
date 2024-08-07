// src/components/MainContainer.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndFilterGames, setSelectedGame } from "../Redux/gamesSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../ScssComponents/MainContent.scss";

const MainContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: games, loading, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAndFilterGames());
  }, [dispatch]);

  const handleGameClick = (game) => {
    dispatch(setSelectedGame(game));
    navigate("/game-detail");
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="header-section">
          <button className="all-games-button">Tüm Oyunlar</button>
          <button className="games-count-button">
            (98)
            <FontAwesomeIcon icon={faAngleDown} style={{ color: "#969696" }} />
          </button>
          <div className="separator-line"></div>
        </div>
        <div className="content">
          <div className="games-grid">
            {games.map((game) => (
              <div
                className="game-box"
                key={game.id}
                onClick={() => handleGameClick(game)}
              >
                <img src={game.gridPhoto} alt={game.title} />
                <p>{game.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
