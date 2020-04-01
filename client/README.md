# MUSE Prototype

## Sprint 1
- [ ] Specification Window
- [ ] Data Serialization
- [ ] Shell
- [ ] Navbar
- [ ] Routing

# Instructions

To run this code you need to either:

* manually load a mongodb that is listening at localhost
* or use the docker-compose cmd

In either case you must set the .env files (client and server) to point correctly.  The server .env file has a template that can be changed to point the server toward mongodb.  The client has a env_templte that can be changed to point to the server

server .env file might be: CONN_STRING="mongodb://magoo:t1y2p3e4@localhost:27017/test?authSource=admin"

client .env file might be: REACT_APP_HOST="localhost:8090"

## manual

In 1 terminal

cd server && docker run --rm --name mongoj -p 27017:27017 -e "MONGO_INITDB_ROOT_USERNAME=magoo" -e "MONGO_INITDB_ROOT_PASSWORD=t1y2p3e4" mongo mongod

In terminal 2

cd $HOME/muse-prototype/server && go run httpServer.go

In terminal 3

cd $HOME/muse-prototype/client && npm i &&  npm start