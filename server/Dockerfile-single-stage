
FROM golang:1.14

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN go build -a -installsuffix cgo -o httpServer 
EXPOSE 8090
EXPOSE 27017
CMD [ "./httpServer" ]

