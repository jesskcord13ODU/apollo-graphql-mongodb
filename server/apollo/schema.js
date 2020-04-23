const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        Mission: Mission
        specificationsT: specs
        specEntries: SpecEntry
        getAllMissions:[ Mission ]
        getMissionEng: [ MissionEng ]
    }

    type Mutation {
        saveMission(MissionInput: MissionInput): Mission!
        addMissionEng(MissionEngInput: MissionEngInput): MissionEng

    }

    type MissionEng {
        name: String
        role: [ String ]
        permissions: [ String ]
        tags: [ String ]
        associatedMissions: [ String ]
        notifications: [ String ]
        alerts: [ String ]
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
        specEntries: [ SpecEntry ]
    }

    type Mission {
        missionId: String
        specificationsT: [ specs ]
    }

    input MissionEngInput {
         name: String
         role: [ String ]
         permissions: [ String ]
         tags: [ String ]
         associatedMissions: [ String ]
         notifications: [ String ]
         alerts: [ String ]
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
    

    //modMissionEng(MissionEngInput: MissionEngInput): MissionEng!
    //addMissionEng(name: String, role: [String], permissions: [String], tags: [String], associatedMissions: [String], notifications: [String], alerts: [String] ): MissionEng


   

module.exports = typeDefs;