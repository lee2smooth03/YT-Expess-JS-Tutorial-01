const cookieParser = require('cookie-parser');
//because by default, express will not parse cookies for us
//without this, req.cookies property will go as undefined
//use cookie-parser to register middleware in this app

const express = require('express');
const app = express();


app.use(cookieParser());//      | parses cookies if present
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

//new pretend-signin route
//website logins often send cookies back
app.get('/signin', (req, res) => {
    //cookies are set on the RESPONSE
    //  + cookie needs a name
    res.cookie('session_id', '123456');
    res.status(200).json({ msg: 'logged in'});
    //@04:35 - test in P/m
    //  + session_id is identified as a cookie
    //  + session_id lives in the client (P/m)

    //@05:10 validate the cookie every request
    //  + make sure cookie actually exists
    //  + new middleware function coming

    //@05:20 go to app-0511.js file
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});