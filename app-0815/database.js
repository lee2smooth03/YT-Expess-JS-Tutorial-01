//@03:20
//import mysql2 into the database file
const mysql = require("mysql2");

//export module allows us to import this file w/ db connection
module.exports = mysql.createConnection({
    host: "localhost",  //because we're logging into local mysql
    user: "root",
    password: "root",
    database: "SampleApp"
});