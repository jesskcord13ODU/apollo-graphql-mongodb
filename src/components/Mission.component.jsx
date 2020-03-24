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
            .then(result => setMission(result[0]));
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