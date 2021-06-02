//@00:50 - 
//remove cookie-parser and replace it w/ express-session:
const session = require('express-session');
//      + express-session is session middleware
//      + express-session will handle generating session IDs
//      + express-session will assign session ID w/ a cookie
//express-session parses cookies so having both is redundant
//const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();

//@01:25 -
//register the session middleware
app.use(session({
    //object takes in a couple of properties

    secret:"some secret",   //used to sign the session ID cookie
    cookie: { 
        maxAge: 30000,      //set cookie to expire after 30s
    },
    saveUninitialized: false//do this, esp. w/ login system or
                            //else it generates new session ID
                            //every single time requests made
}));

//app.use(cookieParser());          | express-session does it
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

const users = [{
    name: 'Arthur',
    age: 35
},{
    name: 'Anson',
    age: 22
},{
    name: 'Alexus',
    age: 00
}];

const posts = [{
    title: "my favorite foods",
    content: "peas, greens, potatoes, tomatoes...you name it"
},{
    title: "my favorite games",
    content: "iHop scotch then get down on my tic- tac- toes"
},{
    title: "check my footwork",
    content: "you ain't got these...you ain't got these!"
}]

app.get('/', (req, res) => {
    res.send({
        msg: 'Hi there!',
        user: { }
    });
});

app.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send("Created a user");
});

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:name', (req, res) => {
    const { name } = req.params
    const user = users.find((any_user) => any_user.name === name);

    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send(`User named "${name}" was not found in our database.\nCheck spelling or casing.`);
    }
});

app.get('/posts', (req, res) => {
    const { title } = req.query;
    if (title) {
        const any_post = posts.find((posted_title) => posted_title.title === title);
        if (any_post) {
            res.status(200).send(any_post);
        } else {
            res.status(404).send("Sorry, this post was not found.");
        }
    }
    res.status(200).send(posts);
});

function validateAuthToken(req, res, next) {
    console.log("We are now inside of the auth validation.");
    const { authorization } = req.headers;

    if (authorization && (authorization === '123')) {
        next();
    } else {
        res.status(403).send({ msg: "Post failed. Improper credentials"});
    }
}

app.post('/posts', validateAuthToken, (req, res) => {
    const post = req.body;
    posts.push(post);
    res.status(201).send(posts);
});

function validateCookie(req, res, next) {
    const { cookies } = req;
    if ("session_id" in cookies) {
        console.log("Session ID exists")
        if (cookies.session_id === "123456") {            
            next();
        } else {
            res.status(403).send({msg: "You are not authorized"});
        };
    } else {
        res.status(403).send({msg: "You are not authorized"});
    };
};

app.get('/signin', (req, res) => {

    res.cookie('session_id', '123456');
    res.status(200).json({ msg: 'logged in'});
});

//pretent to visit a protected route
app.get('/protected', validateCookie, (req, res) => {
    res.status(200).json({ msg: "You are authorized"});
});

//@02:15 - 
//make a simple login (POST) route
app.post('/login', (req, res) => {
    console.log("Hello");
    //res.status(200).send({ msg: "Glad this works" });
    //res.status(200).send({ msg: "I'm really glad this works"});
    //res.send(200);  //this is what he actually typed; works

    //@02:25 -
    //checking route on P/m: works fine
    //  + receive no cookie because we have not yet modified session
    //  + "modifying the session" means:
    //      * we have only visited the site
    //      * we have not logged in and told the session that someone
    //      wants to log in
    //      * several ways to handle this (see @02:50)

    //@02:50 - lower level implementation of logging in
    //  + we expect users to enter u/n and p/w
    //  + in P/m the POST('/login') route adds to u/n and p/w to body
    //      * u/n: lee
    //      * p/w: 123
    //  + credentials are being sent to this route

    //log the session ID to see it
    //  + session ID looks like a random string
    //  + if multiple request send, session ID changes (b/c no cookies)
    //  + if I set "saveUninitialized" to true, we get cookie
    //      * after saving and restarting, several P/m clicks give same session ID
    //      * same session ID occurs because we are "saving" Uninit..
    //      * in this example, cookies only live after 30s; @31s, new session ID generated

    //console.log(req.sessionID);

    //@04:05 - setting "saveUninit" back to false
    //  + don't want same session ID because user has not logged in yet
    //  + do not want to generate a sesion ID if they are not logging in
    //  + cookies cleared

    //retrieving the credentials from the request body
    const { username, password } = req.body

    //make sure the values are truthy (make sure they exist)
    if (username && password) {
        //check to see if the request session was authenticated

        //@04:25 -
        //if we modify the session object AT ALL session ID gets saved and sent back to client
        //in this sense "saved" means it is saved to the memory store
        if (req.session.authenticated) {

            //the .authenticated property did not exist on the session object when we typed it
            //if this property exists on the session object, the user has logged in

            res.json(req.session);
        } else {
            //if the property does not exist compare passwords
                //IRL would not hard-code this check,
                //IRL we'd hash the raw p/w and compare it to hashed p/w in the db
            if (password === "123") {
                //if the credentials make sense here, authenticate the user
                req.session.authenticated = true;
                req.session.user = { 
                    username, password
                }

                //sends back u/n and p/w for this video
                res.json(req.session);
            } else {
                res.status(403).json({ msg: "Bad Credentials"});
            }
        }
    } else {
        res.status(403).json({ msg: "Bad Credentials"});
    }

    //@06:00 - P/m trial
    //no password: denied   | had to turn off the first res.send(), but it works
    //wrong password: denied| 
    //right password: access| prints out session data in P/m; also sends a cookie
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});