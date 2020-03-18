import React from 'react';
import {SpecCard} from './SpecCard';

const NewSpecButton = () => {
    return (
        <div className="card shadow-sm spec-card none bg-primary text-white">
            <div className={"card-body container"}>
                <div className={"row"}>
                    <a href={"#"} className={"stretched-link"}/>
                    <div className={"col-1"}>
                        {/* <img src={require(`../img/icons/eye.png`)} className={"img-fluid"}/> */}
                    </div>
                    <div className={"col-11"}>
                        <h3 className={"card-title"}>Create New Specification</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SpecList = (props) => {
    
    let fakeProps = [
        {
            iconImage: "weather.png",
            title: "Weather",
            description: "Lorem ipsum ad infinitum",
            bodyImage: "weatherMap.jpg",
            color: "red"
        },
        {
            iconImage: "terrain.png",
            title: "Terrain",
            description: "Lorem ipsum ad infinitum",
            bodyImage: "ambushMap.png",
            color: "blue"
        },
        {
            iconImage: "weather.png",
            title: "Lorem Ipsum Long",
            description: "Lorem ipsum ad infinitum. Lorem ipsum ad infinitum. Lorem ipsum ad infinitum. Lorem ipsum ad infinitum.",
            bodyImage: "weatherMap.jpg",
            color: "red"
        }
    ]

    props = fakeProps;

    const listItems = props.map((prop) => 
        <SpecCard iconImage={prop.iconImage} title={prop.title} description={prop.description} bodyImage={prop.bodyImage} color={prop.color}/>
    );

    listItems.push(
        <NewSpecButton />
    );

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
                <div className={"list-group overflow-auto mh-100"}>
                    {listItems}
                </div>
            </div>
        </div>
    )
}

export {SpecList};