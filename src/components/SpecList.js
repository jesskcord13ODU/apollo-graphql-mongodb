import React from 'react';
import {SpecCard} from './SpecCard';

export const SpecList = ({ specs }) => {
    
    /*let fakeProps = [
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

    const listItems = entries.map(ele => 
        <SpecCard iconImage={ele.iconImage} title={ele.title} description={ele.description} bodyImage={prop.bodyImage}/>
    );*/
    return (
        <div className={"list-group"}>
            {console.log(specs)}
            {   
                specs !== undefined ? specs.map((ele, i) => 
                    <SpecCard iconImage={ele.iconImage}
                              title={ele.title}
                              description={ele.description}
                              bodyImage={ele.bodyImage}
                              key={i}/>)
                      :
                      "Waiting on data..."
            }
        </div>
    )
}