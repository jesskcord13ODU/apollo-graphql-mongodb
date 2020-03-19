import React from 'react';
import {SpecCard} from './SpecCard';
import { Card, CardHeader, CardBody, Row, Col, InputGroup,
         InputGroupAddon, Button, Input, ListGroup } from 'reactstrap';

const NewSpecButton = () => {
    return (
        <div className="card shadow-sm spec-create-button text-primary">
            <div className={"card-body container"}>
                <a href={"#"} className={"stretched-link"}>
                    <img src={require(`../img/icons/plusCircle.png`)} className={"img-fluid"} alt={"Create New Specification"} />
                </a>
            </div>
        </div>
    );
}

export const SpecList = ({ specs }) => {

    return (
        <Card className={"card bg-light spec-list container"}>
            <CardHeader>
                <Col className={"d-flex justify-content-start"}>
                    <h3>Specifications</h3>
                </Col>
                <Col className={"d-flex justify-content-end"}>
                    <InputGroup mb={"3"}>
                        <Input type={"text"} className={"form-control"} placeholder={"Test"}/>
                        <InputGroupAddon addonType={"append"}>
                            <Button color={"secondary"}>Filter</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {   
                        specs !== undefined ? specs.map((ele, i) => 
                            <SpecCard iconImage={ele.iconImage}
                                    title={ele.title}
                                    description={ele.description}
                                    bodyImage={ele.bodyImage}
                                    color={ele.color}
                                    key={i}/>)
                            :
                            "Waiting on data..."
                    }
                    <NewSpecButton />
                </ListGroup>
            </CardBody>
        </Card>
    )
}