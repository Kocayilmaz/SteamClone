import React, { useState } from "react";
import "../ScssComponents/SearchBar.scss";
import appIcon from "../assets/app.png";
import searchIcon from "../assets/search.png";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="İsme göre arama" /* Placeholder metnini buradan ayarlıyoruz */
          value={searchTerm}
          onChange={handleChange}
          style={{
            backgroundImage: `url(${searchIcon})` /* Arka plan görselini ayarlıyoruz */,
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
