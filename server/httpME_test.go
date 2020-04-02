

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
    "strings"
	"os"
	"log"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/bitly/go-simplejson"
)



func TestPostAdd(t *testing.T) {

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
                "name" : "chance",
                "role": ["lead" ],
                "permissions": ["read"],
                "tags" : [],
                "associatedMissions": [],
                "notifications" : [],
                "alerts" : []
            }
        `)
        
	req, err := http.NewRequest("POST", "/addMissionEngineer", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(addMissionEngineer)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `{"message":"Successfully saved mission engineer"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestGetMissionEngineers(t *testing.T) {

		// gather connection string from env
		err := godotenv.Load()
		if err != nil {
			log.Print("No .env file found")
			return
		}
		mongoConnectionString = os.Getenv("CONN_STRING")
		// fmt.Printf("init: --> con string = %s\n", mongoConnectionString)
	
		req, err := http.NewRequest("GET", "/getMissionEngineers", nil)
		if err != nil {
			t.Fatal(err)
		}
		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(getMissionEngineers)
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
	myid := reqJSON.GetIndex(0).Get("name").MustString()
	if myid != "chance" {
		t.Errorf("expected: chance : found %s", myid)
	}
	fmt.Printf("my id == %v : %v \n", myid, string(myid))

}

func TestModME(t *testing.T) {

    err := godotenv.Load()
    if err != nil {
        log.Print("No .env file found")
        return
    }
    var meNmStr = []byte(`
        {
            "name" : "chance",
            "role": ["lead" ],
            "permissions": ["create", "read", "update"],
            "tags" : [],
            "associatedMissions": [],
            "notifications" : [],
            "alerts" : []
        }
    `)

	fmt.Printf("mod ME by id-1-> %s\n", meNmStr)
		// gather connection string from env

	mongoConnectionString = os.Getenv("CONN_STRING")

    req, err := http.NewRequest("POST", "/modMissionEngineer", bytes.NewBuffer(meNmStr))
    if err != nil {
        t.Fatal(err)
    }
    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(modMissionEngineer)
    handler.ServeHTTP(rr, req)
    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }

	// Check the response body is what we expect.
    expected := `{"name":"chance","role":["lead"],"permissions":["create","read","update"],"tags":[],"associatedMissions":[],"notifications":[],"alerts":[]}`
    ers := strings.TrimSpace(rr.Body.String())
	if ers != expected {
		t.Errorf(": \ngot \n\t%v\n want \n\t%v",
			rr.Body.String(), expected)
	}


}