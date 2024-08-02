import React, { useState } from "react";
import "../ScssComponents/SearchBar.scss";
import appIcon from "../assets/app.png";

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
          placeholder="🔍"
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="icon-container">
          <img src={appIcon} alt="App Icon" className="app-icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
