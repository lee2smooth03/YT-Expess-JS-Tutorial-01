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
    title: 'my favorite foods',
    content: 'peas, greens, potatoes, tomatoes...you name it'
},{
    title: 'check my footwork',
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

//we can actually start to create more complex routes
//      + the following example passes a route parameter
//          * you want to retrieve a user based on their name
//          * define route parameters with ":" and "PARAM_NAME" 

app.get('/users/:name', (req, res) => {

    //we have created a route parameter that we call "name"
    //we can log the request object...which has properties
    console.log(req);           //request object
    console.log(req.params);    //one property called params

    //values log in the terminal's console

    //request parameters let us create APIs where we set up 
    //endpoints with dynamic values created using parameters
    //      ex: '/users/:name'
    //      + /users will never change
    //      + /:name is a value that can change every time

    //      ex: 'users/:username'
    //      + parameter name could be anything (username, etc.)
    
    //          * instead of having individual routes per user
    //          * use route parameter as data to reteieve db info
});

app.get('/posts', (req, res) => {
    //res.sendStatus(200).send(posts);  //chain has not worked
    res.send(posts);
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});