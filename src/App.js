import React, { useEffect } from 'react';
import {Header, Footer} from './components/Landmarks';
import Login from "./pages/Login"
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
              color: "red"
          },
          {
              iconImage: "terrain.png",
              title: "Terrain",
              description: "Lorem ipsum ad infinitum",
              bodyImage: "ambushMap.png",
              color: "green"
          },
          {
              iconImage: "weather.png",
              title: "Lorem Ipsum3",
              description: "Lorem ipsum ad infinitum",
              bodyImage: "weatherMap.jpg",
              color: "blue"
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

function App() {
  return (
    <Container fluid className={"App Main"}>
        <Row className={"align-self-start"}>
            <Header />
        </Row>
        <Row className={"align-self-center"}>
            <Col xs={"10"} className={""}>
                <main>
                    <SpecsContainer specifications={mission.specificationsT}/>
                </main>
            </Col>
        </Row>
        <Row className={"align-self-end"}>
            <Footer />
        </Row>
    </Container>
  );
}

export default App;

//Look into React-Router for page navigation
//Navbar shows differently depending on page (Login / All Projects / In Project)

//      <Login />