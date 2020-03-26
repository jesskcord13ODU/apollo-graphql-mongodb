import React, { useState, useEffect } from 'react';
import { Routing, useRouterChange } from '../lib/RoutingCtxt.js';

const Router = ({ routesArr, mission, user }) => {
    const [CurrComp, setCurrComp] = useState();
    const [routes, _] = useState(routesArr);
    const state = useRouterChange();

    useEffect(() => {
        for (const ele of routes) {
            if (ele.path.indexOf(window.location.pathname) !== -1) {
                setCurrComp(ele.component);
                return;
            }
        }
        throw SyntaxError("Invalid URL requested");
    }, [state[0]["path"]]);

    return (
        <Routing>
            {CurrComp}
        </Routing>
    )
    // return (
    //     <CurrComp mission={mission} user={user}/>
    // );
}

export default Router;