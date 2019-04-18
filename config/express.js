var express = require('express');
var bodyParser = require('body-parser');
const lines = require('../controllers/line');
module.exports = async ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", (req, res) => {
        var responseObject = {
            status: true,
            data: { text: "hello keittisak" }
        }
        res.json(responseObject);
    });

    app.post('/webhook', lines.webhook);

    return app;
}