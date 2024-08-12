import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAndFilterGames } from "../Redux/searchSlice";
import { setSelectedGame } from "../Redux/gamesSlice";
import { fetchDownloadedGames } from "../Redux/downloadedGamesSlice";
import "../ScssComponents/CategoryBar.scss";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.search);
  const { downloadedGames } = useSelector((state) => state.downloadedGames);

  useEffect(() => {
    dispatch(fetchAndFilterGames());
    dispatch(fetchDownloadedGames());
  }, [dispatch]);

  const handleGameClick = (game) => {
    dispatch(setSelectedGame(game));
    navigate(`/game-detail/${game.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const categories = Array.from(new Set(items.map((game) => game.category)));

  const isGameDownloaded = (gameId) => {
    return downloadedGames.some((game) => game.id === gameId);
  };

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <div key={category} className="category">
          <div className="category-title">{category}</div>
          <div className="game-items">
            {items
              .filter((game) => game.category === category)
              .map((game) => (
                <div
                  key={game.id}
                  className={`game-item ${
                    isGameDownloaded(game.id) ? "downloaded" : ""
                  }`}
                  onClick={() => handleGameClick(game)}
                >
                  <img
                    src={game.gameicon}
                    alt={game.name}
                    className="game-icon"
                  />
                  <span>{game.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
