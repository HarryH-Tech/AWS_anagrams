import React from "react";

import Header from "./components/Header";
import OptionsContainer from "./components/OptionsContainer";

import "./assets/app.scss";

function App(props) {
  return (
    <div id="app-container">
      <Header />
      <OptionsContainer />
    </div>
  );
}

export default App;
