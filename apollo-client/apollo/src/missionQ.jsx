import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
//import { Mission } from "../../../client/src/components/Mission.component";

const GET_MISSIONS = gql`
    query {
        getAllMissions {
            missionId
            specificationsT{
                category
                specEntries{
                    title
                    description
                }
            }
        }
    }
`;

// const getHello = gql`
//     query {
//         hello
//     }
// `

// const Missions = () => {
//   const { data, loading, error} = useQuery(GET_MISSIONS);
//   if (error) {
//     return error;
//     return <div>Error</div>;
//   }

//   if (loading) {
//     return (
//       <div className="App">
//         <h2>Loading...</h2>
//       </div>
//     );
//   }
//   if (data) {
//     console.log(data)
//     return (
//     <div>
//         { data.missionId && data.specificationsT && data.specEntries.map((mission) => (
//             <div key={ mission } mission={ mission }>
//                  <p>{ mission.missionId }</p>
//                  <div key={ mission.specificationsT }>
//                      <p>{ mission.specificationsT.category }</p>
//                 </div>
//             </div>
//         )) }
//     </div>
//     );
//   }
// }

const Missions = () => {
    const { data, loading, error} = useQuery(GET_MISSIONS);
    if (error) {
      return error;
      //return <div>Error</div>;
    }
  
    if (loading) {
      return (
        <div className="App">
          <h2>Loading...</h2>
        </div>
      );
    }
    if (data) {
      return (
      <div>
          <p> hi </p>
          { data["getAllMissions"].map((missionKey, i) => (
              <div key={ i } className="mission">
                  <p>{ missionKey.missionId }</p>
                  <div key={ i }>
                    <p>{ missionKey.specificationsT.category }</p>
                  </div>
              </div>
          )) }
      </div>
      );
    }
  }

// const Missions = () => {
//     const { data, loading, error} = useQuery(GET_MISSIONS);
//     if (error) {
//       return error;
//       //return <div>Error</div>;
//     }
  
//     if (loading) {
//       return (
//         <div className="App">
//           <h2>Loading...</h2>
//         </div>
//       );
//     }
//     if (data) {
//       return (
//       <div className="missions">
//           <p> hi </p>
//           { data["getAllMissions"].map((missionKey, i) => (
//               <div key={ i } className="mission">
//                   <p>{ missionKey.missionId }</p>
//               </div>
//           )) }
//       </div>
//       );
//     }
//   }

export default Missions;