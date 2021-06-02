const express = require('express');
const app = express();

//@01:30 - locating the middleware in the file
//  + register middleware before the routes that use them 
//  + if the next lines are at the bottom, code will not work
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  + express middleware is registered with the .use() method
//  + the .use() method takes a single function w/ 3 params:
//      * req (request) object
//      * res (response) object
//      * next function (the next function)
app.use((req, res, next) => {
    //for every request log the request type (method)
    console.log(`${req.method} - ${req.url}`);//          | console displays GET, POST...

    //@03:30
    //after running app P/m, logs, but we get no response
    //we get no response, because is awaiting on "next" call
    //  * so far we have only been using two params.
    //  * need to make sure we are invoking the next function
    next();

    //@04:30
    //adding the above line absolutely works
    //the method and url are logged THEN the GET|POST happens

    //"next" can also be passed in GET|POST routes
    //this example does not include it because no function follows
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

app.post('/posts', (req, res) => {
    console.log(req.headers);
    console.log(req.body);

    const { authorization } = req.headers;
    if (authorization && (authorization === '123')) {

        const post = req.body;
        console.log(post);
        posts.push(post);
        res.status(201).send(posts);

    } else {
        res.status(403).send("Forbidden credentials");
    }
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});