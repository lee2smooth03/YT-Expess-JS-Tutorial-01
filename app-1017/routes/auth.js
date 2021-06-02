//file deals with any route that has to do with authentication
const { Router } = require("express");
const router = Router();

//@02:10
//import passport to be able to use middleware function(s)
const passport = require("passport");


//set up a post request for this router to handle

//@02:10
//pass in the passport.authenticate()
//set the authentication strategy to local
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(200);
});
module.exports = router;
