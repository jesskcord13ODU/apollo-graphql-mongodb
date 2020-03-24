import React, {useEffect, useState} from 'react';
import { SpecsContainer } from './SpecificationsContainer.component';
// import { Link } from './router.component.jsx';

export const Mission = () => {
    const [Mission, setMission] = useState();

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}/retrieveMissions`)
            .then(raw => raw.json())
            .then(result => setMission(result[0]))
            .catch(error => {
                setMission({
                    missionId: "JCAG",
                    specificationsT: [{
                      category: "Environment",
                      specEntries: [
                          {
                              iconImage: "weather.png",
                              title: "Weather",
                              description: "Lorem ipsum ad infinitum",
                              bodyImage: "weatherMap.jpg",
                              color: "red",
                              order: "1",
                          },
                          {
                              iconImage: "terrain.png",
                              title: "Terrain",
                              description: "Lorem ipsum ad infinitum",
                              bodyImage: "ambushMap.png",
                              color: "green",
                              order: "2",
                          },
                          {
                              iconImage: "weather.png",
                              title: "Lorem Ipsum3",
                              description: "Lorem ipsum ad infinitum",
                              bodyImage: "weatherMap.jpg",
                              color: "blue",
                              order: "3",
                          }
                      ]
                    },
                    {
                      category: "Forces",
                      specEntries: [
                          {
                              iconImage: "error.png",
                              title: "Possible Enemy Armaments",
                              description: "MP5, AK-47, SCAR, RPG, Vector",
                              bodyImage: "arms.jpg",
                              color: "red"
                          },
                          {
                              iconImage: "knowledgeBase.png",
                              title: "Intel Analysis",
                              description: "Still waiting on final results",
                              bodyImage: "analysis.jpg",
                              color: "green"
                          },
                          {
                              iconImage: "key.png",
                              title: "Auth Chain",
                              description: "Command chain to be deteremined soon",
                              bodyImage: "faces/Desert.png",
                              color: "purple"
                          }
                      ]
                  },
                  {
                      category: "Operations",
                      specEntries: [
                          {
                              iconImage: "upload.png",
                              title: "Prepartion",
                              description: "This mission requires these steps to prepare",
                              bodyImage: "faces/Woman.png",
                              color: "blue"
                          },
                          {
                              iconImage: "download.png",
                              title: "Deployment",
                              description: "These units will be deployed here",
                              bodyImage: "faces/Tank.png",
                              color: "purple"
                          }
                      ]
                  },
                  {
                      category: "Components",
                      specEntries: [
                          {
                              iconImage: "gear.png",
                              title: "Units",
                              description: "Combat Ready Units",
                              bodyImage: "faces/MilitaryGuy.png",
                              color: "orange"
                          }
                      ]
                  }]
                });
            });
    }, []);

    return (
        <main className={"h-100 w-100"}>
            {Mission !== undefined ?
                <SpecsContainer specifications={Mission.specificationsT}/>
                :
                <h2>Loading</h2>
            }
        </main>
    )
}