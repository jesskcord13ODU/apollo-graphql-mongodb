import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Routing } from './lib/composed.component.jsx';
import { GlobalStore } from './lib/store.component.jsx';


import { Header, Footer } from './components/Landmarks';
import { Login } from "./components/Login.js";
import { Mission } from './components/Mission.component.jsx';

import './App.css';

const mission = {
    missionId: "JCAG",
    specificationsT: [{
      category: "Environment",
      specEntries: [
          {
              iconImage: "weather.png",
              title: "Weather",
              description: "Lorem ipsum ad infinitum",
              bodyImage: "weatherMap.jpg",
              color: "red",
              order: "1",
          },
          {
              iconImage: "terrain.png",
              title: "Terrain",
              description: "Lorem ipsum ad infinitum",
              bodyImage: "ambushMap.png",
              color: "green",
              order: "2",
          },
          {
              iconImage: "weather.png",
              title: "Lorem Ipsum3",
              description: "Lorem ipsum ad infinitum",
              bodyImage: "weatherMap.jpg",
              color: "blue",
              order: "3",
          }
      ]
    },
    {
      category: "Forces",
      specEntries: [
          {
              iconImage: "error.png",
              title: "Possible Enemy Armaments",
              description: "MP5, AK-47, SCAR, RPG, Vector",
              bodyImage: "arms.jpg",
              color: "red"
          },
          {
              iconImage: "knowledgeBase.png",
              title: "Intel Analysis",
              description: "Still waiting on final results",
              bodyImage: "analysis.jpg",
              color: "green"
          },
          {
              iconImage: "key.png",
              title: "Auth Chain",
              description: "Command chain to be deteremined soon",
              bodyImage: "faces/Desert.png",
              color: "purple"
          }
      ]
  },
  {
      category: "Operations",
      specEntries: [
          {
              iconImage: "upload.png",
              title: "Prepartion",
              description: "This mission requires these steps to prepare",
              bodyImage: "faces/Woman.png",
              color: "blue"
          },
          {
              iconImage: "download.png",
              title: "Deployment",
              description: "These units will be deployed here",
              bodyImage: "faces/Tank.png",
              color: "purple"
          }
      ]
  },
  {
      category: "Components",
      specEntries: [
          {
              iconImage: "gear.png",
              title: "Units",
              description: "Combat Ready Units",
              bodyImage: "faces/MilitaryGuy.png",
              color: "orange"
          }
      ]
  }]
};

/**
 * Route Object
 * 
 * @param {Array} path - Holds paths for components
 * @param {React.Element} component - Holds component for paths
 * @param {String} name - Text to be displayed
 */
const routes =[
  {id: 0, path: ['/login','/'], name: "Login", component: <Login />},
  {id: 1, path: ['/mission'], name: "Mission", component: <Mission />},
//   {id: 2, path: ['/specifications'], name: "Specifications", component: <Login />}
]

const initialState = {
  user: "",
  mission: "",
}

export default function App() {
    // TODO: [MEI-45] Simplify App main div soup
    return (
        <GlobalStore stateI={initialState}>
            <Container fluid className={"m-0 App Main d-flex flex-column align-items-stretch"}>
                <Header className={"align-self-start"}/>
                <Container className={"align-self-center h-100"} >
                    <Row className={"align-items-center h-100"}>
                        <Col></Col>
                        <Col xs={"10"}>
                            <Routing routes={routes}></Routing>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
                <Footer className={"align-self-end"}/>
            </Container>
        </GlobalStore>
    );
}