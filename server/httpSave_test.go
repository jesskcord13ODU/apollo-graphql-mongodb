

package main
/** 
 we only hit one API here.

 the rest depend on having a database up.

 */
import (
	"testing"
	"net/http/httptest"
	"net/http"
	"bytes"
	"io/ioutil"
	"os"
	"log"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/bitly/go-simplejson"
)



func TestPostSave(t *testing.T) {

	// gather connection string from env
	err := godotenv.Load()
	if err != nil {
		log.Print("No .env file found")
		return
	}
	mongoConnectionString = os.Getenv("CONN_STRING")
	// fmt.Printf("init: --> con string = %s\n", mongoConnectionString)

		

	var jsonStr = []byte(`
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
	`)
	req, err := http.NewRequest("POST", "/save", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(saveMissionToMongo)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `{"message":"Successfully saved body"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestPostRetrieve(t *testing.T) {

		// gather connection string from env
		err := godotenv.Load()
		if err != nil {
			log.Print("No .env file found")
			return
		}
		mongoConnectionString = os.Getenv("CONN_STRING")
		// fmt.Printf("init: --> con string = %s\n", mongoConnectionString)
	
		req, err := http.NewRequest("GET", "/retrieveMissions", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(retrieveMissions)
		handler.ServeHTTP(rr, req)
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v",
				status, http.StatusOK)
		}
	
		// Check the response body is what we expect.

		body, err := ioutil.ReadAll(rr.Body)
		// fmt.Printf("%s\n", string(body)) //WORKS
		// js, err := simplejson.NewJson(body)
		
		// total,_ := js.Get("total").String() 
	reqJSON, errJ := simplejson.NewJson(body)
		if errJ != nil {
			t.Errorf("Error while tranlating the returned JSON: %s", errJ)
		}
	myid := reqJSON.GetIndex(0).Get("missionId").MustString()
	if myid != "JCAS" {
		t.Errorf("expeected: JCAS : found %s", myid)
	}
	fmt.Printf("my id == %v : %v \n", myid, string(myid))

}
