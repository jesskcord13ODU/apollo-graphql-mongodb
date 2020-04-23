const chai = require('chai');
const Gets = require('./api');
//const resolve = require('../apollo/resolvers')
const add = require('../apollo/datasource')
const expect = chai.expect;

const mission = {
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
    }],
};
//    {
//       category: "Forces",
//       specEntries: [
//           {
//               iconImage: "error.png",
//               title: "Possible Enemy Armaments",
//               description: "MP5, AK-47, SCAR, RPG, Vector",
//               bodyImage: "arms.jpg",
//               color: "red"
//           },
//           {
//               iconImage: "knowledgeBase.png",
//               title: "Intel Analysis",
//               description: "Still waiting on final results",
//               bodyImage: "analysis.jpg",
//               color: "green"
//           },
//           {
//               iconImage: "key.png",
//               title: "Auth Chain",
//               description: "Command chain to be deteremined soon",
//               bodyImage: "faces/Desert.png",
//               color: "purple"
//           }
//       ]
//   },
//   {
//       category: "Operations",
//       specEntries: [
//           {
//               iconImage: "upload.png",
//               title: "Prepartion",
//               description: "This mission requires these steps to prepare",
//               bodyImage: "faces/Woman.png",
//               color: "blue"
//           },
//           {
//               iconImage: "download.png",
//               title: "Deployment",
//               description: "These units will be deployed here",
//               bodyImage: "faces/Tank.png",
//               color: "purple"
//           }
//       ]
//   },
//   {
//       category: "Components",
//       specEntries: [
//           {
//               iconImage: "gear.png",
//               title: "Units",
//               description: "Combat Ready Units",
//               bodyImage: "faces/MilitaryGuy.png",
//               color: "orange"
//           }
//       ]
//   }]


const missionEng = {
    name: "Robert",
    role: ["National Guard", "Shipman"],
    permissions: ["admin", "user"],
    tags: ["Navy", "Stelth"],
    associatedMissions: ["Mission1", "Mission3"],
    notifications: ["Try this", "Approve this"],
    alerts: ["Urgent", "asap"]
}

//-----------------------------------------------------------------

describe("test getting missions and mission engineers", () => {
    it("gets all missions", async () => {
        const res = await Gets.getMissions()

        let res_missionID = Object.values(res['data'])[0].getMissions.missionId
        let res_specs = Object.values(res['data'])[0].getMissions.specificationsT.category

        expect(res_missionID).to.eql('JCAG')
        expect(res_specs).to.eql('Environment')
    }),
    it("gets all mission engineers", async () => {
        const res = await Gets.getMissionEng()

        let res_name = Object.values(res['data'])[0].getMissionEng.name
        let res_role = Object.values(res['data'])[0].getMissionEng.role

        expect(res_name).to.eql('Robert')
        expect(res_role).to.eql(["National Guard", "Shipman"])
    })
})