const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer gqgEkKz8kKUIJ9XwgmBhK3ZbPnzK2W4H6XfBmLMXZ8UJjzmCy9NSzldWU0XFDYK9+Oz6tpXagzwmtOvRfZvfpYFsIe51T9vX2ljZ79r2xu7UYZj/nyXgUdstJ6qc0aiFAUzQXf303D3Tx8Uq4DcV5QdB04t89/1O/w1cDnyilFU=`
};

const reply = (bodyResponse, text = null) => {
    const messagesText = text;
    if(text === null)
        {
            messagesText = JSON.stringify(bodyResponse)
        }
    return request({
        method : `POST`,
        uri : `${LINE_MESSAGING_API}/reply`,
        headers : LINE_HEADER,
        body : JSON.stringify({
            replyToken : bodyResponse.events[0].replyToken,
            messages: [{
                type : 'text',
                // text : bodyResponse.events[0].message.text
                text : messagesText
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
    });
  };

  const postToRocketbot = (req) => {
    req.headers.host = "app.rocketbots.io";
    return request({
      method: "POST",
      uri: "https://app.rocketbots.io/line/webhook/1581296513",
      headers: req.headers,
      body: JSON.stringify(req.body)
    });

  };