//import passport-local and passport
const localStrategy = require("passport-local");
const passport = require("passport");

//@03:30
//import database to be queried
const db = require("../database");

//@06:30
//add two funtions are responsible for serializing and deserializing users into a session
//when requests are made these functions check the cookie to see who it belongs to
    //
passport.serializeUser((user, done) => {
    done(null, user.username)
});

passport.deserializeUser(async (username, done) => {
    //search database for a username by that username
    try {
        const results = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME = "${username}"`);
        if (results[0][0]) {
            done(null, results[0][0]);
        }
    } catch (err) {
        done(err, null);
    }
});

//call the .use function and create new instance of localStrategy
passport.use(new localStrategy(
    //inside new instance, create a new asynchronous function
    async (username, password, done) => {
        //username and password are from request body
        //inside this function, handle all logic about user auth
        
        //@03:55
        //need to search the database
        //set results to search the db for a record where condition is met
        
        //@06:00
        //wrap this in a try
        try{
            const results = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME = "${username}"`);

            //console.log(results);
            //we now know that results is an array of arrays
    
            //@05:00
            //find the length of the returned values
            if (results[0].length === 0) {
                //user was not found because nothing in the array
                done(null, false)
                    //null is for no errors
                    //false is saying user was not found
            } else {
                //user is found, so now compare p/w
                if (results[0][0].password === password) {
                    //passwords are the same
    
                    done(null, results[0][0]);
                    //result[0][0] is the user record
                    //IDK if it's being returned or not
                } else {
                    //passwords are not the same
                    done(null, false);
                }
            }
        } catch (err) {
            //if an error does happen
            done(err, false);
        }
    }
));