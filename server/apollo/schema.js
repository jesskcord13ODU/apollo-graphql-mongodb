const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        Mission: Mission
        specificationsT: specs
        specEntries: SpecEntry
        getAllMissions:[ Mission ]!
    }

    type Mutation {
        saveMission(MissionInput: MissionInput): Mission
    }

    type SpecEntry {
        iconImage: String
        title: String
        description: String
        bodyImage: String
        color: String
    }

    type specs {
        category: String!
        specEntries: [ SpecEntry ]!
    }

    type Mission {
        missionId: String
        specificationsT: [ specs ]
    }

    input SpecEntryInput {
        iconImage: String
        title: String
        description: String
        bodyImage: String
        color: String
    }

    input SpecInput {
        category: String
        specEntries: [ SpecEntryInput ]
    }

    input MissionInput {
        missionId: String
        specificationsT: [ SpecInput ]
    }
`;
 

    // schema {
    //     query: Query
    //     mutation: Mutation
    // }
    
module.exports = typeDefs;