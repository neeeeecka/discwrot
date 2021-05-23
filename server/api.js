import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const REST = (app, dbActions, webURL) => {
   app.use(
      bodyParser.json({
         // extended: true
      })
   );
   app.use(cookieParser());

   const corsAllower = function (req, res, next) {
      let reqURL = req.header("Origin");
      if (reqURL) {
         // reqURL = reqURL == undefined ? "http://localhost:3000/" : reqURL;

         res.setHeader("Access-Control-Allow-Origin", webURL);
         res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
         ); // If needed
         res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type"
         ); // If needed
         res.setHeader("Access-Control-Allow-Credentials", true); // If needed
         // Pass to next layer of middleware
      }
      next();
   };

   app.use(corsAllower);

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
};
export default REST;
