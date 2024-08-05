import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAndFilterGames } from "../Redux/searchSlice";
import "../ScssComponents/CategoryBar.scss";

const CategoryBar = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchAndFilterGames());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const categories = Array.from(new Set(items.map((game) => game.category)));

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <div key={category} className="category">
          <div className="category-title">{category}</div>
          <div className="game-items">
            {items
              .filter((game) => game.category === category)
              .map((game) => (
                <div key={game.id} className="game-item">
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
