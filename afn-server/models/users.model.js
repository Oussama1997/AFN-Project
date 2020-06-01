const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, max: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    cin: { type: String },
    dateB: { type: Date },
    profession: { type: String },
    adresse: { type: String },
    ville: { type: String },
    tel: { type: String },
    gender: { type: String },
  },
  { versionKey: false } // You should be aware of the outcome after set to false
);

//export the model
module.exports = mongoose.model("Users", UserSchema);
