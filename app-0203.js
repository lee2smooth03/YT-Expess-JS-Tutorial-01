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

//the route method is GET ... app.get()
//a simple GET request to '/users'...asking for resources
app.get('/users', (req, res) => {

    //we will send back the users array @line 04
    res.send(users);

    //introduction to Postman right here
    //      + allows user to make HTTP requests
    //      + sends back status, time, and size
    //      + server must be running to use P/m

    //adding more data to the array treats it like a fake db
});

//we can have different routes
//ex: if we wanted to get a list of all posts
app.get('/posts', (req, res) => {

    //we will send back the users array @line 15
    //res.send(posts);              | works well; sends posts

    //it's good practice to send back a status code
    //      + response sends one back by default
    //      + get into habit of sending our own
    //      + can explicitely state which code to send

    //res.sendStatus(200).send(posts);  | chain does not work

    //      + status code: 200 | successful GET requests
    //      + status code: 403 | endpoint not authorized
    //      + status code: 404 | endpoint was not found
    res.send(posts);
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});

//all GET requests just ask for resources from routes