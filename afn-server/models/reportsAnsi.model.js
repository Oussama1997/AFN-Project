const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReportAnsiSchema = new Schema({
    username: { type: String, required: true, max: 100 },
    permission: { type: String, required: true },
    name: { type: String, required: true },
    site: { type: String, required: true },
    typeNews: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    date:{ type: Date, required: true },
    },
    { versionKey: false } // You should be aware of the outcome after set to false
);

//export the model
module.exports = mongoose.model("ReportAnsi", ReportAnsiSchema);
