const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();


app.use(cookieParser());
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

//@05:20 - whenever a user makes a request validate cookie
//      + make sure the cookie exists
//      + write some middleware

function validateCookie(req, res, next) {
    //get the cookies from the request body
    const { cookies } = req;//      | destructuring cookies
    
    //console.log(cookies);
    //validate cookies
    if ("session_id" in cookies) {
        console.log("Session ID exists")
        //means client sent a cookie to the server

        //need to make sure it's the right cookie
        if (cookies.session_id === "123456") {
            //has a cookie and is the right cookie
            //proceed
            next();
        } else {
            res.status(403).send({msg: "You are not authorized"});
        };
    } else {
        res.status(403).send({msg: "You are not authorized"});
    };
};

//mount the new function to the signin route
//typically, a signin would be a post request

//@09:35 removed the validation from the signin so that we get cookie
//app.get('/signin', validateCookie, (req, res) => {
app.get('/signin', (req, res) => {

    res.cookie('session_id', '123456');
    res.status(200).json({ msg: 'logged in'});

    //@10:00 -
    //whenever we log in, we receive a cookie
    //that cookie is a unique ID generated from server
    //real applications do not hard-code session ID
    //generate unique session ID and it is saved on the server
    //every request to application validates session ID

    //getting a cookie back means we have one on our client
    //that cookie can be sent back to the server to access protected routes
});

//pretent to visit a protected route
app.get('/protected', validateCookie, (req, res) => {
    res.status(200).json({ msg: "You are authorized"});

    //reads "authorized" as suspected
    //@09:10 - delete the cookie in P/m
    //reads "not authorized"
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});