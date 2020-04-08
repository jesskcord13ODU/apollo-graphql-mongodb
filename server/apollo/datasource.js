//const { RESTDataSource } = require('apollo-datasource-rest');
//const schema = require('./schema');
const fetch = require('node-fetch');

const http = require('http');


function hello(){
    fetch ('http://localhost:8090/hello', {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type':'text/plain'
        }
      }).then((response) => {
          //return response.json();
          console.log(response.json)
      })
}

function getMissions(){
    fetch ('http://localhost:8090/retrieveMissions', {
        method: "GET",
        mode: 'cors'
      }).then((response) => {
          console.log(JSON.stringify(response));
      }).catch(err => {
          console.log(err);
      });
}

async function save(url= '', data= {}){
    const res = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(a => JSON.stringify(a))
      .catch(err => err);
      //return await response.json();
      console.log(res);
      return res;
};

// async function save(url='', data={}){
//     return await http.request({
//         hostname: url,
//         port: 8090,
//         path: "/save",
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }, res => {
//         let rawdata;
//         res.on("data", chunk => rawdata += chunk);
//         res.on("end", () => {
//             try{
//                 const contain = JSON.parse(rawdata);
//                 console.log(contain);
//                 return contain;
//             } catch(e) {
//                 console.error(e.message);
//             }
//         });
//     }).on("error", e => console.error(e.message))
// }

save('http://localhost:8090/save',     
`
	{
        "missionId": "JCAS",
        "specificationsT": [
            {
                "category": "Environment",
                "specEntries": [
                    {
                        "iconImage": "weather.png",
                        "title": "Weather",
                        "description": "Lorem ipsum ad infinitum",
                        "bodyImage": "weatherMap.jpg",
                        "color": "red"
                    },
                    {
                        "iconImage": "terrain.png",
                        "title": "Terrain",
                        "description": "Lorem ipsum ad infinitum",
                        "bodyImage": "ambushMap.png",
                        "color": "green"
                    },
                    {
                        "iconImage": "weather.png",
                        "title": "Lorem Ipsum3",
                        "description": "Lorem ipsum ad infinitum",
                        "bodyImage": "weatherMap.jpg",
                        "color": "blue"
                    }
                ]
            },
            {
                "category": "Forces",
                "specEntries": [
                    {
                        "iconImage": "error.png",
                        "title": "Possible Enemy Armaments",
                        "description": "MP5, AK-47, SCAR, RPG, Vector",
                        "bodyImage": "arms.jpg",
                        "color": "red"
                    },
                    {
                        "iconImage": "knowledgeBase.png",
                        "title": "Intel Analysis",
                        "description": "Still waiting on final results",
                        "bodyImage": "analysis.jpg",
                        "color": "green"
                    },
                    {
                        "iconImage": "key.png",
                        "title": "Auth Chain",
                        "description": "Command chain to be deteremined soon",
                        "bodyImage": "faces/Desert.png",
                        "color": "purple"
                    }
                ]
            },
            {
                "category": "Operations",
                "specEntries": [
                    {
                        "iconImage": "upload.png",
                        "title": "Prepartion",
                        "description": "This mission requires these steps to prepare",
                        "bodyImage": "faces/Woman.png",
                        "color": "blue"
                    },
                    {
                        "iconImage": "download.png",
                        "title": "Deployment",
                        "description": "These units will be deployed here",
                        "bodyImage": "faces/Tank.png",
                        "color": "purple"
                    }
                ]
            },
            {
                "category": "Components",
                "specEntries": [
                    {
                        "iconImage": "gear.png",
                        "title": "Units",
                        "description": "Combat Ready Units",
                        "bodyImage": "faces/MilitaryGuy.png",
                        "color": "orange"
                    }
                ]
            }
        ]
    }
	`).then((data) => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

hello();

//getMissions();

// async saveMission(){
//     return this.post('save');
// }

// async getMissionbyID(id) {
//     const data = await this.get('')
// }
