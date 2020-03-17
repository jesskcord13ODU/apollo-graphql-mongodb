import React from 'react';
import {Header, Footer} from './components/Landmarks';
import Login from "./pages/Login"
import './App.css';
import { SpecCard } from './components/SpecCard';
import { SpecList } from './components/SpecList';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="Main">
          {/* <Login/> */}
          <SpecList />
      </header>
      <Footer />
    </div>
  );
}

export default App;

//Look into React-Router for page navigation
//Navbar shows differently depending on page (Login / All Projects / In Project)

//      <Login />