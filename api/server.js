// implement your server here

//first we import our express using require method
//second set the invokes express to a server variable
// third we can add a build in middlewear using the use keyword
const express = require('express')

const server = express();

server.use(express.json())

//now we need to export our server variable with module export so we can listen for it in our index.js file

module.exports = server;

// require your posts router and connect it here


