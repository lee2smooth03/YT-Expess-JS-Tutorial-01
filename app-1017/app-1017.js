const session = require("express-session");
const store = new session.MemoryStore();

//@04:00
//import passport and local strategies
const passport = require("passport");
const local = require("./stratetgies/local");

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

//@02:20
//import authorization route(s) using path
const authRoute = require("./routes/auth");

const express = require("express");
const app = express();

app.use(session({
    secret:"some secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    //console.log(store);
    next();
});

//do this to get passport to work
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoute);
app.use("/posts", postRoute);

//@02:30
//register the new route here
app.use("/auth", authRoute);


app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});