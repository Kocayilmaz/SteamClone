import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAndFilterGames } from "../Redux/searchSlice";
import "../ScssComponents/FilterBox.scss";

const FilterBox = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.search);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!loading && !error) {
      const uniqueCategories = Array.from(
        new Set(items.map((game) => game.category))
      );
      setCategories(uniqueCategories);
    }
  }, [items, loading, error]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    dispatch(fetchAndFilterGames({ category }));
  };

  return (
    <div className="filter-box">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="filter-select"
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBox;
