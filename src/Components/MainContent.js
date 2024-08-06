import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndFilterGames } from "../Redux/gamesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../ScssComponents/MainContent.scss";

const MainContainer = () => {
  const dispatch = useDispatch();
  const { items: games, loading, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAndFilterGames());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <div className="game-box" key={game.id}>
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
