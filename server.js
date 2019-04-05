var express = require("express");
var app = express();

var port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    var responseObject = {
        status: true,
        data: { text: "hello keittisak" }
    }
    res.json(responseObject);
});

app.post('/webhook', (req, res) => {
    return req;
});

app.listen(port, () => {
   console.log("application is listening on:", port);
});