const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { versionKey: false } // You should be aware of the outcome after set to false
);

//export the model
module.exports = mongoose.model("Users", UserSchema);
