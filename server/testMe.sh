

docker run --rm --name mongoj -p 27017:27017 -d -e "MONGO_INITDB_ROOT_USERNAME=magoo" -e "MONGO_INITDB_ROOT_PASSWORD=t1y2p3e4" mongo mongod
go test
docker stop mongoj
