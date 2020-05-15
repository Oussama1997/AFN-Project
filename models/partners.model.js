const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PartnersSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: Number, required: true },
  fax: { type: Number, required: false },
});

//export the model
module.exports = mongoose.model("Partners", PartnersSchema);
