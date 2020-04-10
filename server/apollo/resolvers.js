const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const mission = require('./db');
const fetch = require('node-fetch');

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

        getAllMissions: async (_source, _args) => {
               return await fetch ('http://localhost:8090/retrieveMissions', {
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
        saveMission: async (_, { missionInput }) => {
            return await fetch('http://localhost:8090/save', {
                method: "POST",
                mode: 'cors',
                headers: {
                  'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
              }).then((res) => {
                  return res.json()
              })
              .catch(err => err); 
        }
    }
};

module.exports = resolvers;
