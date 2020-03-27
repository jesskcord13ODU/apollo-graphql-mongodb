import React from 'react';

import { GlobalContextProvider, RoutingContextProvider ,CustContextProvider } from './mgmt.component.jsx';

/**
 * This will attempt to generate switch-case like behavior automatically based on the initial state passed to the program. Think of 
 * setState from React except mutating global scope rather than local scope only. This may be changed to run the ruducer with Promies
 * in the future but right now a synchronous function that O(1) is utilized leaving no need until customization is brought into the 
 * picture to do uncertain nature of other peoples code.
 * 
 * @param {Object} Config.stateI This contains the initial state of the funciton and will attempt to generate switch case like behavior
 * @param {Object} Config.children Property used by react to pass child elements and props down chain 
 */
export const GlobalStore = ({ stateI, children }) => {
    let valMap = {};
    let initialState = {};

    if (typeof stateI[Symbol.iterator] === "function") {
        for (const ele of stateI) {
            valMap[`set${ele}`] = (state, action) => {
                return {
                    ...state,
                    ele: action[`new${ele}`]
                }
            }
        }
        initialState = {
            ...stateI
        }
    } else {
        for (const ele in stateI) {
            valMap[`set${ele}`] = (state, action) => {
                return {
                    ...state,
                    [ele]: action[ele]
                }
            }
        }
        for (const ele in stateI) {
            initialState[ele] = stateI[ele];
        }
    }

    // Instead of switch-case as below, will check if it exist 
    const reducer = (state, action) => {
        if (valMap.hasOwnProperty(action.type)) {
            return valMap[action.type](state, action);
        } else {
            return state;
        }
    }
    
    return (
        <GlobalContextProvider initialState={ initialState } reducer={ reducer }>
            { children }
        </GlobalContextProvider>
    );
};

/**
 * RouterStore will contain the state portion of page routing. This is to
 * have tracibility and set paths linked to componenets.
 * 
 * @param {Object} props.stateI - Contains the routes of the application
 * @param {Object} props.children - React will pass this down by default 
 */
export const RouterStore = ({ stateI, children }) => {
    const initialState = {
        ...stateI
    }

    const reducer = (state, action) => {
        // console.log(action); // Debug the action being called upon state container
        switch (action.type) {
            case 'changeRoute':
                return {
                    ...state,
                    currPath: action.newPath
                };
            case 'setRoutes':
                return {
                    ...state,
                    routes: action.newRoutes
                };
            case 'setActiveComp':
                return {
                    ...state,
                    ActiveComp: action.newComp
                };
            case 'setId':
                return {
                    ...state,
                    id: action.newId
                };
            default:
                return state;
        }
    }

    return (
        <RoutingContextProvider initialState={ initialState } reducer={ reducer }>
            { children }
        </RoutingContextProvider>
    );
}

/**
 * This is the Generic store that has four generic options in the reducer
 * function used for state mutation. These functions are:
 *      - setValue
 *          x Will create or update values that are specified
 *          x However, if they value has been deleted then an error will 
 *            be thrown
 *      - deleteValue
 *          x A graveyard flag is added to the value, and the previously
 *            stored value is archieved
 *      - recoverValue
 *          x Will remove the graveyard flag and reset the value to the
 *            one that was archieved
 * 
 * Please note that action objects must be formatted as:
 *      {type: [action], [key]: [value]}
 * The reasoning is that the key is calculated with the keys of the Object
 * thus even if the function doesn't take a value any must be passed as it 
 * will be "thrown out" by the GC. This maybe changed eventually.
 * 
 * @param {String} name - Name of the context container
 * @param {Object} stateI - Object containing the initial values of this generic state object 
 */
export const Store = ({ stateI, children }) => {
    const initState = {
        ...stateI
    }

    const reducer = (state, action) => {
        const key = Object.keys(action)[1];
        switch (action.type) {
            case "setValue":
                if (state.hasOwnProperty(key)) {
                    if (state[key] !== undefined && 
                            state[key].hasOwnProperty("graveyard")) { throw SyntaxError("Value has been deleted please use recoverValue"); }
                }
                return {
                    ...state,
                    [key]: action[key]
                };
                
            case "deleteValue":
                return {
                    ...state,
                    [key]: {graveyard: true, [key]: state[key]}
                };
            case "recoverValue":
                return {
                    ...state,
                    [key]: state[key][key]
                };
            default:
                console.log(`Please use setValue or expand reducer with custom function instead of ${action.type}`)
                console.log(state);
                break;
        }
    }

    return (
        <CustContextProvider reducer={ reducer } initialState={ initState }>
            { children}
        </CustContextProvider>  
    );
}