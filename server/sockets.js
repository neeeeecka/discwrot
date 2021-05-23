import Blob from "cross-blob";
import fs from "fs";

const sockets = (io, dbActions) => {
   //better save such stuff in DB but ok
   const connectedPeers = {};

   function broadCastToChannel(channel, except, cb) {
      channel.users.forEach((userId) => {
         if (userId != except.userId) {
            cb(connectedPeers[userId]);
         }
      });
   }

   io.on("connection", (client) => {
      client.on("authorize", async (sessionId, cb) => {
         console.log(client.id + " -connected");
         const user = await dbActions.getCurrentUser(sessionId);
         // console.log(user);
         connectedPeers[user.userId] = client.id;
         if (user) {
            client.on("message", async (message) => {
               message.author = user;
               const resultMessage = await dbActions.messageChannel(message);
               const channel = await dbActions.getChannel(
                  message.targetChannel.id
               );
               channel.users.forEach((userId) => {
                  io.to(connectedPeers[userId]).emit("recieve", resultMessage);
               });
            });
            client.on("typingMessage", async (typer, cb) => {
               const newTyper = { name: user.name, userId: user.userId };
               // console.log("recieved");
               const channel = await dbActions.getChannel(
                  typer.targetChannel.id
               );

               broadCastToChannel(channel, user, (user) => {
                  io.to(user).emit("recieveTyper", newTyper);
               });
               cb();
            });
         }
         cb(user);
      });

      client.on("disconnect", () => {
         delete connectedPeers[client.id];
         console.log(client.id + " -disconnected");
      });

      let userFileBlobParts = [];
      client.on("fileSlice", async (data, next) => {
         const { fileName, currentSlice, slice } = { ...data };
         if (currentSlice == 0) {
            userFileBlobParts = [];
         }
         if (currentSlice == "done") {
            const finishedBlob = new Blob(userFileBlobParts, {
               type: "application/octet-stream",
            });
            const buffer = await finishedBlob.arrayBuffer();
            console.log(buffer);
            fs.writeFileSync("./files/" + fileName, Buffer.from(buffer));
            next();
         } else {
            userFileBlobParts.push(slice);
            next();
         }
         console.log("recieved slice " + currentSlice, slice);
      });
   });
};
export default sockets;
