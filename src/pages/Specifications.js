import React from 'react'
import '../App.css';
import { SpecList } from '../components/SpecList';
import { CommentList } from '../components/CommentList';

const Specifications = () => {
    return (
        <div className={"card"}>
            <div className={"card-body container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <SpecList />
                    </div>
                    <div className={"col"}>
                        <CommentList/>  
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Specifications