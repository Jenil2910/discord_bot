module.exports = {
    getReply : (pid, cIds, r) => {
        promises = [];
        cIds.forEach(cid => {
            promises.push(gen_promise(pid, cid, r));
        });
        return Promise.all(promises);
    }
}

function gen_promise(pid, cid, r){
    return new Promise((res, rej) => {
        console.log(`Getting Replies of ${cid}`);
        r.getComment(cid).expandReplies()
        .then( comm =>{
            if(typeof comm.replies === 'undefined'){
                res({
                    isreply: false,
                    reply: ''
                });
            }
            let repl = comm.replies.find( e => {
                //return e.author.name == 'Infinity291092';
                console.log(`msg : ${e.body}, ${typeof e.body.match(/[0-9,]+ \*Memecoins\*/g)}`);
                return e.author.name == 'MemeInvestor_bot' && (typeof e.body.match(/[0-9,]+ \*Memecoins\*/g) != 'undefined');
            });
            if(typeof repl === 'undefined'){
                res({
                    isreply: false,
                    reply: ''
                });
            }else{
                res({
                    isreply: true,
                    reply: `${repl.body}`
                });
            }
        }).catch( err => {
            rej(`Error[${err}] while fetching reply, cid:[${cid}] pid:[${pid}]`);
        });
    })
}
