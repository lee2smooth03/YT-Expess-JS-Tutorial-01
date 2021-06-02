const { Router } = require("express");
const router = Router();

//@04:00
//import the newly formed database connection
const db = require("../../app-0916/database");

router.use((req, res, next) => {
    //res.json({ requested: `${req.method}`});
    console.log(`you just made a ${req.method} request!`);   
    next();
})

router.get("/", async (req, res) => {
    //@07:45
    //get all users in db whenever we hit the /endpoint
    //the results that are returned are put into a variable
    const results = await db.promise().query("SELECT * FROM USERS");

    //the call needs to be waited on:
    //added "await" to the promise
    //added "async" before the callback so that

    //@08:45
    //the promise returns an array to be logged
    //console.log(results);
        //this array contains a BUNCH OF STUFF
        //answers that we care about are at [0]
        //1st element: data
        //2nd element: column definition
    
    //@09:05
    //console.log(results[0]);
        //this array is pared down to u/n and p/w
        //if I wanted to grab any one (results[0][#])

    //@09:20
    //instead of console logging results, send() them
    res.status(200).send(results[0]);

    //res.send(200);
});

router.get("/posts", (req, res) => {
    res.json({ route: "Posts"});
});

//@04:10
//set up a post method for every HTTP request at this endpoint
router.post("/", (req, res) => {
    //request body will contain username and password
    const {username, password} = req.body;

    //console.log("we made it this far, " + username);
    //pseudo-validation to see if the values are truthy
    if (username && password) {
        //console.log(`username: ${username}\npassword: ${password}`);

        //@05:30
        try {
            console.log("tried it");

            //instead of console logging, use a database promise method
            //write our SQL transation in query() to create a record in the db
            db.promise().query(`INSERT INTO USERS VALUES ('${username}', '${password}')`);
            res.status(200).send({msg: "Created new user"});
        } catch (err) {
            console.log("caught it");
            console.log(err);
        }

        //@07:30
        //checked results in db
    }

    //@04:40
    //make a request to this route
    //calling the endpoint THEN interacting w/ the db
});

module.exports = router;