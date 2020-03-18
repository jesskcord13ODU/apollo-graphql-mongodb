import React from 'react';

const SpecContextButton = (props) => {
    return (
        <img src={require(`../img/icons/ellipsis.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecCommentsButton = (props) => {
    return (
        <img src={require(`../img/icons/comment.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecStatus = (props) => {
    return (
        <img src={require(`../img/icons/checkmark.png`)} className={"img-fluid"} alt={""} />
    )
}

const SpecCard = (props) => {
    // let fakeProps = {
    //     iconImage: "weather.png",
    //     title: "Lorem Ipsum",
    //     description: "Lorem ipsum ad infinitum",
    //     bodyImage: "weatherMap.jpg",
    //     color: "gray"
    // }
    // props = fakeProps;

    return (
        <div className={"card shadow-sm spec-card " + props.color}>
            <div className={"card-body container"}>
                <div className={"row"}>
                    <a href={"#"} className={"stretched-link"}/>
                    <div className={"col-1"}>
                            <img src={require(`../img/icons/${props.iconImage}`)} className={"img-fluid"}/>
                    </div>
                    <div className={"col-7"}>
                        <h3 className={"card-title"}>{props.title}</h3>
                        <p className={"card-text"}>{props.description}</p>
                    </div>
                    <div className={"col-3"}>
                        <img src={require(`../img/${props.bodyImage}`)} className={"img-fluid img-thumbnail"}/>
                    </div>
                    <div className={"col-1"}>
                        <div>
                            <SpecContextButton/>
                        </div>
                        <div>
                            <SpecStatus />
                            <SpecCommentsButton/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {SpecCard}