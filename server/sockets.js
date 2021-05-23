import config from "../config.json";
import Blob from "cross-blob";
import fs from "fs";
import importMessageObject from "../pages/messageObject.js";
const { makeId } = importMessageObject;

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
         let currentChannelId = null;
         // console.log(user);
         connectedPeers[user.userId] = client.id;

         const sendMessage = async (message) => {
            message.author = user;
            message.channelId = currentChannelId;
            console.log(message);
            const resultMessage = await dbActions.messageChannel(message);
            const channel = await dbActions.getChannel(currentChannelId);
            channel.users.forEach((userId) => {
               io.to(connectedPeers[userId]).emit("recieve", resultMessage);
            });
         };

         if (user) {
            client.on("selectChannel", async (channelId) => {
               currentChannelId = channelId;
            });
            client.on("message", async (message) => {
               sendMessage(message);
            });
            client.on("typingMessage", async (typer, cb) => {
               const newTyper = { name: user.name, userId: user.userId };
               // console.log("recieved");
               const channel = await dbActions.getChannel(currentChannelId);

               broadCastToChannel(channel, user, (user) => {
                  io.to(user).emit("recieveTyper", newTyper);
               });
               cb();
            });

            //это первая версия аплоада
            let userFileBlobParts = [];
            client.on("fileSlice", async (data, next) => {
               const { fileName, currentSlice, slice } = { ...data };
               if (currentSlice == 0) {
                  userFileBlobParts = [];
               }
               if (currentSlice == "done") {
                  //express res.dwonload fix
                  const lowerFileName = fileName.toLowerCase();
                  const finishedBlob = new Blob(userFileBlobParts, {
                     type: "application/octet-stream",
                  });
                  const buffer = await finishedBlob.arrayBuffer();
                  console.log(buffer);
                  fs.writeFileSync(
                     "./files/" + lowerFileName,
                     Buffer.from(buffer)
                  );
                  sendMessage({
                     id: makeId(12),
                     attachment:
                        config.ip + ":2999/download?name=" + lowerFileName,
                  });

                  next();
               } else {
                  userFileBlobParts.push(slice);
                  next();
               }
               console.log("recieved slice " + currentSlice, slice);
            });
            //его можно улучшить, потом скажу как.
            client.on("fileSlicePartial", async (data, next) => {
               const { fileName, currentSlice, slice } = { ...data };
               const lowerFileName = fileName.toLowerCase();
               console.log(lowerFileName);
               if (currentSlice == 0) {
               }
               if (currentSlice == "done") {
                  sendMessage({
                     id: makeId(12),
                     attachment:
                        config.ip + ":2999/download?name=" + lowerFileName,
                  });

                  next();
               } else {
                  const sliceBlob = new Blob([slice], {
                     type: "application/octet-stream",
                  });
                  const buffer = await sliceBlob.arrayBuffer();
                  fs.appendFileSync(
                     "./files/" + lowerFileName,
                     new Uint8Array(buffer)
                  );

                  next();
               }
               console.log("recieved slice " + currentSlice, slice);
            });
         }
         cb(user);
      });

      client.on("disconnect", () => {
         delete connectedPeers[client.id];
         console.log(client.id + " -disconnected");
      });
   });
};
export default sockets;
