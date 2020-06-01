const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReportInluccSchema = new Schema(
  {
    username: { type: String, required: true, max: 100 },
    permission: { type: String, required: true },
    person: { type: String, required: true },
    structure: { type: String, required: true },
    sector: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: false },
    date: { type: Date, required: true },
  },
  { versionKey: false } // You should be aware of the outcome after set to false
);

//export the model
module.exports = mongoose.model("ReportInlucc", ReportInluccSchema);
