const request = require('request');
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer gqgEkKz8kKUIJ9XwgmBhK3ZbPnzK2W4H6XfBmLMXZ8UJjzmCy9NSzldWU0XFDYK9+Oz6tpXagzwmtOvRfZvfpYFsIe51T9vX2ljZ79r2xu7UYZj/nyXgUdstJ6qc0aiFAUzQXf303D3Tx8Uq4DcV5QdB04t89/1O/w1cDnyilFU=`
};

exports.push = (userId, messages = "") => {
    return request({
        method : `POST`,
        uri : `${LINE_MESSAGING_API}/push`,
        headers : LINE_HEADER,
        body : JSON.stringify({
            to : userId,
            messages: [{
                type : 'text',
                text : messages
            }]
        })
    })
}

exports.reply = (resBody, text = 0) => {
    var messagesText = JSON.stringify(text);
    if(!text)
        {
            messagesText = JSON.stringify(resBody)
        }
    
    return request({
        method : `POST`,
        uri : `${LINE_MESSAGING_API}/reply`,
        headers : LINE_HEADER,
        body : JSON.stringify({
            replyToken : resBody.events[0].replyToken,
            messages: [{
                type : 'text',
                // text : resBody.events[0].message.text
                text : messagesText
            }]
        })
    })
};

exports.postToDialogflow = (req) => {
    req.headers.host = "bots.dialogflow.com";
    return request({
      method: "POST",
      uri: "https://bots.dialogflow.com/line/00a963e0-b8e1-435f-affe-92a6cb6be622/webhook",
      headers: req.headers,
      body: JSON.stringify(req.body)
    });
  };

exports.postToRocketbot = (req) => {
    req.headers.host = "app.rocketbots.io";
    return request({
      method: "POST",
      uri: "https://app.rocketbots.io/line/webhook/1581296513",
      headers: req.headers,
      body: JSON.stringify(req.body)
    });

  };