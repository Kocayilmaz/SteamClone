import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAndFilterGames } from "../Redux/searchSlice";
import "../ScssComponents/SearchBar.scss";
import appIcon from "../assets/app.png";
import searchIcon from "../assets/search.png";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const debouncedFetchAndFilterGames = debounce((term) => {
    dispatch(fetchAndFilterGames(term));
  }, 500);

  useEffect(() => {
    debouncedFetchAndFilterGames(searchTerm);

    return () => {
      debouncedFetchAndFilterGames.cancel();
    };
  }, [searchTerm, debouncedFetchAndFilterGames]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="İsme göre arama"
          onChange={handleChange}
          style={{
            backgroundImage: `url(${searchIcon})`,
          }}
        />
        <div className="icon-container">
          <img src={appIcon} alt="App Icon" className="app-icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
