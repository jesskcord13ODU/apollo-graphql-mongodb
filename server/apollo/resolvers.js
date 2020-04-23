const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const mission = require('./db');
const fetch = require('node-fetch');
const { MissionEngInput } = require('./schema')


const resolvers = {
    Query: {
        Mission: async () => {
            let mm =
            {
                "missionId": "Jessica",
                "Specs": [{
                    "Category": "This is the category",
                    "SpecEntries": [{
                        "IconImage": "Image",
                        "Title": "SPEC TITLE",
                        "Description": "This is the description",
                        "BodyImage": "This is the body image",
                        "Color": "Blue"
                    }] 
                }]
            };
            return mm;
        },

        getAllMissions: async (_source, MissionEngInput) => {
               return await fetch ('http://localhost:8090/retrieveMissions', {
                    method: "GET",
                    mode: 'cors'
                    }).then((response) => {
                        return response.json();
                    }).catch(err => {
                        console.log(err);
                    });
        },

        getMissionEng: async () => {
            return await fetch ('http://localhost:8090/getMissionEngineers', {
                 method: "GET",
                 mode: 'cors'
                 }).then((response) => {
                     return response.json();
                 }).catch(err => {
                     console.log(err);
                 });
     }

    },
    Mutation: {
        addMissionEng: async (_, { MissionEngInput } ) => {
            //console.log(MissionEngInput.name)
            const m = 
                    {
                        name: MissionEngInput.name,
                        role: MissionEngInput.role,
                        permissions: MissionEngInput.permissions,
                        tags: MissionEngInput.tags,
                        associatedMissions: MissionEngInput.associatedMissions,
                        notifications: MissionEngInput.notifications,
                        alerts: MissionEngInput.alerts
                    }
      
           // console.log(m)
            return await fetch('http://localhost:8090/addMissionEngineer', {
                method: "POST",
                mode: 'cors',
                headers: {
                  'Content-Type':'application/json'
                },
                body: JSON.stringify(m)
            }).then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch(err => err);
        },

        // modMissionEng: async ( data ) => {
        //     return await fetch('http://localhost:8090/modMissionEngineer', {
        //         method: "POST",
        //         mode: 'cors',
        //         headers: {
        //           'Content-Type':'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     }).then((res) => {
        //         return res.json()
        //     })
        //     .catch(err => err); 
        // }
    }
};

module.exports = resolvers;
