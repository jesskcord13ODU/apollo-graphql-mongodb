const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        Mission: Mission
        specificationsT: specs
        specEntries: SpecEntry
        getAllMissions:[ Mission ]!
    }

   type Mission {
        missionId: String
        specificationsT: [ specs ]
    }

    type specs {
        category: String!
        specEntries: [ SpecEntry ]!
    }

    type SpecEntry {
        iconImage: String
        title: String
        description: String
        bodyImage: String
        color: String
    }
`;
    // type Mutation {
    //     saveMission(missionInput: MissionInput): Mission
    // }

    // schema {
    //     query: Query
    //     mutation: Mutation
    // }
    
module.exports = typeDefs;