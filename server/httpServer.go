package main

/**
save and retrieve json from a mongo instance

*/
import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoConnectionString string
var collection *mongo.Collection
// var mongoConnectionString = "mongodb://magoo:t1y2p3e4@localhost:27017/test?authSource=admin"


/**
* mission engineer definition
*/
type MissionEngineer struct {
	Name string `json:"name"`
	Role []string `json:"role"`
	Permissions []string `json:"permissions"`
	Tags []string `json:"tags"`
	AssociatedMissions []string `json:"associatedMissions"`
	Notifications []string `json:"notifications"`
	Alerts []string `json:"alerts"`
}

// The structure I'll work with
//
// we will replace this with our mission specification soon enough

type MissionSpecification struct {
	MissionID       string `json:"missionId"`
	SpecificationsT []struct {
		Category    string `json:"category"`
		SpecEntries []struct {
			IconImage   string `json:"iconImage"`
			Title       string `json:"title"`
			Description string `json:"description"`
			BodyImage   string `json:"bodyImage"`
			Color       string `json:"color"`
		} `json:"specEntries"`
	} `json:"specificationsT"`
}

type SpecEntry struct {
	IconImage   string `json:"iconImage"`
	Title       string `json:"title"`
	Description string `json:"description"`
	BodyImage   string `json:"bodyImage"`
	Color       string `json:"color"`
}

type FindMissionId struct {
	MissionId string `json:"missionId"`
}

type ReplaceMissionId struct {
	MissionId               string `json:"missionId"`
	NewMissionSpecification MissionSpecification
}

type ReplaceSpecificationEntry struct {
	MissionId     string    `json:"missionId"`
	Specification int       `json:"spec"`
	EntryIdx      int       `json:"entryIdx"`
	Entry         SpecEntry `json:"specEntry"`
}

func ello() string {
	return "hello"
}

/**
API to just answer hello as JSON
*/
func hello(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("content-type", "application/json")
	fmt.Fprintf(w, `{ "data" : "hello" }`)
}

/**
return the headers to the caller
*/
func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

/**
save the body of the POST to mongo

The body should be properly formated JSON
Open the db, decode the body, save it and close the db
*/
func saveMissionToMongo(w http.ResponseWriter, req *http.Request) {

	// var text TextType

	var mission MissionSpecification
	fmt.Printf("connecting 3 on %v\n", mongoConnectionString)
	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// get a collection connection to the DB
	collection := client.Database("test").Collection("muse")

	// decding the POST body
	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &mission)
	fmt.Printf("save--> %s", mission.MissionID)
	// fmt.Printf("save--> %s", mission.SpecificationsT[1].SpecEntries[1].Title)

	// put the body in the DB
	insertResult, err := collection.InsertOne(context.TODO(), mission)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(insertResult)
	// create the response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"Successfully saved body"}`))

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
}

/**
get all entries from the DB
*/
func retrieveMissions(w http.ResponseWriter, req *http.Request) {

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// build a collection connection to the db
	collection := client.Database("test").Collection("muse")

	filter := bson.D{{}}
	findOptions := options.Find()
	// Here's an array in which you can store the decoded documents
	var results []*MissionSpecification

	// find all
	cur, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}

	w.Header().Set("content-type", "application/json")

	for cur.Next(context.TODO()) {
		var misSpec MissionSpecification
		err = cur.Decode(&misSpec)
		// fmt.Println("retrieve-->", misSpec)
		// fmt.Println("retrieve-->mission--->", misSpec)
		results = append(results, &misSpec)
	}

	json.NewEncoder(w).Encode(results)

	w.WriteHeader(http.StatusOK)

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

}

/**
* findMissionById - get a mission using the input id
*/
func findMissionById(w http.ResponseWriter, req *http.Request) {

	var misID FindMissionId
	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &misID)
	fmt.Printf("find by id--> %s", misID.MissionId)

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// build a collection connection to the db
	collection := client.Database("test").Collection("muse")

	filter := bson.M{"missionid": misID.MissionId}
	fmt.Println("--->", filter)
	// filter := bson.D{{ "missionid" : "JCAG" }}
	// filter := bson.M{ "missionId" : "JCAG" }
	findOptions := options.Find()

	cursor, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}
	var misSpec MissionSpecification
	for cursor.Next(context.TODO()) {

		if err = cursor.Decode(&misSpec); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("mission id--> %s", misSpec.MissionID)
	}
	// w.Header().Set("content-type", "application/json")

	// var misSpec Mission
	// err = cur.Decode(&misSpec)
	// err = json.Unmarshal(misSpec)

	// fmt.Println("find-1->mission--->", misSpec)

	json.NewEncoder(w).Encode(misSpec)

	w.WriteHeader(http.StatusOK)

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
}

/**
* wrapper to handle the CORS problems
*/
func addCORS(endpoint func(http.ResponseWriter, *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%v", r)
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Vary", "Access-Control-Request-Method")
			w.Header().Set("Vary", "Access-Control-Request-Headers")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token, X-Ping")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST,OPTIONS")
			w.WriteHeader(http.StatusOK)
		} else {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			endpoint(w, r)
		}
	})
}

/**
* replace a Mission Spec in place
*/
func replaceMissionSpec(w http.ResponseWriter, req *http.Request) {

	var misID ReplaceMissionId
	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &misID)
	fmt.Printf("replace by id-1-> %s\n", misID.MissionId)
	fmt.Printf("replace by id-2-> %s\n", misID.NewMissionSpecification)

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// build a collection connection to the db
	collection := client.Database("test").Collection("muse")

	filter := bson.M{"missionid": misID.MissionId}
	fmt.Println("-replace-->", filter)

	_, err = collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}

	// put the body in the DB
	insertResult, err2 := collection.InsertOne(context.TODO(), misID.NewMissionSpecification)
	if err2 != nil {
		log.Fatal(err2)
	}
	fmt.Println(insertResult)

	json.NewEncoder(w).Encode(misID.NewMissionSpecification)

	w.WriteHeader(http.StatusOK)

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
}


/**
* update a mission spec with input
*/
func updateMissionSpec(w http.ResponseWriter, req *http.Request) {

	var newVal ReplaceSpecificationEntry
	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &newVal)

	fmt.Printf("-update--> %v", newVal.MissionId)

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// get a collection connection to the DB
	collection := client.Database("test").Collection("muse")

	specString := fmt.Sprint("specificationst.", newVal.Specification, ".specentries.", newVal.EntryIdx)

	w.Write([]byte(specString))

	filter := bson.M{"missionid": newVal.MissionId}
	update := bson.M{
		"$set": bson.M{
			specString: newVal.Entry,
		},
	}

	// You know that this accepts any interface?! Do we even need reflections then?
	updateRes, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"Successfully updated specification"}`))

	fmt.Printf("Completed update on %v. Number of docs modified %v", newVal.MissionId, updateRes.ModifiedCount)
}

/**
* add a mission engineer
*/
func addMissionEngineer(w http.ResponseWriter, req *http.Request) {

	// var text TextType
	var me MissionEngineer
	fmt.Printf("connecting 3 on %v\n", mongoConnectionString)
	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// get a collection connection to the DB
	collection := client.Database("test").Collection("engineers")

	// decoding the POST body
	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &me)
	fmt.Printf("save--> %s", me)

	// put the body in the DB
	insertResult, err := collection.InsertOne(context.TODO(), me)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(insertResult)
	fmt.Println(me)


	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(me)

	// create the response
	//w.WriteHeader(http.StatusOK)
	//w.Write([]byte(`{"message":"Successfully saved mission engineer"}`))
	
	
	//json.NewEncoder(w).Encode()

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
}

/** 
* get a single MissionEngineer
*/
func getMissionEngineers(w http.ResponseWriter, req *http.Request) {

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	// build a collection connection to the db
	collection := client.Database("test").Collection("engineers")

	filter := bson.D{{}}
	findOptions := options.Find()
	// Here's an array in which you can store the decoded documents
	var results []*MissionEngineer

	// find all
	cur, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}

	w.Header().Set("content-type", "application/json")

	for cur.Next(context.TODO()) {
		var meSpec MissionEngineer
		err = cur.Decode(&meSpec)
		fmt.Println("retrieve-ME->", meSpec.Name)
		
		results = append(results, &meSpec)
	}

	json.NewEncoder(w).Encode(results)

	w.WriteHeader(http.StatusOK)

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

}

/**
* modify a ME, find them, delete and put the input one back
*/
func modMissionEngineer(w http.ResponseWriter, req *http.Request) {

	var meStr MissionEngineer

	body, err := ioutil.ReadAll(req.Body)
	json.Unmarshal(body, &meStr)
	fmt.Printf("replace by id-1-> %s\n", meStr.Name)

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoConnectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	// build a collection connection to the db
	collection := client.Database("test").Collection("engineers")

	filter := bson.M{"name": meStr.Name}
	fmt.Println("ME-replace-->", filter)

	_, err = collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}

	// put the body in the DB
	insertResult, err2 := collection.InsertOne(context.TODO(), meStr)
	if err2 != nil {
		log.Fatal(err2)
	}
	fmt.Println(insertResult)

	json.NewEncoder(w).Encode(meStr)

	w.WriteHeader(http.StatusOK)

	// ... and close the db connection
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
}

/**
* main driver
*/
func main() {
	// gather connection string from env
	mongoConnectionString = os.Getenv("CONN_STRING")
	fmt.Printf("init: --> con string = %s\n", mongoConnectionString)

	// serve static content (e.g. the index.html react js app)
	http.HandleFunc("/", addCORS(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "This is a website server by a Go HTTP server.")
	}))

	fs := http.FileServer(http.Dir("public/"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	//
	// the defined api
	http.HandleFunc("/hello", addCORS(hello))
	http.HandleFunc("/headers", addCORS(headers))
	http.HandleFunc("/save", addCORS(saveMissionToMongo))
	http.HandleFunc("/retrieveMissions", addCORS(retrieveMissions))
	http.HandleFunc("/findMissionById", addCORS(findMissionById))
	http.HandleFunc("/replaceMissionSpec", addCORS(replaceMissionSpec))
	http.HandleFunc("/updateMissionSpec", addCORS(updateMissionSpec))

	http.HandleFunc("/addMissionEngineer", addCORS(addMissionEngineer))
	http.HandleFunc("/getMissionEngineers", addCORS(getMissionEngineers))
	http.HandleFunc("/modMissionEngineer", addCORS(modMissionEngineer))

	fmt.Printf("connecting 2 on %v\n", mongoConnectionString)
	fmt.Println("running on  port 8090")
	http.ListenAndServe(":8090", nil)
}
