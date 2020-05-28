class Message {
  data = {
    id: "",
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
    this.data.channel_id = object.targetChannel.id;
    this.data.author.username = "TestNigger";
    this.data.author.id = "94184823";
    const date = new Date();
    this.data.timestamp = date.toISOString();
    if (object.content) {
      this.data.content = object.content;
    }
    return this.data;
  }
}

class DBActions {
  constructor(db) {
    this.db = db;
  }

  init = db => {
    this.db = db;
    this.userCollection = this.db.collection("users");
    this.channelCollection = this.db.collection("channels");
  };

  getCurrentUser = async sessionId => {
    let res = await this.userCollection
      .find({ sessionId: sessionId })
      .toArray();

    return res[0];
  };

  getMessages = async channelId => {
    let res = await this.channelCollection
      .find({ channelId: channelId })
      .toArray();

    return res[0];
  };
  messageChannel = async message => {
    // targetChannel: { name: 'BlackJader', targetId: '#9999', id: '490169512679833621' }
    // let channel = await this.channelCollection.find({ channelId: message.targetChannel.id});
    const newMessage = new Message(message);
    let query = await this.channelCollection.updateOne(
      { channelId: message.targetChannel.id },
      {
        $push: {
          messages: { $each: [newMessage], $position: 0 }
        }
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
  addUser = async userData => {
    let res = await this.userCollection.insert({
      mac: unitData.mac,
      description: "",
      type: "active"
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
