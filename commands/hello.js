const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send(`Hello ${message.author}`);

}

module.exports.help = {
    name: "hello",
    description: "Say a friendly hello to the bot.",
    category: "Generaly",
    aliases: ["hoi", "hallo", "hey", "yo"]
}

// Usage: **!hello**