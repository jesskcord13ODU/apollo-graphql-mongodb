import React from 'react';
import SpecCommentsButton from './SpecCommentsButton';
import SpecContextButton from './SpecContextButton';
import SpecStatus from './SpecStatus';
import { Card, CardBody, Row, Col } from 'reactstrap';

const SpecCard = ({ iconImage, bodyImage, title, description }) => {
    // let fakeProps = {
    //     iconImage: "weather.png",
    //     title: "Lorem Ipsum",
    //     description: "Lorem ipsum ad infinitum",
    //     bodyImage: "weatherMap.jpg"
    // }
    // props = fakeProps;

    return (
        <Card className={"card"}>
            <CardBody>
                <Row>
                    <Col xs={"1"}>
                        <img src={require(`../img/icons/${iconImage}`)} className={"img-fluid"}/>
                    </Col>
                    <Col xs={"7"}>
                        <h3 className={"card-title"}>{title}</h3>
                        <p className={"card-text"}>{description}</p>
                    </Col>
                    <Col xs={"3"}>
                        <img src={require(`../img/${bodyImage}`)} className={"img-fluid img-thumbnail"}/>
                    </Col>
                    <Col xs={"1"}>
                        <SpecContextButton />
                        <SpecStatus />
                        <SpecCommentsButton />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export {SpecCard}