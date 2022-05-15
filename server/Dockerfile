FROM golang:1.18-alpine

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
COPY */*.go ./

RUN go mod download

EXPOSE 8080

RUN go build -o ./server
RUN chmod +x ./server

ENTRYPOINT [ "./server" ]