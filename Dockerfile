# Étape 1 : build du frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

# Étape 2 : build du binaire go
FROM golang:1.24.4 AS backend-builder

WORKDIR /go/src/app
COPY ./backend/ .

RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go

# Étape 3 : Image minimale (on utilise souvent alpine, parce que c'est léger et bien maintenu)
FROM alpine:latest AS server

WORKDIR /app
COPY --from=backend-builder /go/src/app/main .
COPY --from=frontend-builder /app/dist ./static
EXPOSE 8080:8080

CMD ["./main"]