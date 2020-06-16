const fetch = require('node-fetch');
const MissionEng = require('./models/missionEng')
const { MongoClient } = require('mongodb');

const url = "mongodb://magoo:t1y2p3e4@localhost:27017/test?authSource=admin";
const client = new MongoClient(url);


MongoClient.connect(url, function(err, db){
    if(!err){
        console.log("Connected");
    }
    //var collection = db.collection('test')
});

//db.collection('test', function(err, col) {});
//listDatabases(client);


// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('connected to db')
// });

// var MissionEng = new mongoose.Schema ({
//     Name: String,
// 	Role: [],
// 	Permissions:  [],
// 	Tags: [],
// 	AssociatedMissions:  [],
// 	Notifications: [],
// 	Alerts: []
// });

// var missionEng = mongoose.model('MissionEng', MissionEng);

// var eng = new missionEng ({
//     Name: "Jessica",
//     Role: ["Role 1", "Role 2"],
//     Permissions: ["Perm 1", "Perm 2"],
//     Tags: ["Tag 1", "Tag 2"],
//     AssociatedMissions: [ "", ""],
//     Notifications: ["", ""],
//     Alerts: ["", ""]
// });

// eng.save(function (err){
//     if (err) console.log("Error on save");
//     else console.log("Saved");
// });

//db.collection.insertOne("Hello")

const resolvers = {
    Query: {

        getAllMissions: async (_source, MissionEngInput) => {
               return await fetch ('http://localhost:4000', {
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
    
           //console.log(m)
            return await fetch('http://localhost:4000', {
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

                 // Mission: async () => {
         //     let mm =
         //     {
         //         "missionId": "Jessica",
         //         "Specs": [{
         //             "Category": "This is the category",
         //             "SpecEntries": [{
         //                 "IconImage": "Image",
         //                 "Title": "SPEC TITLE",
         //                 "Description": "This is the description",
         //                 "BodyImage": "This is the body image",
         //                 "Color": "Blue"
         //             }] 
         //         }]
         //     };
         //     return mm;
    //     },

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
