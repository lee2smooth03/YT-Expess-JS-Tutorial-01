const mysql = require("mysql2");

module.exports = mysql.createConnection({
    host: "localhost",  //because we're logging into local mysql
    user: "root",
    password: "root",
    database: "SampleApp"
});