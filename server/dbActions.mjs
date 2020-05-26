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
