import React from "react";
import Main from "./pages/Main";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Main />
    </BrowserRouter>
  );
}

export default App;
