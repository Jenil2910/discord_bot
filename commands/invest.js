const snoowrap = require('snoowrap');
const commentHelpers = require('../helpers/commentHelpers.js')

var cIds = [];

module.exports = (link, lim) => {
    return invest_(link, lim);
}

function invest_(link, lim){
    const r = new snoowrap({
        userAgent: `${process.env.REDDIT_USERID}`,
        clientId: `${process.env.REDDIT_CLIENTID}`,
        clientSecret: `${process.env.REDDIT_CLIENTSECRET}`,
        refreshToken: `${process.env.REDDIT_REFRESHTOKEN}`
    });
    pollFreq = 10000;
	return new Promise((res, rej) => {
        r.getSubmission(`bt52yc`).expandReplies({limit: 1, depth: 1})
        .then( replies => {
            console.log(`Sending, Try no. ${lim}.`);
            return replies.comments[0].reply('Final');
        }).then( (com) => {
            console.log(`Reply sent. Comment id ${com.id}`);
            cIds.push(com.id);
            return new Promise((resolve) => {
                console.log(`Waiting, Try no. ${lim}.`);
                setTimeout(() => {
                    resolve(commentHelpers.getReply(link, cIds, r));
                    //resolve(commentHelpers.getReply(`bt52yc`, `eouh1zy`, r));
                }, pollFreq);
            })
        }).then(msgs => {
            console.log(`Replies Recieved, Try no. ${lim}.`);
            console.log(`${JSON.stringify(msgs)}`);
            repI = msgs.findIndex(msg => {
                return msg.isreply;
            })
            if(repI === -1){
                if(lim>2){
                    console.log(`reached end`);
                    res(`No reply from bot after 3 tries :(`);
                }else{
                    console.log(`link ${link}, lim ${lim}`);
                    invest_(link, lim+1).then( msg => {
                        res(`${msg}`);
                    }).catch( err => {
                        res(`Failed during Try no. ${lim+1}, Error ${err}`);
                    });
                }
            }else{
                res(`Bot Reply, Try no. ${lim}.: ${msgs[repI].reply}`);
            }
        }).catch( err => {
            rej(JSON.stringify({'err' : `Error during reply ${err}`, 'link' : link, 'lim' : lim}));
        });
    })
}

//function invest__(res, rej, link, lim, r)
