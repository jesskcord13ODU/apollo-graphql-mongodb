import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { SpecList } from './SpecList';

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
        <Card>
            <CardBody>
                <section title="specifications" >
                    <nav>{specifications.map((ele, i) => 
                        <SpecificationTab tabChange={handleChange}
                                        name={ele.category}
                                        key={i}/>)}
                        <SpecificationTab name={"+"} tabChange={addTab} />
                    </nav>
                    <div aria-label={currTab}>
                        {console.log(spec)}
                        <SpecList specs={spec.specEntries} />
                    </div>
                </section>
            </CardBody>
        </Card>
    );
}

const SpecificationTab = ({ name, tabChange }) => {
    return (
    <Button onClick={tabChange}>{name}</Button>
    );
}