const snoowrap = require('snoowrap');
const commentHelpers = require('../helpers/commentHelpers.js')

var cIds = [];

module.exports = (link, lim) => {
    return invest_(link, lim);
}

function invest_(link, lim){
    const R = new snoowrap({
        userAgent: `${process.env.REDDIT_USERID}`,
        clientId: `${process.env.REDDIT_CLIENTID}`,
        clientSecret: `${process.env.REDDIT_CLIENTSECRET}`,
        refreshToken: `${process.env.REDDIT_REFRESHTOKEN}`
    });
    const r = new snoowrap({
        userAgent: `${process.env.INFINITY_USERID}`,
        clientId: `${process.env.INFINITY_CLIENTID}`,
        clientSecret: `${process.env.INFINITY_CLIENTSECRET}`,
        refreshToken: `${process.env.INFINITY_REFRESHTOKEN}`
    });
    pollFreq = 90000;//poll freq
    //console.log(r.getSubmission(link)).expandReplies();
	return new Promise((res, rej) => {
        //`bt52yc`
        console.log(`submission link ${link}`);
        global.pid = link;
        r.getSubmission(link).expandReplies({limit: 1, depth: 1})
        .then( replies => {
            console.log(`Sending, Try no. ${lim}.`);
            return replies.comments[0].reply('!invest 100%');
        }).then( (com) => {
            console.log(`Reply sent. Comment id ${com.id}`);
            cIds.push(com.id);
            return new Promise((resolve) => {
                console.log(`Waiting for ${pollFreq}, Try no. ${lim}.`);
                setTimeout(() => {
                    resolve(commentHelpers.getReply(link, cIds, r));
                }, pollFreq);
            })
        }).then(msgs => {
            console.log(`Replies Recieved, Try no. ${lim}.`);
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
                global.user.send(`Sleeping for 4hrs`);
                global.active=false;
                setTimeout(()=>{
                    if(!global.active){
                        global.user.send(`Active again`);
                        global.active=true;
                    }
                }, 14400000);
                global.cid = msgs[repI].id;
                res(`Bot Reply, Try no. ${lim}.: ${msgs[repI].reply}`);
            }
        }).catch( err => {
            rej(JSON.stringify({'err' : `Error during reply ${err}`, 'link' : link, 'lim' : lim}));
        });
    })
}

//function invest__(res, rej, link, lim, r)
