import React from 'react';
import {Header, Footer} from './components/Landmarks';
import Login from "./pages/Login"
import { Routing } from './components/composed.component.jsx';
import { GlobalStore } from './components/store.component.jsx';
import Mission from './components/Mission.component.jsx';
import './App.css';

/**
 * Route Object
 * 
 * @param {Array} path - Holds paths for components
 * @param {React.Element} component - Holds component for paths
 */
const routes =[
  {id: 0, path: ['/login','/'], name: "Login", component: <Login />},
  {id: 1, path: ['/mission'], name: "Mission", component: <Mission />},
  {id: 2, path: ['/specifications'], name: "Specifications", component: <Login />}
]

const initialState = {
  user: "",
  mission: "",
}

function App() {
  console.log(Routing);
  return (
    <GlobalStore className={"App Main"} stateI={initialState}>
      <Header />
      <Routing routes={routes}/>
      <Footer />
    </GlobalStore>
  );
}

export default App;

//Look into React-Router for page navigation
//Navbar shows differently depending on page (Login / All Projects / In Project)

//      <Login />