class MessageObject {
   data = {
      id: "",
      temporary: false,
      content: "",
      channelId: "",
      author: {
         id: "",
         username: "",
         avatar: "",
         discriminator: "",
         public_flags: 0,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      timestamp: "",
      edited_timestamp: null,
   };
   constructor(object) {
      // console.log(object);
      this.data.channelId = object.channelId;
      this.data.author.username = object.author.name;
      this.data.author.id = object.author.userId;

      this.data.id = object.id;
      this.data.progress = object.progress;
      this.data.temporary = false;
      const date = +new Date();
      this.data.timestamp = date;
      if (object.content) {
         this.data.content = object.content;
      }
      if (object.attachment) {
         this.data.attachments.push(object.attachment);
      }
      return this.data;
   }
}
function makeid(length) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
// export default MessageObject;
module.exports = {
   makeId: makeid,
   MessageObject: MessageObject,
};
