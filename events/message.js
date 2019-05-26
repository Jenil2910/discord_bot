const echo = require('../commands/echo.js')
const invest = require('../commands/invest.js')

module.exports = (client, msg) => {
    if(msg.channel.name == 'meme-alert'){
        let user = client.users.get(process.env.INFINITY_DISCORDID)
        let reg = /https\:\/\/(?:www\.)reddit\.com\/r\/MemeEconomy\/comments\/[a-z0-9]+\/[^ \/]+\//gm
        if(msg.content.match(reg) && msg.mentions.everyone){
            let matches = Array.from(msg.content.match(reg))
            invest(matches[0].split('?')[0].split('/')[6], 1).then( sub => {
                user.send(`\`\`\`Successfully Invested.\nHere's commentId : ${sub}\`\`\``);
            }).catch( e => {
                user.send(`\`\`\`${e.err}\nlink : ${e.link}\`\`\``);
            });
            console.log(`Finished Processing`);
        }else if(msg.content.startsWith('/invest ') && msg.author.username == 'Infinity291092'){
            invest(msg.content.split(' ')[1].split('?')[0].split('/')[6], 1).then( sub => {
                user.send(`\`\`\`${sub}\`\`\``);
            }).catch( e => {
                user.send(`\`\`\`Error while investing : ${e}\`\`\``);
            });
            console.log(`Finished Processing`);
        }else{
            user.send(`unable to invest ${msg.content} matched ${msg.content.match(reg)}`);
        }
    }
}
