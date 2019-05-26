const echo = require('../commands/echo.js')
const invest = require('../commands/invest.js')

module.exports = (client, msg) => {
    if((msg.channel.name == 'off-topic' || msg.channel.name == 'bot') && global.active){
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
        }else if(msg.content.startsWith('/invest ') && msg.author.username == 'Infinity291092'){
            console.log(`${msg.content.split(' ')} ${msg.content.split(' ')[1]}`);
            invest(msg.content.split(' ')[1].split('/')[6], 1).then( sub => {
                user.send(`\`\`\`${sub}\`\`\``);
                if(typeof sub != 'undefined'){
                    user.send(`Sleeping for 3hrs`);
                    global.active=false;
                    setTimeout(()=>{
                        user.send(`Active again`);
                        global.active = true;
                    }, 10800);
                }
            }).catch( e => {
                user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
            console.log(`Finished Processing`);
        }else if(msg.content.startsWith('/sleep ') && msg.author.username == 'Infinity291092'){
            global.active=false;
            user.send(`Sleeping for ${msg.content.split(' ')[1]} seconds`);
            setTimeout(() => {
                user.send(`Active again`);
                global.active=true;
            });
        }
    }else if(msg.channel.name == 'off-topic' || msg.channel.name == 'bot'){
        if(msg.content.startsWith('/active ')){
            global.active=true;
            user.send(`Active again`);
        }
    }
}
