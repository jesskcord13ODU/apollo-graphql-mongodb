import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
import { SpecList } from './SpecList';
import { CommentList } from './CommentList';

// The props should eventually be expaned to what is necessary
export const SpecsContainer = ({ specifications, specSelected }) => {
    const [currTab, setTab] = useState(specSelected === undefined ? 
                                            specifications[0].category :
                                            specSelected);
    const [spec, setSpec] = useState(specifications[0]);
    // useEffect will need to be adde
    useEffect(() => {
        const ele = specifications.filter(ele => {
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
        <div className={"spec-page"}>
            <nav>{specifications.map((ele, i) => 
                <SpecificationTab tabChange={handleChange}
                                name={ele.category}
                                key={i}/>)}
                <SpecificationTab name={"+"} tabChange={addTab} />
            </nav>
            <Card className={"spec-page"} role={"section"} aria-label={"specifications"}>
                <CardBody>
                    <Row>
                        <Col xs={"8"}>
                            <article title={currTab}>
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