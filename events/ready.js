module.exports = client => {
    global.active = true;
    global.user = client.users.get(process.env.INFINITY_DISCORDID);
    const global.R = new snoowrap({
        name: `but`,
        userAgent: `${process.env.REDDIT_USERID}`,
        clientId: `${process.env.REDDIT_CLIENTID}`,
        clientSecret: `${process.env.REDDIT_CLIENTSECRET}`,
        refreshToken: `${process.env.REDDIT_REFRESHTOKEN}`
    });
    const global.r = new snoowrap({
        name: `fin`,
        userAgent: `${process.env.INFINITY_USERID}`,
        clientId: `${process.env.INFINITY_CLIENTID}`,
        clientSecret: `${process.env.INFINITY_CLIENTSECRET}`,
        refreshToken: `${process.env.INFINITY_REFRESHTOKEN}`
    });
    console.log(`Logged in as ${client.user.tag}!`)
}
