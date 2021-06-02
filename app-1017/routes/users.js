const { Router } = require("express");
const router = Router();

const { check, validationResult } = require("express-validator");

const db = require("../database");

router.use((req, res, next) => {
    console.log(`Congratulations! You just made a ${req.method} request. Next function hapening now...`);   
    next();
});

router.get("/", async (req, res) => {
    const results = await db.promise().query("SELECT * FROM USERS");
    res.status(200).send(results[0]);
});

router.get("/posts", (req, res) => {
    res.json({ route: "In theory, this would return all user posts."});
});

router.post("/", [
    check("username")
        .notEmpty()
        .withMessage("Username cannot be empty!")
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters"),
    check("password")
        .notEmpty()
        .withMessage("Password cannot be empty!")], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;
    if (username && password) {
        try {
            console.log("tried it");
            db.promise().query(`INSERT INTO USERS VALUES ('${username}', '${password}')`);
            res.status(200).send({msg: "Congratulations! A new user has been created."});
        } catch (err) {
            console.log("caught it");
            console.log(err);
        }
    }
});

module.exports = router;