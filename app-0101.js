//we are about to put the entire express module in one variable
const express = require('express');

//the express variable is actually a function value
const app = express();  //envoked function with () to create application

//next we need to start listening to requests
//we will do this by binding our web server to a port
//      | ports are communication endpoints
//      | ports are numeric in value [0 to 65536]
//      | can use any port between that value; use certain values
//      | using PORT 3000

//intelli-senses looking for optional callback function; arrow f(x)
app.listen(3000, ()=> {
    console.log("Server is running on PORT 3000");
});

//run app.js in the node CLI: node app.js
//server successfully runs with this code: console logs
//type localhost:3000 in the URL