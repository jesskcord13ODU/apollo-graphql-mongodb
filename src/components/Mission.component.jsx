import React from 'react';
import { Link } from './router.component.jsx';

const Mission = () => {
    return (
        <div>I'm a mission, look at me now!<br /><Link url={"/login"} name={"To login"}/></div>
    )
}

export default Mission;