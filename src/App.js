import React from "react";
import Header from "./Components/Header";
import Slidebar from "./Components/Slidebar";
import MainContent from "./Components/MainContent";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Slidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
