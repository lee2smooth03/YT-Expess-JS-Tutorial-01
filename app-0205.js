const express = require('express');
const app = express();

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

app.get('/users', (req, res) => {
    res.send(users);
});

//use a route parameter to retrieve info from the database
app.get('/users/:name', (req, res) => {

//    console.log(req);           //request object
//    console.log(req.params);    //one property called params

    //we are going to return the user based on a name
    const { name } = req.params      //object destructuring
    const user = users.find((any_user) => any_user.name === name);

    //callback returns the first record that matches name
    //we could just res.send() the user, but perform a check instead
    if (user) {
        //truthy if statement...for if the user was found
        res.status(200).send(user);         //this chain works
    } else {
        res.status(404).send(`User named "${name}" was not found in our database.\nCheck spelling or casing.`);
    }

});

//we can also send query strings
//      ex: let's find a post based on the title
app.get('/posts', (req, res) => {
    //console.log(req.query);
    //res.send(posts);
    //the request object has a property called 'query' to use

    const { title } = req.query;
    if (title) {
        //checking to see if query parameter "title" is present
        //if query parameter exists, we will modify the response

        //if "title" exists, we will search the post route
        //we want to find the post based on the title
        const any_post = posts.find((posted) => posted.title === title);
        //.find() method returns an array where criterion is met
        
        if (any_post) {
            res.status(200).send(any_post);
        } else {
            res.status(404).send("Sorry, this post was not found.");
        }
    }

    //to use query parameters, type "?" to start query string
    //      string specifies name:value pairs
    //      localhost:3000/posts?title= (above titles)

    //when pasting URL into the browser, spaces get replaced by %20
    //http://localhost:3000/posts?title=check%20my%20footwork
    //google: URL encoding
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});