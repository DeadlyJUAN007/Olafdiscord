const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send(`Bonjour mr  ${message.author}🥖🥖 (France music playing in the background)`);

}

module.exports.help = {
    name: "bonjour",
    description: "Say a friendly bonjour to the bot.",
    category: "Generaly",
    aliases: []
}