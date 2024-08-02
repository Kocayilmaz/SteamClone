import React from "react";
import "../ScssComponents/FilterBox.scss";
import filterIcon from "../assets/down-chevron.png";

const FilterBox = () => {
  return (
    <div className="filter-box">
      <h3>Oyunlar</h3>
      <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
    </div>
  );
};

export default FilterBox;
