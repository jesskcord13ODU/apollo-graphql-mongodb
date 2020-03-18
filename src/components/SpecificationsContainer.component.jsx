import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
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

        <section title="specifications" >
            <nav>{specifications.map((ele, i) => 
                <SpecificationTab tabChange={handleChange}
                                name={ele.category}
                                key={i}/>)}
                <SpecificationTab name={"+"} tabChange={addTab} />
            </nav>
            <div className={"card"}>
                <div className={"card-body container"}>
                    <div className={"row"}>
                        <div className={"col-8"}>
                            <div aria-label={currTab}>
                                {console.log(spec)}
                                <SpecList specs={spec.specEntries} />
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <CommentList/>  
                        </div>
                    </div>               
                </div>
            </div>
        </section>



        // <section title="specifications" >
        //     <nav>{specifications.map((ele, i) => 
        //         <SpecificationTab tabChange={handleChange}
        //                           name={ele.category}
        //                           key={i}/>)}
        //         <SpecificationTab name={"+"} tabChange={addTab} />
        //     </nav>
        //     <div aria-label={currTab}>
        //         {console.log(spec)}
        //         <SpecList specs={spec.specEntries} />
        //     </div>
        // </section>
    );
}

const SpecificationTab = ({ name, tabChange }) => {
    return (
    <Button onClick={tabChange}>{name}</Button>
    );
}