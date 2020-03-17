import React from 'react';
import ReactDOM from 'react-dom';
import { RouterStore } from './store.component.jsx';
import { Router } from './router.component.jsx';

export const Routing = ({ initialState, routes, children }) => {
    const component = routes.findIndex(x => {
        const curr = window.location.pathname;
        if (x.path.indexOf(curr) !== -1) {
            return x;
        }
        return '';
    });

    const initState = {
        ...initialState,
        ActiveComp: routes[component]["component"],
        currPath: window.location.pathname,
        id: '',
        routes: routes
    }

    return (
        <RouterStore initialState={ initState }>
            <Router routesArr={ routes }>
                { children }
            </Router>
        </RouterStore>
    );
} 