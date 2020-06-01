const express = require("express");
const path = require("path");
//initialize our express app
const app = express();

// Getting our POSTS routes
const posts = require("./server/routes/routes");

// Using middleware
app.use(express.static(path.join(__dirname, "dist")));
app.use("/routes", posts);

// Catch all other routes request and return it to the index
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "dist/index.html"));
});

const port = process.env.PORT || 4600;
// Connect to server
app.listen(port, (req, res) => {
  console.log("Running on PORT : " + port);
});
