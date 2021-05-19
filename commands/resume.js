
module.exports.run = async (client, message, args, options) => {

//     var guildIDData = options.active.get(message.guild.id);

//     if (!guildIDData) return message.channel.send("❌**Nothing playing in this server.**");

//     if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You aren't in the same voice channel.");

//     if (!guildIDData.dispatcher.paused) return message.channel.send("The song isn't paused.");

//     guildIDData.dispatcher.resume();

//     return message.channel.send("⏯ **Resuming** 👍");

}

module.exports.help = {
    name: "resume",
    description: "Resume the current song playing.",
    category: "Music",
    aliases: ["hervat"]
}

// // Usage: **!resume**