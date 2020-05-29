class MessageObject {
  data = {
    id: "",
    temporary: false,
    type: 0,
    content: "",
    channel_id: "",
    author: {
      id: "",
      username: "",
      avatar: "",
      discriminator: "",
      public_flags: 0
    },
    attachments: [],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
    timestamp: "",
    edited_timestamp: null,
    flags: 0
  };
  constructor(object) {
    console.log(object);
    this.data.channel_id = object.targetChannel.id;
    this.data.author.username = object.author.name;
    this.data.author.id = object.author.userId;
    this.data.id = object.id;
    this.data.temporary = false;
    const date = new Date();
    this.data.timestamp = date.toISOString();
    if (object.content) {
      this.data.content = object.content;
    }
    return this.data;
  }
}
// export default MessageObject;
module.exports = MessageObject;
