const sockets = (io, dbActions, webURL) => {
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
            client.on("message", async (message, cb) => {
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
