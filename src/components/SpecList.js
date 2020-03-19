import React from 'react';
import {SpecCard} from './SpecCard';

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
        <div className={"card bg-light spec-list container"}>
            <div className={"card-header row"}>
                <div className={"col d-flex justify-content-start"}>
                    <h3>Specifications</h3>
                </div>
                <div className={"col d-flex justify-content-end"}>
                    <div className={"input-group mb-3"}>
                        <input type={"text"} className={"form-control"} placeholder={"Test"}/>
                        <div className={"input-group-append"}>
                            <button className={"btn btn-secondary"} type={"button"}>Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"card-body row"}>
                <div className={"list-group"}>
                    {console.log(specs)}
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
                </div>
            </div>
        </div>
    )
}