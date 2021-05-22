import MessageObject from "../pages/messageObject.js";

class DBActions {
   constructor(db) {
      this.db = db;
   }

   init = (db) => {
      this.db = db;
      this.userCollection = this.db.collection("users");
      this.channelCollection = this.db.collection("channels");
   };

   getCurrentUser = async (sessionId) => {
      let res = await this.userCollection
         .find({ sessionId: sessionId })
         .toArray();

      return res[0];
   };

   getMessages = async (channelId) => {
      let res = await this.channelCollection
         .find({ channelId: channelId })
         .toArray();

      return res[0];
   };
   getChannel = async (channelId) => {
      let query = await this.channelCollection.findOne({
         channelId: channelId,
      });

      return query;
   };
   messageChannel = async (message) => {
      // targetChannel: { name: 'BlackJader', targetId: '#9999', id: '490169512679833621' }
      // let channel = await this.channelCollection.find({ channelId: message.targetChannel.id});
      const newMessage = new MessageObject(message);
      let query = await this.channelCollection.updateOne(
         { channelId: message.targetChannel.id },
         {
            $push: {
               messages: { $each: [newMessage], $position: 0 },
            },
         }
      );
      if (query.result.ok) {
         return newMessage;
      } else {
         return query;
      }
   };

   getUsers = async () => {
      let res = await this.userCollection.find({}).toArray();
      return res;
   };
   addUser = async (userData) => {
      let res = await this.userCollection.insert({
         mac: unitData.mac,
         description: "",
         type: "active",
      });
      return "User added.";
   };
   editUser = async (_id, changes) => {
      const newValues = { $set: changes };
      let result = await this.userCollection.findOneAndUpdate(
         { _id: _id },
         newValues,
         { returnOriginal: false }
      );
      return result.value;
   };
}
export default DBActions;
