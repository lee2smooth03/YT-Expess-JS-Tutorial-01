const { Router } = require("express");
const router = Router();

//@02:25
//to use express-validator, we have to import it
const { check, validationResult } = require("express-validator"); //destructuring

const db = require("../database");

router.use((req, res, next) => {
    console.log(`you just made a ${req.method} request!`);   
    next();
})

router.get("/", async (req, res) => {
    const results = await db.promise().query("SELECT * FROM USERS");
    res.status(200).send(results[0]);
});

router.get("/posts", (req, res) => {
    res.json({ route: "Posts"});
});

//@02:00
//validate all of the data coming to this endpoint
//data will now be validated before being sent to db

//@03:05
//passing middleware into this route (called check)
    //middleware can do checks to modify req objects
    //if all the checks go well, it calls the next function
//router.post("/", check("username").notEmpty(), (req, res) => {
    //@03:30 middleware and method makes sure "username" is present

//@04:20
//want to make sure username and password are both present
//the middleware can also be wrapped inside of an array too 

//@07:25
//adding|chaining the withMessage() onto check functions
//this is how we can add custom messages for the errors
//router.post("/", [
    //check("username").notEmpty().withMessage("Username cannot be empty!"),
    //check("password").notEmpty().withMessage("Password cannot be empty!")], (req, res) => {

//@08:05
//validation functions can be chained
router.post("/", [
    check("username")
        .notEmpty()
        .withMessage("Username cannot be empty!")
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters"),
    check("password")
        .notEmpty()
        .withMessage("Password cannot be empty!")], (req, res) => {
    //@04:35
    //declare a variable called errors
    const errors = validationResult(req);   //use of this is straight from documentation
        //vResult takes in request object
        //middleware functions will catch errors at req
        //we need to check to see that errors is not empty
  
    //console.log(errors);    //to see what they look like
    //@05:15
    //go to P/m and set username and password to ""
    //do not turn them on/off until you pass empty strings

    //@05:25
    //empty values sent to username and password in P/m
    //msg:"invalid value" for two object located in body

    //@06:00
    //I passed some real values back into the parameters
    //errors array came back empty and P/m says new user

    //@06:20
    //console.log() is commented out

    if(!errors.isEmpty()) {
        //if it is not empty then there are errors
        //if there are errors, then send back array
        //@06:20

        //return res.status(400).json({errors: errors.array() });
        //why did we have to say "return" here?
        //could we have just sent back res.status() XYZ?
        res.status(400).json({errors: errors.array() });    //documentation

        //nothing happened; it didn't break
        //IRL, we do not want to send back error arrays to user
        //most likely scenario is to have a message explaining error
    }

    const {username, password} = req.body;
    if (username && password) {
        try {
            console.log("tried it");
            db.promise().query(`INSERT INTO USERS VALUES ('${username}', '${password}')`);
            res.status(200).send({msg: "Created new user"});
        } catch (err) {
            console.log("caught it");
            console.log(err);
        }
    }
});

module.exports = router;