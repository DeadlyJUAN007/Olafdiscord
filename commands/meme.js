const discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {

   fetch('https://www.reddit.com/r/memes/random/.json').then(resp => resp.json()).then(respTransformed => {

        var permaLink = respTransformed[0].data.children[0].data.permaLink;
        var memeUrl = `https://www.reddit.com${permaLink}`;
        var memePicture = respTransformed[0].data.children[0].data.url;
        var memeTitle = respTransformed[0].data.children[0].data.title;

        var embed = new discord.MessageEmbed()
            .setTitle(`${memeTitle}`)
            .setURL(`${memeUrl}`)
            .setImage(`${memePicture}`)
            .setColor('RANDOM');

        message.channel.send(embed);

   }).catch("error", (err) => {
       console.log(err.message);
   })

}

module.exports.help = {
    name: "meme",
    description: "Let the bot show you a random meme from the reddit page memes.",
    category: "Generaly",
    aliases: ["memerij", "meem"]
}