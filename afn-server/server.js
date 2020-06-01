const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

/** Database connexion**/
var config = require("./config");
//connecting to the database
mongoose
  .connect(
    config.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    null
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log(`could not connect to MongoDB :${err}`);
    process.exit();
  });
mongoose.set("useFindAndModify", false);
// Configuring the database
mongoose.Promise = global.Promise;
/** end database connexion**/
/* */
//var db = mongoose.connection.db;
/*let multer = require("multer");
let GridFsStorage = require("multer-gridfs-storage");
let Grid = require("gridfs-stream");
var mongoDriver = mongoose.mongo;
var gfs = new Gridfs("AfnDB", mongoDriver);*/
//initialize our express app
const app = express();
//Activie CORS
app.use(cors());
// Getting our POSTS routes
const posts = require("./routes/routes");

// Using middleware
app.use(bodyParser.json());

// set public ressoures folder
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", posts);

// Catch all other routes request and return it to the index
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "public/index.html"));
});

const port = process.env.PORT || 4600;
// Connect to server
app.listen(port, (req, res) => {
  console.log("Running on PORT : " + port);
});
