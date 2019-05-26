const echo = require('../commands/echo.js')
const invest = require('../commands/invest.js')

module.exports = (client, msg) => {
    if((msg.channel.name == 'off-topic' || msg.channel.name == 'bot' || msg.channel.name == 'meme-alert' ) && global.active){
    //if(msg.channel.name == 'meme-alert'){
        let user = client.users.get(process.env.INFINITY_DISCORDID)
        let reg = /https\:\/\/(?:www\.)reddit\.com\/r\/MemeEconomy\/comments\/[a-z0-9]+\/[^ \/]+\//gm
        if(msg.content.match(reg) && msg.mentions.everyone){
            let matches = Array.from(msg.content.match(reg))
            invest(matches[0].split('/')[6], 1).then( sub => {
                user.send(`\`\`\`Successfully Invested.\nHere's commentId : ${sub}\`\`\``);
            }).catch( e => {
                user.send(`\`\`\`${e.err}\nlink : ${e.link}\`\`\``);
            });
            console.log(`Finished Processing`);
        }
    }else if(msg.channel.type === "dm" && msg.channel.recipient.username == 'Infinity291092'){
        console.log(`DM message ${msg.channel.recipient.username}`);
        let user = client.users.get(process.env.INFINITY_DISCORDID);
        if(msg.content.startsWith('<active ')){
            global.active=true;
            user.send(`Active again`);
        }else if(msg.content.startsWith('<isactive ')){
            user.send(`${global.active}`);
        }else if(msg.content.startsWith('<status ')){
            user.send(`pid[${global.pid}] cid[${global.cid}] active[${global.pid}] link[http://www.reddit.com/r/all/comments/${global.pid}//${global.cid}/]`);
        }else if(msg.content.startsWith('<sleep ')){
            global.active=false;
            user.send(`Sleeping for ${msg.content.split(' ')[1]} miliseconds`).then(x => {
                setTimeout(() => {
                    user.send(`Active again`);
                    global.active=true;
                }, parseInt(msg.content.split(' ')[1]));
            });
        }else if(msg.content.startsWith('<invest ')){
            console.log(`${msg.content.split(' ')} ${msg.content.split(' ')[1]}`);
            invest(msg.content.split(' ')[1].split('/')[6], 1).then( sub => {
                user.send(`\`\`\`${sub}\`\`\``);
            }).catch( e => {
                user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
            console.log(`Finished Processing`);
        }
    }
}
