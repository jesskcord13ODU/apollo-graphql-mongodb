import React, { useState, useEffect, useContext } from 'react';
import { useRouterChange } from '../lib/RoutingCtxt.js';
import { Button } from 'reactstrap';

/**
 * Link Component
 * 
 * @param {String} props.header - Text to display in Link
 * @param {String} props.urlI - URL or URI to send to link to
 * @param {Boolean} [props.external=false] - Marks whether to append to current host or whether to just place url
 */
const Link = ({ header, urlI, children}) => {
    const [url, _] = useState(urlI);
    const [{ path }, setPath] = useRouterChange();
    console.log(path);
    // Utilizes History Web API to mutate URL
    const handleChange = e => {
        e.preventDefault();
        window.history.pushState({}, undefined, url);
        setPath(url);
    }

    if (Object.keys(children).length === 0) {
        return (
            <Button onClick={handleChange}>
                {header}
            </Button>
        );
    } else {
        <div onClick={handleChange} className={className}>
            {children}
        </div>
    }
    
}

export default Link;