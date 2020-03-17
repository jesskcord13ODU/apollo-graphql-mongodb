import React from 'react';
import SpecCommentsButton from './SpecCommentsButton';
import SpecContextButton from './SpecContextButton';
import SpecStatus from './SpecStatus';

const SpecCard = (props) => {
    // let fakeProps = {
    //     iconImage: "weather.png",
    //     title: "Lorem Ipsum",
    //     description: "Lorem ipsum ad infinitum",
    //     bodyImage: "weatherMap.jpg"
    // }
    // props = fakeProps;
    
    const styles = {
        card: {
            textAlign: "left",
            maxWidth: "700px",
            display: "inline-flex"
        }
    }

    return (
        <div style={styles.card} className="card">
            <div className={"card-body container"}>
                <div className={"row"}>
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
                        <SpecContextButton />
                        <SpecStatus />
                        <SpecCommentsButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export {SpecCard}