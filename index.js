// require your server and launch it here

//we import our server we build with express using the require method
const server = require('./api/server');


server.listen(3000, () => {
    console.log('welcome to our page')
})