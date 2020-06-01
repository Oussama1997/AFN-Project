const express = require("express");
const router = express.Router();

//require the controllers which we did not create yet!
/* Partner  Router */
const Partner_controller = require("../controllers/partners.controller");
router.get("/partners", Partner_controller.findAll);
router.post("/partners/add", Partner_controller.add);
router.get("/partners/:_id", Partner_controller.details);
router.put("/partners/:_id", Partner_controller.update);
router.delete("/partners/:id", Partner_controller.delete);

/* ReportInlucc  Router */
const ReportsInlucc_controller = require("../controllers/reportsInlucc.controller");
router.get("/reportsInlucc", ReportsInlucc_controller.findAll);
router.post("/reportsInlucc/add", ReportsInlucc_controller.add);
router.get("/reportsInlucc/:_id", ReportsInlucc_controller.details);
router.put("/reportsInlucc/:_id", ReportsInlucc_controller.update);
router.put("/reportsInlucc1/:_id", ReportsInlucc_controller.update1);
router.delete("/reportsInlucc/:id", ReportsInlucc_controller.delete);

/* ReportAnsi  Router   */
const ReportsAnsi_controller = require("../controllers/reportsAnsi.controller");
router.get("/reportsAnsi", ReportsAnsi_controller.findAll);
router.post("/reportsAnsi/add", ReportsAnsi_controller.add);
router.get("/reportsAnsi/:_id", ReportsAnsi_controller.details);
router.put("/reportsAnsi/:_id", ReportsAnsi_controller.update);
router.put("/reportsAnsi1/:_id", ReportsAnsi_controller.update1);
router.delete("/reportsAnsi/:id", ReportsAnsi_controller.delete);

/* User  Router */
const User_controller = require("../controllers/users.controller");
router.get("/users", User_controller.findAll);
// Register
router.post("/users/add", User_controller.add);
router.get("/users/:_id", User_controller.details);
// Update Compte
router.put("/users/:_id", User_controller.update);
// Update Profil
router.put("/users1/:_id", User_controller.update1);
// Delete User
router.delete("/users/:id", User_controller.delete);
// Register
router.post("/register", User_controller.add);
// Login
router.post("/login", User_controller.findOne);

// Setting up the storage element
/*let storage = GridFsStorage({
  gfs : gfs,

  filename: (req, file, cb) => {
      let date = Date.now();
      // The way you want to store your file in database
      cb(null, file.fieldname + '-' + date + '.'); 
  },
  
  // Additional Meta-data that you want to store
  metadata: function(req, file, cb) {
      cb(null, { originalname: file.originalname });
  },
  root: 'ctFiles' // Root collection name
});

// Multer configuration for single file uploads
let upload = multer({
  storage: storage
}).single('file');

// Route for file upload
app.post('/upload', (req, res) => {
  upload(req,res, (err) => {
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      res.json({error_code:0, error_desc: null, file_uploaded: true});
  });
});

// Downloading a single file
app.get('/file/:filename', (req, res) => {
  gfs.collection('ctFiles'); //set collection name to lookup into

  /** First check if file exists 
  gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
      if(!files || files.length === 0){
          return res.status(404).json({
              responseCode: 1,
              responseMessage: "error"
          });
      }
      // create read stream
      var readstream = gfs.createReadStream({
          filename: files[0].filename,
          root: "ctFiles"
      });
      // set the proper content type 
      res.set('Content-Type', files[0].contentType)
      // Return response
      return readstream.pipe(res);
  });
});

// Route for getting all the files
app.get('/files', (req, res) => {
  let filesData = [];
  let count = 0;
  gfs.collection('ctFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
      // Error checking
      if(!files || files.length === 0){
          return res.status(404).json({
              responseCode: 1,
              responseMessage: "error"
          });
      }
      // Loop through all the files and fetch the necessary information
      files.forEach((file) => {
          filesData[count++] = {
              originalname: file.metadata.originalname,
              filename: file.filename,
              contentType: file.contentType
          }
      });
      res.json(filesData);
  });
});
*/

module.exports = router;
/*
// Get POST
router.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send("<h2>Route WORK<h2>");
});
 
router.get("/posts/:code", (req, res) => {
  res.setHeader("content-type", "application/json");
  var infos = {
    name: "ouss",
    email: "ouss@mimouna",
    code: req.params.code,
  };
  res.send(JSON.stringify(infos));
});
 
module.exports = router;*/
