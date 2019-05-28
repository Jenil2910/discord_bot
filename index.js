require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const port = process.env.PORT
//const port = 4543

const requestHandler = (request, response) => {
  console.log(request.url);
  setInterval(function() {
    console.log(`Next request coming ${30000}`);
    http.get("http://thanos-hq.herokuapp.com");
  }, 30000);
  response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});

fs.readdir('./events/', (err, files)=> {
  files.forEach(file =>{
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
});

client.login(process.env.BOT_TOKEN);
