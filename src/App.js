import React from "react";

import Dropdown from "./components/Dropdown";

const r = (string) => {
  return string.split(",")[0];
};

function App(props) {
  return (
    <>
      <Dropdown />
    </>
  );
}

export default App;
