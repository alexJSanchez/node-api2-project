// implement your server here
const express = require("express"); // import the express package
// require your posts router and connect it here
const server = express(); // creates the server
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
server.get("/", (req, res) => {
  res.send("Hello from Express");
});
