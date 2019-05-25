const echo = require('../commands/echo.js')
const invest = require('../commands/invest.js')

module.exports = (client, msg) => {
    if(msg.channel.name == 'bot' 
        && msg.mentions.everyone
    ){
        let user = client.users.get(process.env.INFINITY_ID)
        let reg = /https\:\/\/(?:www\.)reddit\.com\/r\/MemeEconomy\/comments\/[a-z0-9]+\/[^ \/]+\//gm
        if(msg.content.match(reg) && msg.mentions){
            let matches = Array.from(msg.content.match(reg))
            invest(matches[0]).then( res => {
                user.send(`Successfully Invested.\nHere's more info : ${res}`)
            }).catch( err => {
                user.send(`error during investing ${err}`)
            })
        }else{
            user.send(`unable to invest match ${msg.content.match(reg)}`)
        }
    }
}
