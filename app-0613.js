const session = require('express-session');

//@06:30 - use a store for our sessions
//  + session module has a class called memory store
//  + store is creating new instance of that memory store
//  + to "set up" a store, pass the store property on session
const store = new session.MemoryStore();

const express = require('express');
const app = express();

app.use(session({
    secret:"some secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    //store: store//    | store property was set to store variable
    store         //    | alternative way to write line above
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//@07:00 - 
//update the middleware to print out store
//this is what the store will look like in a db for a fullstack app
app.use((req, res, next) => {
    console.log(store);
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

app.post('/login', (req, res) => {
    console.log("Hello");
    console.log(req.sessionID);
    const { username, password } = req.body

    if (username && password) {
        if (req.session.authenticated) {
            res.json(req.session);
        } else {
            if (password === "123") {
                req.session.authenticated = true;
                req.session.user = { 
                    username, password
                }
                res.json(req.session);
            } else {
                res.status(403).json({ msg: "Bad Credentials"});
            }
        }
    } else {
        res.status(403).json({ msg: "Bad Credentials"});
    }
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});