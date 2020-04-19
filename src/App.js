import React from "react";
import Main from "./pages/Main";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import SocketContext from './components/SocketContext'
import * as io from 'socket.io-client'

const socket = io("http://localhost:4001");

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <SocketContext.Provider value={socket}>
        <Main />
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
