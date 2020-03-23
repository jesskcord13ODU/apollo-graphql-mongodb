import React, { useReducer, createContext, useContext } from 'react';

const RouteContext = createContext();

export const Routing = ({ reducer, initialState, children }) => {
    return (
        <RouteContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </RouteContext.Provider>
    )
}

export const useRouterChange = () => useContext(RouteContext);