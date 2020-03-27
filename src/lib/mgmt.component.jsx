import React, {createContext, useContext, useReducer} from 'react';

const contextStore = {};

// Will have to experiment with creating a collection of contexts
export const PresetContext = createContext();
export const RouterContext = createContext();
export const GlobalContext = createContext();
export const CustContext = createContext();

export const PresetContextProvider = ({ reducer, initState, children }) => {
    return (
        <PresetContext.Provider value={ useReducer(reducer, initState)}>
            {children}
        </PresetContext.Provider>
    );
}

export const useStateValue = () => useContext(PresetContext);

export const RoutingContextProvider = ({ reducer, initialState, children }) => {
    return (
        <RouterContext.Provider value={useReducer(reducer, initialState)}>
            { children }
        </RouterContext.Provider>
    );
}

/**
 * Global State container that has been updated, but kept in-order for 
 * backwards compatibility. Really the custContext component will 
 * function the same.
 * 
 * @param {Function} props.reducer - Function to access and mutate data stored within initial state
 * @param {Object} props.initialState - Initial state for context system
 * @param {Object} props.children - Default value passed with props from react 
 */
export const GlobalContextProvider = ({ reducer, initialState, children }) => {
    return (
        <GlobalContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </GlobalContext.Provider>
    );
}

/**
 * Experimental!
 * 
 * This will append a new context given the name passed to the store and initialize
 * a provider off the newly created context.
 * 
 * @param {String} props.name - Name of the new context
 * @param {Function} props.reducer - The reducer function that will invoked be used upon calling this context
 * @param {Object} props.initialState - Will hold the initial state of the context
 * @param {Object} props.children - Will be passed by default when children present inside of JSX elements
 */
export const CustContextProvider = ({ reducer, initialState, children}) => {
    return (
        <CustContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </CustContext.Provider>
    );
}

/**
 * Custom hook of sorts that is to be used to access context
 *  
 * @param {String} contextName - Name to get context being stored within context store
 */
export const useCustomContext = contextName =>  {
    const routing = useContext(RouterContext);
    const ctxt = useContext(GlobalContext);
    const preset = useContext(PresetContext);
    const cust = useContext(CustContext);

    switch(contextName) {
        case "routing":
        case "router":
        case "Router":
            return routing;
        case "global":
        case "Global":
            return ctxt;
        case "preset":
        case "Preset":
            return preset;
        default:
            return cust;
    }   
}

/*
export const removeContext = (contextName = "GlobalContext") => {
    delete contextStore[contextName];
}*/