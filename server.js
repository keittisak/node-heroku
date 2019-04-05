const express = require("express");
const request = require('request');

const app = express();
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer gqgEkKz8kKUIJ9XwgmBhK3ZbPnzK2W4H6XfBmLMXZ8UJjzmCy9NSzldWU0XFDYK9+Oz6tpXagzwmtOvRfZvfpYFsIe51T9vX2ljZ79r2xu7UYZj/nyXgUdstJ6qc0aiFAUzQXf303D3Tx8Uq4DcV5QdB04t89/1O/w1cDnyilFU=`
};

var port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    var responseObject = {
        status: true,
        data: { text: "hello keittisak" }
    }
    res.json(responseObject);
});

app.post('/webhook', (req, res) => {
    if (req.body.events[0].type !== 'message') {
        reply(req.body);
    }else{
        if (req.body.events[0].message.type !== 'text') {
            reply(req.body);
        } else {
            postToDialogflow(req);
        }
    }
});


const reply = (bodyResponse) => {
    return request({
        method : `POST`,
        uri : `${LINE_MESSAGING_API}/reply`,
        headers : LINE_HEADER,
        body : JSON.stringify({
            replyToken : bodyResponse.events[0].replyToken,
            messages: [{
                type : 'text',
                // text : bodyResponse.events[0].message.text
                text : JSON.stringify(bodyResponse)
            }]
        })
    })
};

const postToDialogflow = (req) => {
    req.headers.host = "bots.dialogflow.com";
    return request({
      method: "POST",
      uri: "https://bots.dialogflow.com/line/00a963e0-b8e1-435f-affe-92a6cb6be622/webhook",
      headers: req.headers,
      body: JSON.stringify(req.body)
    },function(err, httpResponse, body){
        if (err) {
            return console.error('upload failed:', err);
          }
        console.log('Upload successful!  Server responded with:', httpResponse, body);
    });
  };


app.listen(port, () => {
   console.log("application is listening on:", port);
});