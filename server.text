var express = require('./config/express');
var app = {}
var port = process.env.PORT || 5000;


async function main(){
    app = await express();
    app.listen(port);
    console.log('Starting node.js on port ' + port);
}

main();
