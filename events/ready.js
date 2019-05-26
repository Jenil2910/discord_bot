module.exports = client => {
    global.active = true;
    global.user = client.users.get(process.env.INFINITY_DISCORDID);
    console.log(`Logged in as ${client.user.tag}!`)
}
