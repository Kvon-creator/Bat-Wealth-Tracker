const express = require("express");
const app = express();
const PORT = 3000;
let assets = [];

app.use(express.json());

app.use(function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.use(express.static("public"));

app.get("/api/assets", function (req, res) {
    res.json(assets);
});

app.post("/api/assets", function (req, res) {

    assets.push(req.body);

    res.json({
        message: "Equipment added"
    });
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});