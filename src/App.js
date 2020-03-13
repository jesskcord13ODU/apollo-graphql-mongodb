import React from 'react';
import {FOUOheader, FOUOfooter} from './components/FOUO';
import Login from "./pages/Login"
import './App.css';

function App() {
  return (
    <div className="App">
      <FOUOheader />
      <Login />
      <FOUOfooter />
    </div>
  );
}

export default App;

//Change Login to be "Page", have it dynamically change?