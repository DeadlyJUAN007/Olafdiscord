const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("❌**Nothing playing in this server.**");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Now playing ${nowPlaying.songTitle} \nRequested by ${nowPlaying.requester}. \n\n**Queue:** \n`;

    for (let index = 0; index < queue.length; index++) {

        response += `${index}, ${queue[index].songTitle} Requested by ${queue[index].requester}\n`;

    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue",
    description: "Shows you the queue.",
    category: "Music",
    aliases: ["afspeellijst", "wachtrij"]
}

// Usage: **!queue**