import React from "react";
import {ProductProvider } from "./context/Context";
import './App.css';
import Home from "./views/Home";
//import io from 'socket.io-client';
//const socket = io('http://localhost:8080');


function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Home />
      </ProductProvider>
      <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
      </form>
    </div>
  );
}

export default App;
