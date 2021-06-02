const express = require('express');
const app = express();

//inserting a simple route to be handled
app.get('/', (req, res) => {

    //res.send(200);        | deprecated
    //res.sendStatus(200);  | works/normal

    //a 200 response is a successful response
    //to test the response:
    //      + go into the browser
    //      + install an HTTP client that can make requests
    //      + use invoke REST METHOD or Curl

    //app.get('/) is registering a route method
    //      + GET request to retrieve resources
    //      + the route where we will retrieve resources '/'
    //      + every request that maps to '/' is handled by the
    //        callback described (req, res) => {res...}

    //callback has two parameters (req, res)
    //      + request object    | (req)
    //      + response object   | (res)
    //          * res has .send() method
    //          * res can send body

    //res.send("Hello World");  | works...this is not a status

    //res.send() can also send back a JSON
    res.send({
        msg: 'Hi there!',       //gets sent to localhost
        user: {}                //shows up as an object
    });
});

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});

//restart application   | page says "OK"

//as of 04.17.2021
//----------------
//message in console says that .send(status) is deprecated
//message in console says to use res.sendStatus(status) instead
//there was no message to deprecate the res.send(message)

//in this version of the app, we get the response to send:
//      + status    |@008| res.sendStatus(status)
//      + messages  |@028| res.send("this string")
//      + JSON      |@031| res.send({key:value pairs})