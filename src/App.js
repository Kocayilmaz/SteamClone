import React from "react";
import "./App.scss";
import Header from "./Components/Header";
import Slidebar from "./Components/Slidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <Slidebar />
      <div className="main-content"></div>
    </div>
  );
}

export default App;
