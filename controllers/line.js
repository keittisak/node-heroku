const api = require('../services/api');
const request = require('request');
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer gqgEkKz8kKUIJ9XwgmBhK3ZbPnzK2W4H6XfBmLMXZ8UJjzmCy9NSzldWU0XFDYK9+Oz6tpXagzwmtOvRfZvfpYFsIe51T9vX2ljZ79r2xu7UYZj/nyXgUdstJ6qc0aiFAUzQXf303D3Tx8Uq4DcV5QdB04t89/1O/w1cDnyilFU=`
};
exports.webhook = async (req, res)=>{
    try {
        if (req.body.events[0].type !== 'message') {
            return request({
                method : `POST`,
                uri : `${LINE_MESSAGING_API}/reply`,
                headers : LINE_HEADER,
                body : JSON.stringify({
                    replyToken : req.body.events[0].replyToken,
                    messages: [{
                        type : 'text',
                        // text : bodyResponse.events[0].message.text
                        text : JSON.stringify(req.body)
                    }]
                })
            })
            // var response = await api.reply(req.body);
        }else{
            if (req.body.events[0].message.type !== 'text') {
                var response = await api.reply(req.body);
            } else {
                var response = await api.postToDialogflow(req);
                // var response = await api.postToRocketbot(req);
                api.reply(req.body, response);
            }
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
