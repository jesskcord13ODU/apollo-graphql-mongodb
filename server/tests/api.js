const axios = require('axios');

const API_URL = 'http://localhost:4000/';

const testFunctions = {
  getMissions: async () =>
    axios.post(API_URL, {
      query: `
        query {
          getAllMissions {
            missionId
            speccificationsT{
              category
              specEntries{
                  iconImage
                  title
                  description
                  bodyImage
                  color
              }
            }
          }
        }
      `
    }),


  getMissionEng: async () => 
    axios.post(API_URL, {
      query: `
        query {
          getMissionEng {
              name
              role
              permissions
              tags
              associatedMissions
              notifications
              alerts
          }
        }
      `
    })
}
  module.exports = testFunctions;
