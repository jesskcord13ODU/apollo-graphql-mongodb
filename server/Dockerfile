

FROM golang:1.14
WORKDIR /app
 
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o httpServer .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /app/
COPY --from=0 /app/httpServer .
COPY .env .env

CMD ["./httpServer"]