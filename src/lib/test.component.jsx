import React, { useEffect, useState } from 'react';
import { PresetContextProvider, useStateValue, useCustomContext, CustContextProvider } from './mgmt.component.jsx';

const EffectTest = ({name, children}) => {
    const [state, dispatch] = useCustomContext(name);

    useEffect(() => {
        console.log(`New Value: ${state.value}`);
        console.log(state.rand);
    }, [state.value, state.rand]);

    return (
        <div>
            <p>New Value { state.value }</p>
            <p>Rand value { state.rand }</p>
            { children }
        </div>
    );
}

const ValueEle = ({ name, children }) => {
    const [inputVal, setInputVal] = useState();
    const [state, dispatch] = useCustomContext(name);

    useEffect(() => {
        console.log("How was random trigger?!");
    }, [state.rand])

    const handleClick = e => {
        e.preventDefault();
        dispatch({
            type: "setValue",
            value: inputVal
        });
    }

    const handleInput = e => {
        console.log(e);
        setInputVal(e.target.value);
    }

    return (
        <div>
            <p>Last passed value: { state.value }</p>
            <label htmlFor="val">New Value: <input id="val" onChange={ handleInput }></input></label>
            <button onClick={ handleClick }>Submit</button>
            { children }
        </div>
    );
}

const reducer = (state, action) => {
    const key = Object.keys(action)[1];
    switch (action.type) {
        case "setValue":
            return {
                ...state,
                [key]: action[key]
            }
        default:
            break;
    }
}


export const ValTest = ({ initialState }) => {
    return (
        <CustContextProvider name="Val" reducer={ reducer } initialState={ initialState }>
            <EffectTest name="Val" />
            <ValueEle name="Val" />
        </CustContextProvider>
    );
}

const OldEffect = ({ children }) => {
    const [{ value }, setVal] = useStateValue();
    //const [{ rand },] = useStateValue();

    useEffect(() => {
        console.log(`New value: ${value}`);
    }, [value]);

    return (
        <div>
            <p>New Value: {value}</p>
        </div>
    );
}

const OldValue = ({ children }) => {
    const [input, setInput] = useState();
    const [{ value }, setVal] = useStateValue();
    const [{ rand },] = useStateValue();

    useEffect(() => {
        console.log("How was rand changed?!");
    }, [rand]);

    const handleInput = e => {
        console.log(e);
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        console.log(e.target);
        setVal({
            type: "setValue",
            value: input
        });
    }

    return (
        <div>
            <label>Input Value: <input onChange={ handleInput }/></label>
            <button onClick={ handleSubmit }>Submit</button>
        </div>
        
    );
}

export const OldTest = ({ initialState, children }) => {
    return (
        <PresetContextProvider reducer={ reducer } initState={ initialState }>
            <OldEffect />
            <OldValue />
        </PresetContextProvider>
    );
}