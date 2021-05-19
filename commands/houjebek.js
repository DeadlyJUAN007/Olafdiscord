const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send(`HOU JE F*CKING PLEURIS BEK EENS SEM`);

}

module.exports.help = {
    name: "hjbs",
    description: "Inside Joke...",
    category: "Generaly",
    aliases: ["bakkes"]
}

// Usage: **!hjbs**