import express from "express";
import mongodb from "mongodb";

import * as http from "http";
import SocketIO from "socket.io";

import DBActions from "./dbActions.js";
import attachRESTapi from "./api.js";
import attachSockets from "./sockets.js";

const MongoClient = mongodb.MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";
const dbName = "discwrot";
const dbActions = new DBActions(null);

MongoClient.connect(url, function (err, client) {
   console.log("Connected successfully to server");
   dbActions.init(client.db(dbName));
});

const webURL = "http://192.168.100.98:3000";

/*
curl -X GET http://localhost:2999/users
curl -H "Content-Type: application/json" -X POST -d '{"test":"yes"}' http://localhost:2999/users
curl -H "Content-Type: application/json" -X POST -d '{"mac":"some-mac-mac"}' http://localhost:2999/users
*/

const app = express();
const restPort = 2999;
attachRESTapi(app, dbActions, webURL);
app.listen(restPort, () =>
   console.log(`Server listening on port ${restPort}!`)
);

const server = http.createServer(app);
const socketsPort = 2998;
const io = SocketIO(server, {
   cors: {
      methods: ["GET", "PATCH", "POST", "PUT"],
      origin: webURL,
   },
});
io.listen(socketsPort);

attachSockets(io, dbActions, webURL);

export default app;
