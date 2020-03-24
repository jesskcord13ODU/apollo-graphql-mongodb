import React, {useEffect, useState} from 'react';
import { SpecsContainer } from './SpecificationsContainer.component';
import { Card , CardTitle, CardText, Container, Row, Col, CardDeck } from 'reactstrap';
// import { Link } from './router.component.jsx';

export const Mission = () => {
    const [Mission, setMission] = useState();
    const [currPage, setCurrPage] = useState('dash');

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}/retrieveMissions`)
            .then(raw => raw.json())
            .then(result => setMission(result[0]))
            .catch(error => {
                setMission({
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
                });
            });
    }, []);

    // TODO: [MEI-46] Move render props out to state from new mission loaded
    return (
        <Container aria-label={Mission !== undefined ? Mission.missionId : "TBD"}>
            <Row>
                <Col xs={"6"}>
                    <Card body>
                        <CardTitle className={"cust-card-title"}>
                            Project: {Mission !== undefined ? Mission.missionId : "TBD"}
                        </CardTitle>
                        <CardText className={"cust-card-title-sub"}>
                            <b>Project Description</b>: {Mission !== undefined ?
                                Mission.desc : "Please fill out in mission settings"
                            }
                        </CardText>
                        <CardText className={"cust-card-title-sub"}>
                            <b>Team</b>: {"Member profile will go here eventually"}
                        </CardText>
                    </Card>
                </Col>
                <Col />
            </Row>
        </Container>
    );
    // return (
    //     <main>
    //         {Mission !== undefined ?
    //             <SpecsContainer specifications={Mission.specificationsT}/>
    //             :
    //             <h2>Loading</h2>
    //         }
    //     </main>
    // );
}