const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
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

app.post('/', (req, res) => {

    //@05:45 - code works, but does not check incoming data
    const user = req.body;      //anything could be in req.body
    users.push(user);           //this line pushes anything to users[]
    res.status(201).send("Created a user");
    //do not trust client-side data
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
    res.status(200).send(posts);
});

//@07:15 simple post request with a header              | status post or blog post
app.post('/posts', (req, res) => {
    //to make this post, want to require a token        | auth. token later
    //tokens usually get passed in at the header        | every route needs a token

    //let's take a look at the headers
    console.log(req.headers);
    console.log(req.body);

    //@08:00 - send additional headers
    //@08:30 - grab the authorization from the header
    const { authorization } = req.headers;//            | object destructuring

    //make sure auth is truthy
    //truthy means "is it present"
    //also checking to see if it is equal to 123        | only do it like this for ex.
    if(authorization && (authorization === '123')){

        //it it meets criteria
        const post = req.body;//                        | the posted content lives here
        console.log(post);
        posts.push(post);
        res.status(201).send(post);

        //Q: what exactly did we post tho?
        //Q: where is the content that is being posted?

    } else {
        res.status(403).send("Forbidden credentials");
    }

});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});