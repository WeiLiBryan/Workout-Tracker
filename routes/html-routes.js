const router = require("express").Router();
const path = require("path");

// Base route
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

