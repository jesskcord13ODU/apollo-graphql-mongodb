import React, {useEffect, useState} from 'react';
import { SpecsContainer } from './SpecificationsContainer.component';
// import { Link } from './router.component.jsx';

export const Mission = () => {
    const [Mission, setMission] = useState();

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}/retrieveMissions`)
            .then(raw => raw.json())
            .then(result => setMission(result[0]));
    }, []);

    return (
        <main>
            {Mission !== undefined ?
                <SpecsContainer specifications={Mission.specificationsT}/>
                :
                <h2>Loading</h2>
            }
        </main>
    )
}