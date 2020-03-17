import React from 'react';
import {SpecCard} from './SpecCard';

const SpecList = (props) => {
    
    let fakeProps = [
        {
            iconImage: "weather.png",
            title: "Weather",
            description: "Lorem ipsum ad infinitum",
            bodyImage: "weatherMap.jpg"
        },
        {
            iconImage: "terrain.png",
            title: "Terrain",
            description: "Lorem ipsum ad infinitum",
            bodyImage: "ambushMap.png"
        },
        {
            iconImage: "weather.png",
            title: "Lorem Ipsum3",
            description: "Lorem ipsum ad infinitum",
            bodyImage: "weatherMap.jpg"
        }
    ]

    props = fakeProps;

    const listItems = props.map((prop) => 
        <SpecCard iconImage={prop.iconImage} title={prop.title} description={prop.description} bodyImage={prop.bodyImage}/>
    );

    return (
        <div className={"list-group"}>
            {listItems}
        </div>
    )
}

export {SpecList};