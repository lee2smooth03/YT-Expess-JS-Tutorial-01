//file created to handle all user requests
//import the Router class from express.js

const { Router } = require("express");  //object destructuring

//create a new instance of Router
//  + notice we did not use "new" keyword to create this
//  + this instance could be a function that gets invoked
//      * returns the router object
//      * press "router." to see that is has all functions
const router = Router();

//@06:35
//demonstration of router-level middleware for users.js
router.use((req, res, next) => {
    //res.json({ requested: `${req.method}`});
    console.log(`you just made a ${req.method} request!`);
    //IRL a developer might use this middleware to see if 
    //a session exists before visiting this route
    
    next();
})

router.get("/", (req, res) => { //(req, res) is handler function
    res.send(200);

    //@03:30 in P/m GET: localhost:3000/ 
    //  + basic route no longer sends the response (DNE)
    //  + the basic route now requires the use of "users/"
    //  + "localhost:3000/users/" replaces "localhost:3000/"

});

//@03:00 -
//adding a second route to grab all of the users' posts
router.get("/posts", (req, res) => {
    res.json({ route: "Posts"});
});

    //  + "localhost:3000/users/posts" replaces "localhost:3000/posts"

//every route in this file will be prefixed with "/users..."
//need to export module so that it can be imported where registered
//this is a key feature in using routes
module.exports = router;

//@04:20 - content copied over into posts.js