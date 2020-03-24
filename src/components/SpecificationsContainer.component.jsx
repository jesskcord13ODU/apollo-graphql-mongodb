import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Row, Col, UncontrolledDropdown } from 'reactstrap';
import { SpecList } from './SpecList';
import { CommentList } from './CommentList';
import { useCustomContext } from '../lib/mgmt.component';

// The props should eventually be expaned to what is necessary
export const SpecsContainer = ({ specSelected }) => {
    const [{Missions}, setMission] = useCustomContext('global');
    const [state, setState] = useCustomContext('global');
    const [currTab, setTab] = useState(specSelected === undefined ?
                                        Missions !== undefined ?
                                          Missions.specifications[0].category :
                                            "TBD" : specSelected);
    const [spec, setSpec] = useState(Missions !== undefined ?
                                        Missions.specifications[0] :
                                            {});
    // useEffect will need to be adde
    useEffect(() => {
        console.log(state);
        if (Missions === undefined) { return; }
        const ele = Missions.specifications.filter(ele => {
            if (ele.category === currTab) { return ele}});
        console.log(ele[0]["category"]);
        setSpec(ele[0]);
    }, [currTab]);

    const handleChange = e => {
        e.preventDefault();
        setTab(e.target.innerText);
    }

    const addTab = e => {
        e.preventDefault();
        alert("Feature coming soon");
    }

    return (
        <div className={"h-100 w-100"}>
            <nav>{specifications.map((ele, i) => 
                <SpecificationTab tabChange={handleChange}
                                name={ele.category}
                                key={i}/>)}
                <SpecificationTab name={"+"} tabChange={addTab} />
            </nav>
            <Card className={"h-100 w-100"} role={"section"} aria-label={"specifications"}>
                <CardBody className={"h-100 w-100"}>
                    <Row className={"h-100 w-100"}>
                        <Col className={"h-100 w-100"} xs={"8"}>
                            <article className={"h-100 w-100"} title={currTab}>
                                {console.log(spec)}
                                <SpecList specs={spec.specEntries} />
                            </article>
                        </Col>
                        <Col xs={"4"}>
                            <CommentList/>  
                        </Col>
                    </Row>               
                </CardBody>
            </Card>
        </div>
    );
}

const SpecificationTab = ({ name, tabChange }) => {
    return (
    <Button onClick={tabChange}>{name}</Button>
    );
}