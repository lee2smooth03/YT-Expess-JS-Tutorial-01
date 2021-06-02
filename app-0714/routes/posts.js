//file created to handle all post requests
//primary content copied over form users.js

const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send(200);
});

//@04:30
//create a new route and include route parameter
//path does not work without a parameter
router.get("/postTitle/:title", (req, res) => {

    //console.log(req.params)
    res.json({ title: `Some random post about ${req.params.title}`});
});

module.exports = router;