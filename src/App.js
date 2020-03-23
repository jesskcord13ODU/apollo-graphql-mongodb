import React, { useEffect } from 'react';
import {Header, Footer} from './components/Landmarks';
import Login from "./components/Login.js"
import {SpecList} from "./components/SpecList";
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { SpecsContainer } from './components/SpecificationsContainer.component.jsx';

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
  {id: 2, path: ['/specifications'], name: "Specifications", component: <Login />}
]

const initialState = {
  user: "",
  mission: "",
}

function App() {
  console.log(Routing);
  return (
    <div className={"App Main"}>
      <GlobalStore stateI={initialState}>
        <Header />
        <Routing routes={routes}/>
        <Footer />
      </GlobalStore>
    </div>
    <Container fluid className={"m-0 App Main d-flex flex-column align-items-stretch"}>
      <Header className={"align-self-start"}/>
      <Container fluid className={"align-self-center h-100"} >
        <Row className={"align-items-center h-100"}>
            <Col></Col>
            <Col xs={"10"}>
                <main>
                  <SpecsContainer specifications={mission.specificationsT}/>
                </main>
            </Col>
            <Col></Col>
        </Row>
      </Container>
      <Footer className={"align-self-end"}/>
    </Container>
  );
}

export default App;

//Look into React-Router for page navigation
//Navbar shows differently depending on page (Login / All Projects / In Project)

//      <Login />