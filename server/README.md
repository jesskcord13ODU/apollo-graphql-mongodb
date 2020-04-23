# How to run 

Run the go backend server
 - cd server
 - docker-compose -f compose.yml build
 - docker-compose -f compose.yml up

Run the graphql server
 - cd server/apollo
 - npm start

Nav to : http://localhost:4000

# Example mutations/queries
 - mutation{
    - addMissionEng(MissionEngInput:{name:"Jessica", role: ["role1", "role2"], permissions: ["permis1", "permis2"], tags: ["tag1", "tag2"],associatedMissions:["mission1", "mission2"], notifications: ["not1", "not2"], alerts:["al1", "al2"]}){
        - name
        - role
        - permissions
        - tags
        - associatedMissions

    - }
 - }


 - query{
    - getMissionEng{
    - name
    - permissions
    - role
    - }
 - }