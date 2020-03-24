import React, { useEffect } from 'react';
import { useCustomContext } from './mgmt.component.jsx';
import { Button } from 'reactstrap';

/**
 * This link componenet is set-up to integrate compatibility with the 
 * history API with a native `a` tag.
 * 
 * @param {String} props.url - Url to navigate to
 * @param {String} props.name - Name of link
 * @param {String} props.linkClass - CSS class to style link with
 */
export const Link = ({ url, name, linkClass}) => {
    const [{ currPath }, setCurrPath] = useCustomContext("routing"); // Custom Hook for global context
    const handleClick = ev => {
        ev.preventDefault();
        // console.log(currPath) // To debug current path
        window.history.pushState({}, undefined, url); // Purely stores current page with History Browswer API
        setCurrPath({
            type: 'changeRoute',
            newPath: url
        });
    }

    return (
        <Button color={"primary"} onClick={handleClick}>{name}</Button>
    );
};

/**
 * This component will store the routes for the SPA, act as the mutator of
 * state for the routing, and push any changes of the url to the History
 * Web API to allow for expected behavior with the browser while reacting
 * to these changes.
 * 
 * Subject to change
 *   Route objects must follow as such:
 *     {
 *          id: [id], 
 *          path: [path], 
 *          name:[name], 
 *          component: [React.Component],
 *          no: [bool] // Optional and will only have effect if using navbar as it will skip rendering this route
 *      }    
 * 
 * @param {Array} RoutesArr - Stores the routes that the application can access
 * @param {Object} children - React default property that has children elements within JSX
 */
export const Router = ({ routesArr, children }) => {
    const [{ ActiveComp }, setComp] = useCustomContext("routing");
    const [{ currPath }, setPath] = useCustomContext("routing");
    const [{ id }, setId] = useCustomContext("routing");
    const [{ routes }, setRoutes] = useCustomContext("routing");

    useEffect(() => {
        storeRoutes();
        if (currPath !== undefined) {
            const url = window.location.pathname.split('/').slice(1);
            for (let i of routes) {
                let pathIdx = i.path.indexOf(currPath);
                if (pathIdx !== -1) {
                    setComp({
                        type: 'setActiveComp',
                        newComp: i.component
                    });
                    break;
                }
                pathIdx = 0;
                const match = i.path[pathIdx].match(/:\w+/g);
                const splitPath = i.path[pathIdx].split('/').slice(1);
                const idx = splitPath.indexOf(match !== null ? match[0] : -1);
                if (match !== undefined && idx !== -1 &&
                    url[idx - 1].indexOf(splitPath[idx - 1]) !== -1) {
                    setId({
                        type: 'setId',
                        newId: url[idx],
                    });
                    setComp({
                        type: 'setActiveComp',
                        newComp: i.component
                    });
                    break;
                }
            }
        } else {
            storePath(window.location.pathname);
        }
        window.onpopstate = storeLast;
    }, [currPath]);

    const storePath = url => {
        setPath({
            type: 'changeRoute',
            newPath: url
        });
    }

    const storeRoutes = () => {
        setRoutes({
            type: 'setRoutes',
            newRoutes: routesArr
        });
    }

    const storeLast = e => {
        e.preventDefault();
        storePath(window.location.pathname);
    }

    if (ActiveComp === undefined) {
        return (
            <div className={"container"}>
                { children }
                <p>Link not Found!</p>
            </div>
        );
    } else {
        return (
            <div className={"container"}>
                { children }
                { ActiveComp }
            </div>
        );
    }
};

/*

These will be implemented at a later date as they will be used to make
so routes can be passed as jsx rather than array in props.

export const Route = ({ pathT, componentT, nameT }) => {
    return (
        <div path={pathT} comp={componentT} name={nameT}></div>
    );
};

function* generateId() {
    let i = 0;
    while(true) {
        yield i++;
    }
}
*/