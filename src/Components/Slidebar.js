import React from "react";
import "../ScssComponents/Slidebar.scss";
import FilterBox from "../Components/FilterBox";
import SearchBar from "./SearchBar";
import CategoryBar from "../Components/CategoryBar";
import filterIcon from "../assets/play-button.png";
import Timeicon from "../assets/clock.png";

const Slidebar = () => {
  return (
    <div className="slidebar">
      <div className="box-container">
        <div className="box left">
          <h3>Kütüphane Ana Sayfası</h3>
        </div>
        <div className="box right"></div>
      </div>
      <div className="filter-container">
        <FilterBox />
        <img src={Timeicon} alt="Time icon" className="Time-icon" />
        <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
      </div>
      <SearchBar />
      <CategoryBar /> {}
    </div>
  );
};

export default Slidebar;
