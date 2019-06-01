const echo = require('../commands/echo.js')
const invest = require('../commands/invest.js')

module.exports = (client, msg) => {
    if((msg.channel.name == 'off-topic' || msg.channel.name == 'bot' || msg.channel.name == 'meme-alert' ) && global.active){
    //if(msg.channel.name == 'meme-alert'){
        console.log(`Channel ${msg.channel.name} Message everyone[${msg.mentions.everyone}] match[${msg.content.match(/https\:\/\/(www\.){0,1}reddit\.com\/r\/MemeEconomy\/comments\/[a-z0-9]+\/[^ \/]+\//gm)}]`);
        let reg = /https\:\/\/(www\.){0,1}reddit\.com\/r\/MemeEconomy\/comments\/[a-z0-9]+\/[^ \/]+\//gm;
        console.log(`${msg.content.match(reg) && msg.mentions.everyone}`);
        if(msg.content.match(reg) && msg.mentions.everyone){
            let matches = Array.from(msg.content.match(reg));
            console.log(`started investing`);
            invest(matches[0].split('/')[6], 1, global.r).then( sub => {
                global.user.send(`\`\`\`${global.r.name}  ${sub}\`\`\``);
            }).catch( e => {
                global.user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
            invest(matches[0].split('/')[6], 1, global.R).then( sub => {
                global.user.send(`\`\`\`${global.R.name} ${sub}\`\`\``);
            }).catch( e => {
                global.user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
        }
    }else if(msg.channel.type === "dm" && msg.channel.recipient.username == 'Infinity291092'){
        console.log(`DM message ${msg.channel.recipient.username}`);
        if(msg.content == '<active'){
            global.active=true;
            global.user.send(`Active again`);
        }else if(msg.content == '<isactive'){
            global.user.send(`${global.active}`);
        }else if(msg.content == '<status'){
            global.user.send(`pid[${global.pid}] cid[${global.cid}] active[${global.active}] link[http://www.reddit.com//comments/${global.pid}//${global.cid}/]`);
        }else if(msg.content.startsWith('<sleep ')){
            global.active=false;
            global.user.send(`Sleeping for ${msg.content.split(' ')[1]} miliseconds`).then(x => {
                setTimeout(() => {
                    if(!global.active){
                        global.user.send(`Active again`);
                        global.active=true;
                    }
                }, parseInt(msg.content.split(' ')[1]));
            });
        }else if(msg.content.startsWith('<invest ')){
            console.log(`started investing`);
            console.log(`${msg.content.split(' ')} ${msg.content.split(' ')[1]}`);
            invest(msg.content.split(' ')[1].split('/')[6], 1).then( sub => {
                global.user.send(`\`\`\`${sub}\`\`\``);
            }).catch( e => {
                global.user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
        }
    }
}
