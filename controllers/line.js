const api = require('../services/api');
exports.webhook = async (req, res)=>{
    try {
        if (req.body.events[0].type !== 'message') {
            var response = await api.reply(req.body);
        }else{
            if (req.body.events[0].message.type !== 'text') {
                var response = await api.reply(req.body);
            } else {
                var response = await api.postToDialogflow(req);
                var resPush = await api.push(req.body.events[0].source.userId, 'xxx');
                // var response = await api.postToRocketbot(req);
                
            }
        }
        res.status(200).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
