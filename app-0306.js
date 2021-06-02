const express = require('express');
const app = express();

//@03:00 - be sure to enable URL-encoding middleware
        //references the express module @line01
        //then set the extended property to "false"
        //enabling this let's us handle URL encoded data
        //      + URL encoded data = URL encoded req.body
app.use(express.urlencoded({ extended: false }));

//@04:30 - the JSON middleware also needs to be applied
app.use(express.json());

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

//@01:35 - implementation of a POST request
//      + we're calling the POST request on the app object
//      + this allows our web server to handle post requests
app.post('/', (req, res) => {
    //we ave specified '/' as our endpoint
    //no conflict because we use diff. methods on same endpoint

    //@02:00 - we are going to log the request body
    //  + request body contains additional data that go w/ req.
    //  + u/n, p/w, email address, etc. get passed w/ req.body
    //console.log(req.body);
    //res.status(201).send("We've created an invisible user");

    //@02:20 - go to POSTman        | both GET & POST work
    //@02:45 - sending some data

    const user = req.body;
    users.push(user);
    res.status(201).send("Created a user");
});

app.get('/users', (req, res) => {
    res.send(users);
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
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});