import React from 'react';
import { Card, CardBody, Container, Row, Col, CardImg } from 'reactstrap';

const SpecContextButton = () => {
    return (
        <img src={require(`../img/icons/ellipsis.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecCommentsButton = () => {
    return (
        <img src={require(`../img/icons/comment.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecStatus = () => {
    return (
        <img src={require(`../img/icons/checkmark.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecCard = ({ iconImage, bodyImage, title, description, color }) => {

    return (
        <Card className={"shadow-sm spec-card " + color}>
            <CardBody>
                <Container>
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
                </Container>
            </CardBody>
        </Card>
    )
}

export {SpecCard}