# YouTube Tutorial: Express JS #
Teacher: Anson the Developer (https://github.com/ansonfoong)

Persistent data will become more common in some of my upcoming projects. Anson the Developer has put together videos using technologies that are already (partially) familiar to me. This tutorial serves as a refresher for concepts that I am already familiar w/, but will fill in gaps of any information that I may have missed before. This series will bring me up to speed on best-practices as well as introduce me to new technologies.

This file will contain most of the notes that are gleaned from watching the videos.

Additional notes can be found in the app-####.js files that accompany the chapters. Note: in the demo file naming, the first two hashes represent the video number (##) and the last two hashes represent the overall modification number (first file, second file, third file...); the demo files are broken up to avoid confusion among notes

## Tutorial Overview ##

- #00| Introduction to Express
- #01| Getting Started          | https://www.youtube.com/watch?v=T2KjBiwYyBI
- #02| Routing                  | https://www.youtube.com/watch?v=NwyC3rHBx9M
- #03| Posts                    | https://www.youtube.com/watch?v=1cjdlfB11Ss
- #04| Middleware Functions     | https://www.youtube.com/watch?v=m_vEGvnXBf0
- #05| (HTTP) Cookies           | https://www.youtube.com/watch?v=2so3hh8n-3w
- #06| Sessions (in Express)    | https://www.youtube.com/watch?v=oYGhoHW7zqI
- #07| Routers                  | https://www.youtube.com/watch?v=IJA0Nu_gMJY
- #--| Install MySQL on Win 10  | https://www.youtube.com/watch?v=VAC_gmQZ_ws
- #08| Connecting to MySQL DB   | https://www.youtube.com/watch?v=bqpgbTq8bbw
- #09| Data Validation          | https://www.youtube.com/watch?v=WvwMAJU1bd4
- #10| Authentication w/Passport| https://www.youtube.com/watch?v=zb8VPxpm_ME


### #00| Introduction to Express ###
- Express is a (web) **framework** that allows /dev/s to build powerful APIs
    + Express is minimal
    + Express is flexible
    + many packages support Express
    + Express is easy to learn
- Express makes it easy for /dev/s to build out the backend

- a (web) **framework**...
    + offers tools that /dev/s implement w/o knowing abstract
    + does all of the "heavy lifting" so /dev/ focus on logic
    + keeps /dev/ from having to write the same lines of code over and again
    + keeps functionalities available for use when needed

    //write all the code in one file to be pulled when needed

-  this is what Anson says we should know before going on:
    + [ ] how to turn a computer on
    + [ ] basics of JS
        * callback functions
        * asynchronous programming
    + [ ] know APIs and HTTP protocol at a basic level
    + [ ] have Node.js installed (go to www.nodejs.org)
    + [ ] have a text editor installed (VS Code | Atom)

- key concepts that will apply to any framework
    + request methods   | req, res
    + route handling    | GET, POST, PUT, FETCH
    + route parameters  | req.body.param
    + query parameters  |
    + headers           | POSTman stuff

### #01| Getting Started ###
- this video starts by creating a new file named "app.js"
    + the app is named "app.js"  by convention
    + this new file will be the entry point of the project
        * using CommonJS modules
        * require function will be used to import express

        * ex: const express = require('express);

- running commands from the CLI:
    + node -v   | verifies my version of node
    +           | v14.15.3 as of 04.17.2021

    + npm init -y   | generates a package.json file for us
    +               //npm is installed w/ node.js
    +               //a manifest file that describes meta-data
    +               //it lists our dependencies once installed

    + npm i express | installs express
    +               | installs 04.17.1 as of 04.17.2021 (ha!)

- moves over to the app.js file
    + (see app.js file for file-specific notes)

- app.js successfully runs through 20 lines
    + server runs on PORT 3000
    + server is ready to handle requests

    + Q:how do we actually interact w/ our application?
    + Q:how do we access it?

- A:type this in bowser URL: localhost:3000   | "cannot get /"
    + says we "cannot get" b/c we haven't handled any routes
    + let's handle a simple route
        * app.js will be renamed to app-01A.js          | first app.js file in exercise 01 (A)
        * the server w/ simple route is app-01B.js    | second app.js file in exercise 01 (B)

- can make the request from the powershell @CLI: 
    + invoke-restmethod  http://localhost:3000
    + it did not work for me in the VS Code terminal

- it's a basic web app; copied from the final lines in app-01B
- in this version of the app, we get the response to send:
    + status    |@008| res.sendStatus(status)
    + messages  |@028| res.send("this string")
    + JSON      |@031| res.send({key:value pairs})

- this app does not do much, but it works
- doing more will require more information about:
    + routing
    + route methods
    + headers
    + scrape parameters

### #02| Routing ###
- this video demonstrates how to set up different routes in the app
    + files
        * app-01B.js completed the last video
        * the file is being renamed to app-02C.js to start this video

        * //the (2) is for the second video; (C) is the third iteration

- routing allows users to visit different locations of an app
    + ex: google.com
        * google.com/gmail  > takes user to gmail app
        * google.com/maps   > takes user to maps app

- on the server side, each route can represent diff resources 
    + in our file create a route to handle users in app-02C.js
        * GET request to the /users route
        * (...go to the app-02C.js file)

- @01:20 | begin POSTman demonstration
    + in the POSTman (P/m) desktop app
        * GET > localhost:3000          (success)
        * GET > localhost:3000/users    (success)

        * P/m allows user to make HTTP requests
        * P/m sends back status, time, and size
        * the server must be running to use P/m

- @02:05 | introduction to application called nodemon
    + not "no demon" but "node monitor"
    + installing the monitor from @CLI:
        * npm i -g nodemon

    + nodemon does the samr thing as node, but
    + nodemon auto. restarts the app after saved changes

    + //installing nodemon (...again? it may already be on)
    + //no, it was not already installed, but now it

- all GET requests are essentially asking server for resources
    + app.get('/')      | gets the index
    + app.get('/users') | gets all resources from users
    + app.get('/posts') | gets all resources from posts

- take special notice the pattern that each route
    + APP.ROUTE_METHOD('ENDPOINT_NAME', HANDLER_FUNCT =>{});

- three simple routes paths have been demonstrated
- more complex routes are also possible
    + introducing route parameters
    + see the app-02D.js file

- request parameters let us create APIs where we set up endpoints w/ dynamic values that are created using parameters
    + ex: '/users/:name'
        * /users will never change
        * /:name is a value that can change every time

    + ex: 'users/:username'
        * parameter name could be anything (username, etc.)
        * instead of having individual routes per user, use route parameter as data to reteieve database info

- based on the capabilities of route parameters, next example will return a user based on their name:
    + ex: see the app-02E.js file

        * return the user based on the name
        * query records (array|db) find one based on name
        * const {name} = req.params

            //object destructuring to get the name param
            //in this case, destructured var has same name
            //pulling out the name property from req.params

- next video:
    + post requests (for creating resources)

- this video:
    + routes
    + route parameters
    + query parameters

### #03| POST Requests ###
- POST requests
    + represent any action that requires creation of resources
        * new user account
        * creating new order
    + allow data to be sent w/ the request in request body
    + imply that a web server receives data stores the data

    + ex: go to www.google.com to create a new account:
        * enter credentials (F.Name|L.Name)
        * enter the email that we want to use
        * a "submit" button makes HTTP POST request
        * the data/credentials become part of request body

        * data sent to Google servers
        * the Google servers perform validation
        * if everything checks out, res.status(201)

- Request Body
    + request is an HTTP message sent from client to server
    + the request body (req.body) is more info within request
        * can be from an HTML form
        * can be from raw text (??)
    + every request method does not contain a body
        * GET requests do not contain request bodies
        *   ex: GET requests are only used to retrieve
        *   ex: GET requests can use additional info by adding of query strings and query parameters

- @01:30 - over to the app-03F.js file
- @02:45 - sending over some data w/ P/m
    + select the "Body" tab from the row of windows
    + | Params | Auth | Headers || Body || Pre-Req | Tests...
        * select URL encoded, or raw

    + whenever sending data w/ HTML forms to the backend, be sure to enable URL-encoding middleware

- @03:00 - over to the app-03F.js file
- @03:45 - 
    + URL encoding has been commented out in app-03F.js file
    + key:value pairs are passed in P/m as fake form inputs
    + when "Send" is hit, terminal console says "undefined"
        * because the app.use() middleware is commented out

- @04:00 -
    + URL encoding has been enabled in the app-03F.js file
    + when "Send" is hit, terminal console has the P/m data

- @04:20
    + raw "payloads" can also be sent as
        * JSON
        * text
    + in P/m, raw data was sent over as JSON:
        * { "name": "John C. Quely", "age": 42 }
        * //property names must be double-quotwd for JSON
    
    + when "Send" is hit, terminal console shows empty object
        * the app.use() JSON middleware needs to be applied

- the app.use() lines in app-03F.js are middleware functions
    + before ea request, the server detects form data|payloads
        * data will be parsed correctly
        * data will be attached to app.body
        * **middleware to be discussed in upcoming videos**
        * middleware f(x) must be present for data to show

- @05:30 - typical post requests send data to database
    + in the absence of a db, send our posts to users[ ]
    + always make sure we're validating data before pushing
    + ex: BAD: this code pushes an obj that might not match the db model (users[ ] only needs the name and age)
        * app.post('/', (req, res) => {
        *   const user = req.body;          //what is in body?
        *   users.push(user);
        *   res.status(201).send('created user')
        * });

- @05:45 - over to the app-03G.js file
- @06:30 - aside from request bodies, we can also send HTTP headers
    + headers allow /dev/s to attach additional info to requests or responses
    + headers are for the global side of the application
    + ex: if every route handles the same type of data
        * that info should probably be passed as a header instead of req.body
        * the data in the req.body should pertain to business logic

- @08:00 - send additional headers (in P/m)
    + adding and Authorization Token (to the Headers)
        * this is a fake example w/ a value of 123
        * Authorization:123
    + when we post it through P/m, now have a new header
        * over to the app-03G.js file

### #04| Express Middleware ###
- Q: how do we describe (express) middleware?
    1. express middleware is a function w/ three (3) params.
        * request object
        * response object
        * a function ot invoke the _next_ middleware function
    2. express middleware allows /dev/s to separate the logic
        * create multiple funcitons
        * invoking seperate functions in a sequential order
    3. in lesson #03, there were two middleware functions used
        * express.json() was used to DETECT req.body w/ JSON
        * express.urlencoded() did the same, but w/ encoding

- the are different types of middleware:
    1. **application-level** middleware get applied to every route (at the global level)
        * @01:20 - get ready to register middleware functions
        * go over to app-04H.js file
    2. **router-level** middleware only gets applied to every router (works the same as **app-level**)
    3. other kinds...(we will not cover them all in *#04*)
        * built-in middleware (express.json, express.static)
        * error-handling middleware
        * third-party middleware (npm modlules, etc.)

- middleware makes great use of the sequential solutions 
    + this function [next] this function [next] that function

- middleware is function thats invoked before another function
- Q: what if we want specific middleware that only applies to one route or specific routes?
    + @05:25 - go to P/m to test all routes
        * GET '/'               | works
        * GET '/users'          | works (original list)
        * GET '/users/:name'    | works (both conditions)
        * GET '/posts'          | works
        * GET '/posts?title=..' | works (all three titles)
        * POST '/posts'         | works (with auth='123')
        *                       | denied (with auth='1234')
    + @05:45 - check auth headers w/ middleware before posts
        * right now, app.post() route does auth check
        * go over to app-04I.js file to see use middleware

### #05| (HTTP) Cookies ###
- Q: what exactly are HTTP cookies?
    + cookies = small data pieces sent to client from a server
    + clients (which can be browsers or Postman) store cookies
    + subsequent requests to the server trade cookies for info
        * info can be recent orders
        * info can be our credentials
        * info can be items in our shopping cart
    + if/when cookies expire they are not sent to the server

- Q: why are cookies used?
    + cookies allow us to keep track of the state of our HTTP request
        * HTTP requests are state-less by default
        * every request to a server is independent of the next
        * no way to obtain info about previously made requests
    + cookies keep track of requests (plain and simple here)
    + cookies keep track of user activities
    + cookies maintain logged-in users  

- note: cookies live on the (client-side) browser
- note: local storage can also be used, but some situations will favor the use of one option over the next

- Q: how do cookies work?
    + high-level flow of a login system:
        1. a user enters u/n and p/w ||clicks login button||
        2. a (POST) request is made to server w/ credentials
        3. server generates a *unique session ID* for client
        4. server sends a response and...
            * it attaches *unique session ID* in the headers 
            * client sets the appropriate cookies for later
        5. client-side browser now has the cookie stores it
            * every request made to server will send cookie
            * the HTTP cookie is sent in the request header
            * //correlation between *session ID* and cookie:
            * //    + the server generates a *session ID*
            * //    + session ID **can** be used as a cookie
            * //    + every request to server is uniques to user
            * //seems like one cookie is vollied back-forth
            * //credentials header must be set when sending requests to the server in order for cookies to send
        6. the server receives the request...
            * middleware functions parse the received cookie
            * we can now perform check to see which user owns the cookie (on server side)
            * we (example) check database w/ *session ID*
        7. server sends back a response after doing logic

- @02:30 go to the app-0510.js file
    + going to send a cookie back to the client
    + but first npm i cookie-parser (middleware)

- @04:35 - testing first cookie in P/m
- @05:10 - validate the cookie every request
- @05:20 - go to app-0511.js file

### #06| Sessions (in Express) ###
- Q: what are sessions?
    + sessions are important because they (also) maintain states of HTTP requests
    + sessions vs. cookies | major difference between sessions and cookies:
        * sessions live on the server
        * cookies live on the client-side
        
- Q: why do we need sessions?
    + sessions are more secure because they are stored on the server vs a client
    + users don't (shouldn't) want to save important data in client-side cookies
        * ex: u/n and p/w   | save info on db so session knows who is requesting

- @06:30 - video and concepts get a little confusing
- @06:30 - go to app-0613.js file
    + using a store for our sessions

- sessions will require further review
- successful login attempts modify the session object
    + session gets saved to db, or
    + session gets saved to memory (this example)

- saved sessions go to the client
    + cookie can be used to make requests over and again
    + cookie can be checked to see who is making the requests
        * which requests are associate w/ this cookie?

- using something like Passport allows us to avoid nuts/bolts

### #07| Routers (in Express) ###
- Q: what are express routers?
    + think of them as mini apps

- Q: why do we use routers?
    + they allow /dev/s to create more modular routes
        * right now all of the routes are in one file
        * having cluttered files is bad programming

    + the app.js file
        * should register the main middlewares
        * should not have routes in this file

- @00:25 go over to app-0714.js file (NOTICE!)
    + anson creates a new folder called routes
    + we will create a folder in place of file
        * @CLI: mkdir app-0714

    + the app-0714.js file was moved to the new directory
        * @CLI: mv app-0714.js ./app-0714

- @00:45 comment/remove all of the code that shouldn't be
- @06:00 we have a much cleaner app-#.js file
    + commented out logic can be moved to corresponding files
    + middleware functions can be moved to their own file and import them where needed
        * the middleware is application-level already
        * middleware can also be added to routes too
        //@06:35 add router-level middleware users.js

### #--| Install MySQL on Win 10 ###
- this is a necessary step to follow before proceeding to the next video
- MySQL has been installed on this machine since 2017, but needs configuring
- follow these steps:
    01. go to https://www.mysql.com/
    02. go to https://www.mysql.com/downloads/
    03. find link to [MySQL Community Downloads]
    04. go to https://dev.mysql.com/downloads/
        * [MySQL Installer for Windows]
        * //select the larger of the two

    + from the program navigatino window
    05. custom set-up type (need to remove old versions)
        * [ ] (latest) MySQL Server
        * [ ] (latest) MySQL Workbench
        * [ ] (latest) MySQL Shell (this is what I was missing)
        * [ ] Visual Studios

- @02:45
- installation with MySQL
    + creating user accounts
        * root:root
        * u/n:p/w (lee2smooth03)
        * u/n:p/w (arozier4 - no ".")
        * //
    + default account (root)
        * //in practice you dont want to use root

- @05:30
- anson does a demonstration of MySQL using command line
    + not cmd.exe
    + not git bash
    + (I thought) he was using powershell
        * our installation of MySQL included MySQL shell
        * the **powershell** can be accessed in the program search
        * VS Code also allows additional terminals to be open below (add powershell window)
    + he is using MySQL 8.0 Command Line Client (start/programs: it's an app/program)
        * https://dev.mysql.com/doc/mysql-getting-started/en/
        * Q: is there a way to connect to CL client in Bash Terminal?
- **Understanding MySQL has become a whole ass thing**
    + **right now, I need to verify if which instance I'm connected to:**
        * *MySQL?*
        * *MySQLx?*
    + **I'm looking over documents to understand why my connection looks different than Anson's**
        * _his connection: MySQL>_
        * _my connection: MySQL localhost:33030+ ssl JS>_
        * **my connection does not run the same commands as his** *(ex: SHOW DATABASES; CREATE TABLES; etc.)*
    + **ultimately, I want to be able to make the PROPER connection in my Bash terminal to follow along**
    + **these are some the windows that I have open right now to help my understand what I see**
        * MySQL 8.0 Command Line Client installed during the update (https://dev.mysql.com/doc/search/?d=201&p=1&q=x+devapi)
        * I believe I'm connected using the X protocol (https://dev.mysql.com/doc/refman/8.0/en/mysql-shell-userguide.html)
        * https://dev.mysql.com/doc/mysql-getting-started/en/
        * CRUD operation: https://dev.mysql.com/doc/x-devapi-userguide/en/sql-crud-functions.html#table-insert
        * shell commands: https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-commands.html
        * here's the example that showed me what I was missing: https://www.percona.com/blog/2019/01/07/understanding-mysql-x-all-flavors/

    + messing around, I made a successful connection to the local host:
        * @CLI| MySQL localhost:33060+ ssl JS> \connect root:root@localhost:3306 (used root u/n and p/w; local host from GUI)
        * @CLI| MySQL localhost:3306 ssl JS> (...notice how the port # changed in the promt to 3306 and the "+" disappears)
    
    + I did not specify which type of connection I wanted tho...I think I want the traditional connection to use reg commands
        * @CLI| > \h \connect (pay attention to the syntax; I need to specify type mc or mysql to get the "classic protocol")
        * @CLI| > (this works, but the command promt still looks "extended")
    + I've disconnected connected as root on mysql and mysqlx

    + APPARENTLY, ALL I NEEDED TO DO WAS TO SWITCH TO "SQL MODE" IN ORDER TO USE SQL COMMANDS!!!!!
        * @CLI| * @CLI| MySQL localhost:33060+ ssl JS> \sql (the JS at the end of the prompt becomes SQL and I can now follow)
        * SHOW DATABASES; shows the databases just like I saw in the video...I'm not in the SQL monitor like Anson; small win
        * now I can follow along in the BASH Terminal...I think I'm ready for the next video

### #08| Connecting to MySQL Database ###
- how to connect Node.js app w/ MySQL
- Q: what is a database?
    + allow us to store collections of data in organized manner
        * retrieve data
        * delete data
        * update data
        * create new records
        * //CRUD

- Q: why would we ever need a database?
    + storing info in memory wipes it out every time the app restarts
    + ex: writing an app that uses memory to store user info
        * if info stored in array, it wipes out on ea. restart
    + databases offer you a way to keep persistent data/info

- there are different types of databases
    + relational (MySQL) --> used in this tutorial series
    + non-relational (MongoDB)

- @01:15 
    + make sure MySQL Server installed (see prior video notes)
    + install the following package (npm i mysql2)
        * allows us to connect our node.js app to MySQL server

- @01:45
    + Anson logs into MySQL Server from the terminal
    + my connectino is established in the terminal (2:mysqlsh)

- @02:05 (in the 2:mysqlsh terminal)
    + @CLI | CREATE DATABASE SampleApp;     //works
    + @CLI | USE SampleApp;                 //works
    + @CLI | SHOW TABLES;                   //works (empty)
    + @CLI | CREATE TABLE USERS (username VARCHAR(255), password VARCHAR(255));                 //set two columns

    + @CLI | SHOW TABLES;                   //works
    + @CLI | DESCRIBE USERS;                //works (shows)

- @03:10
    + create our connection through a new file: 
        * database.js
        * exists on the same level as app-0815.js

- @07:00 (check results of user in the 2:mysqlsh terminal)
    + @CLI | SELECT * FROM USERS            //works

- @07:20 (demonstration on how to delete all info from data)
    + @CLI | DELETE FROM USERS

- @07:45
    + use one of the previously established routes to get all
    + let's say we want to get all of the users from a database
        * go to the users.js file

### #09| Data Validation ###
- important to validate all info|data going to the server
- when info|data isn't validated, app is vulnerable:
    + anything can be stored in the stored in db
    + hackers can send things to expose data in db
    + ex: you asked for an email and got a tel number

- always validate on client and server sides
    + client can be:
        * browser (HTML form)
        * cell phone
        * curl
        * P/m
        * invoke/rest method

- validation just checks to see if conditions are met
    + ex.: username length >= 5 characters

- @01:30 (in the bash terminal)
- install express-validator
    + offers middleware functions that validate info 
    + @CLI | npm i npm express-validator

- @02:00
- validate all of the data being sent to the "/users/" input
- go to the users.js file

- @09:00
- after adding several checks to the express validator, leezy
- can add other checks (like adding duplicate records)
    + username can be primary key
    + query db to see if record

### #10| Authentication w/ Passport JS ###
- Q: what is authentication?
- authentication is the process of identifying an HTTP request
    + request created by a user or client
    + verifies identity of the requester of the application
    + ex: login request
        * server receives u/n
        * server receives p/w
        * server checks db to see if the db p/w = request p/w

- Q: why do we authenticate?
- authenticate to identify who is making requests to API
- authenticate to prevent database abuse (spamming the API)
    + know where the spam is coming from to disable it

- there are different authenticaion methods:
    + this video focuses on single-factor authentication
        * enter u/n and p/w then verify existence and match
        * if the records are correct, then site access granted

- @ 00:55
- install two (2) modules:
    + passport (https://www.passportjs.org/)
        * authentication middleware
        * takes care of saving sessions in the request object

    + passport-local
        * this is the "strategy" that we're using to authenticate users
        * there are other strategies that we could implement at www.passportjs.org

    + @CLI| npm i passport passport-local

- @ 01:45
- create new file "auth.js" (that is a router)

- @ 02:40
- create new folder called strategies
    + holds a newly-created file called local.js

- @ 04:30
- go to P/m and post to "/auth/login"
    + the record is found in the database
    + results is within an array or arrays, use [0][#]

### #99| Did You Forget .md again? ###
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

``how does this look?``  
__how does this look?__  
**how does this look?**  
***how does this look?***  
**_how does this look_**  