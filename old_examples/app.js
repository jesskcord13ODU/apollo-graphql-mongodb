const fetch = require("node-fetch");

function hello(url) {
    return fetch(url)
        .then(r => r.json())
        .then(r => console.log("r-->", r))
}

async function save(url, data) {

    await fetch(url, {
        method: 'POST',
        mode: "CORS"
    })
    .then(r => r.json())
    .then(r => {
        console.log("r-->", r)
        return r
    })

}

async function getem(url) {
    await fetch(url)
    .then(r => r.json())
    .then(r => {
        console.log("r-->", r)
        return r
    })
}
hello("http://localhost:8090/hello")

save("http://localhost:8090/save", 

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

)

getem("http://localhost:8090/retrieveMissions")