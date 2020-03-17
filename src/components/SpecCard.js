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
        
        get: (args) => {
            let concat = args.split(" ").map(str => styles[str]);
            return Object.assign({}, ...concat);
        },

        card: {
            textAlign: "left",
            maxWidth: "700px",
            display: "inline-flex"
        },

        col: {
            padding: "5px",
        },

        col1: {
            textAlign: "center",
            width: "11.11%"
        },

        col5: {
            width: "55.55%"
        },

        col2: {
            width: "22.22%"
        },

        context: {
            float: "top"
        },

        col1Item: {
            maxHeight: "25%"
        }
    }

    return (
        <div className="card">
            <div style={styles.card} className="card-body">
                <div style={styles.get("col col1")}>
                    <img src={require(`../img/icons/${props.iconImage}`)} className="" alt="" />
                </div>
                <div style={styles.get("col col5")}>
                    <h3 className="card-title">{props.title}</h3>
                    <p className="card-text">{props.description}</p>
                </div>
                <div style={styles.get("col col2")}>
                    <img src={require(`../img/${props.bodyImage}`)} className="img-fluid img-thumbnail" alt="" />
                </div>
                <div style={styles.get("col col1")}>
                    <SpecContextButton />
                    <SpecStatus />
                    <SpecCommentsButton />
                </div>
            </div>
        </div>
    )
}

export {SpecCard}