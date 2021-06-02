const express = require('express');
const app = express();

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

// @05:45 - before we post, let's check the auth headers
//      + introducing custom middleware to handle checks
//      + IRL use separate function do check and import
function validateAuthToken(req, res, next) {
    //this function takes in three parameters
    //it takes care of authorzation header
    //      + makes sure auth header exists (truthy)
    //      + makes sure auth header is proper value

    console.log("We are now inside of the auth validation.");
    const { authorization } = req.headers;//        | destructuring auth

    //checks to see if it exists and it has proper value
    if (authorization && (authorization === '123')) {
        //next() is only invoked if condition is true!
        next();//                                   | next function is '/posts'
    } else {
        //if condition is not true, we will end the request
        res.status(403).send({ msg: "Post failed. Improper credentials"}); //JSON
    }
}

app.post('/posts', validateAuthToken, (req, res) => {
    //console.log(req.headers);
    //console.log(post);

    //the auth check (if condition) that was here has moved
        //it has moved to the validateAuthToken function 
        //that function has been "mounted" to this route
            //"mounting" = pass that function as a param

        //NOW, when this route is requested, validation!
        //notice where the auth validation is positioned
            //the validation happens BEFORE the callback
            //if the validation function fails, JSON msg
            //if the validation passes, this is next()

    //if we make it here, we can assume the correct info
    const post = req.body;
    posts.push(post);
    res.status(201).send(posts);
    //no longer need to perform checks inside post route
    //the callback in this route can focus on its task
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});