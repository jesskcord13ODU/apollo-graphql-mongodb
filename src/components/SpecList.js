import React, { useState, useEffect } from 'react';
import {SpecCard} from './SpecCard';
import { Card, CardHeader, CardBody, Col, InputGroup,
         InputGroupAddon, Button, Input, ListGroup, Tooltip, Container } from 'reactstrap';

const NewSpecButton = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className="card shadow-sm spec-create-button text-primary">
            <div className={"card-body"}>
                {/* <div className={"card-title"}> Create New Specification</div> */}
                <img id="newSpec" src={require(`../img/icons/plusCircle.png`)} className={"img-fluid"} alt={"Create New Specification"} />
                <Tooltip placement={"top"} isOpen={open} target={"newSpec"} toggle={toggle}>
                    Create New Specifications
                </Tooltip>
            </div>
        </div>
    );
}

export const SpecList = ({ specs }) => {

    const [visibleSpecs, setVisibleSpecs] = useState(specs);

    useEffect(() => {
        setVisibleSpecs(specs);
        document.getElementById("filter-input").value = "";
    }, [specs]);

    const filterSpecs = () => {
        let term = document.getElementById("filter-input").value;
        let filtered = specs.filter(spec => spec.title.toLowerCase().includes(term.toLowerCase()));
        setVisibleSpecs(filtered);
    }

    return (
        <Card className={"h-100 w-100 bg-light"}>
            <CardHeader>
                <Container>
                    <Col className={"d-flex justify-content-start"}>
                        <h3>Specifications</h3>
                    </Col>
                    <Col className={"d-flex justify-content-end"}>
                        <InputGroup mb={"3"}>
                            <Input id={"filter-input"} type={"text"} className={"form-control"} placeholder={""}/>
                            <InputGroupAddon addonType={"append"}>
                                <Button onClick={filterSpecs} color={"secondary"}>Filter</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Container>
            </CardHeader>
            <CardBody className={"spec-list h-100 w-100"}>
                <div className={"h-100 w-100 overflow-auto"}>
                    {   
                        visibleSpecs !== undefined ? visibleSpecs.map((ele, i) => 
                                <SpecCard iconImage={ele.iconImage}
                                    title={ele.title}
                                    description={ele.description}
                                    bodyImage={ele.bodyImage}
                                    color={ele.color}
                                    order={ele.order}
                                    key={i}/>)
                            :
                            "Waiting on data..."
                    }
                    <NewSpecButton />
                </div>
            </CardBody>
        </Card>
    )
}