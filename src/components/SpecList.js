import React, { useState } from 'react';
import {SpecCard} from './SpecCard';
import { Card, CardHeader, CardBody, Row, Col, InputGroup,
         InputGroupAddon, Button, Input, ListGroup, Tooltip } from 'reactstrap';

const NewSpecButton = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className="card shadow-sm spec-create-button text-primary">
            <div className={"card-body container"}>
                <img id="newSpec" src={require(`../img/icons/plusCircle.png`)} className={"img-fluid"} alt={"Create New Specification"} />
                <Tooltip placement={"top"} isOpen={open} target={"newSpec"} toggle={toggle}>
                    Create New Specifications
                </Tooltip>
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