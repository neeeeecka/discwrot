import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import SocketIO from "socket.io";
import DBActions from "./dbActions.mjs";

const MongoClient = mongodb.MongoClient;

import cookieParser from "cookie-parser";

// Connection URL
const url = "mongodb://localhost:27017";
const dbName = "discwrot";
const dbActions = new DBActions(null);

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  dbActions.init(client.db(dbName));
});

const app = express();
const port = 2999;

/*
curl -X GET http://localhost:2999/users
curl -H "Content-Type: application/json" -X POST -d '{"test":"yes"}' http://localhost:2999/users
curl -H "Content-Type: application/json" -X POST -d '{"mac":"some-mac-mac"}' http://localhost:2999/users
*/

app.use(
  bodyParser.json({
    // extended: true
  })
);
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

const userAuthenticator = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const user = await dbActions.getCurrentUser(sessionId);
  if (user) {
    res.status(200);
  } else {
    res.status(401);
  }
  next();
};

app.get("/", async (req, res) => {
  return res.send("Server is running");
});

app.get("/@me", async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const user = await dbActions.getCurrentUser(sessionId);
  if (user) {
    res.status(200);
  } else {
    res.status(401);
  }
  return res.send(user);
});

app.get("/channels/:channelId/messages", async (req, res) => {
  const channelId = req.params.channelId;

  let result = await dbActions.getMessages(channelId);
  if (result) {
    res.status(200);
  } else {
    res.status(500);
    result = { messages: [] };
  }

  res.send(result.messages);
});

app.get("/users", async (req, res) => {
  const users = await dbActions.getUsers();
  const str = JSON.stringify(users);
  return res.send(str);
});

app.post("/users", async (req, res) => {
  const userData = await dbActions.AddUser(req.body);
  return res.send(userData);
});

//put = add new user, patch = modify user
app.put("/users/:unitId", async (req, res) => {
  let _id = req.params.unitId;
  if (mongodb.ObjectID.isValid(_id)) {
    const unitId = mongodb.ObjectID(_id);
    const result = await dbActions.editUnit(unitId, req.body);
    return res.send(result);
  } else {
    return res.send({ error: "Invalid ID" });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  return res.send("Received a DELETE HTTP method");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

const io = SocketIO();

io.on("connection", client => {
  client.on("message", async (message, cb) => {
    //if DB.find(targetChannel).users.includes(client)
    const result = await dbActions.messageChannel(message);

    cb(result);
  });
  client.on("disconnect", () => {
    /* … */
  });
});

io.listen(2998);

export default app;
