import React, {useEffect, useState} from 'react';
import { SpecsContainer } from './SpecificationsContainer.component';
import { Card , CardTitle, CardText, Container, Row, Col, CardDeck, CardHeader, CardImg } from 'reactstrap';
import { useCustomContext } from '../lib/mgmt.component.jsx';
// import { Link } from './router.component.jsx';

import knowBase from '../img/knowledgeBase.png';
import metrics from '../img/metricBuilder.png';
import missionD from '../img/missionDesigner.png';
import threadB from '../img/threadBuilder.png';

export const Mission = () => {
    const [Mission, setMission] = useState();
    const [currPage, setCurrPage] = useState('dash');
    const [pages, _] = useState({
        page: 'dash',
        component: <Dashboard Mission={Mission} />
    });

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
        <main>
            {Mission !== undefined ?
                <SpecsContainer specifications={Mission.specificationsT}/>
                :
                <h2>Loading</h2>
            }
        </main>
    // <Card>
    //                         <CardHeader>Knowledge Base</CardHeader>
    //                         <img
    //                             className={"mission-img-link"}
    //                             src={require("../img/knowledgeBase.png")}
    //                         />
    //                     </Card>

    // <Card>
    //                         <CardHeader>Metric Builder</CardHeader>
    //                         <img
    //                             className={"mission-img-link"}
    //                             src={require('../img/metricBuilder.png')}
    //                         />
    //                     </Card>

    // <Card>
    //                         <CardHeader>Thread Builder</CardHeader>
    //                         <img
    //                             className={"mission-img-link"}
    //                             src={require('../img/threadBuilder.png')}
    //                         />
                        
    //                     </Card>

    // <Card>
    //                         <CardHeader>Mission Designer</CardHeader>
    //                         <img 
    //                             className={"mission-img-link"}
    //                             src={require('../img/missionDesigner.png')}
    //                         />
    //                     </Card>
    );
}

const Dashboard = ({Mission, changePage}) => {
    return (
        <Container aria-label={Mission !== undefined ? Mission.missionId : "TBD"}
                   className={"d-flex flex-column h-100"}
                   style={{justifyContent: "space-evenly"}}>
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
            <Row className={"h-50"}>
                <Col xs={"12"} className={"h-100"}>
                    <CardDeck className={"dash-icons h-100"}>
                        <ImgLink name={"Mission Designer"}
                                  img={missionD}
                                  link={"specification"} 
                                  changePg={changePage}
                                  />
                        <ImgLink name={"Thread Builder"}
                                  img={threadB}
                                  link={"/threadBuilder"} 
                                  changePg={changePage}
                                  />
                        <ImgLink name={"Metric Builder"}
                                  img={metrics}
                                  link={"/metricBuilder"} 
                                  changePg={changePage}
                                  />
                        <ImgLink name={"Knowledge Base"}
                                  img={knowBase}
                                  link={"/knowledgeBase"}
                                  changePg={changePage}
                                  />
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
}

const ImgLink = ({name, img, link, changePg}) => {
    const [{ currPath }, setCurrPath] = useCustomContext("routing"); // Custom Hook for global context
    const handleClick = () => {
        changePg(link);
    }

    return (
        <Card onClick={handleClick}>
            <CardHeader>{name}</CardHeader>
            <img
                className={"mission-img-link"}
                src={img}
            />
        </Card>
    );
}