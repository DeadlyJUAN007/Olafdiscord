
module.exports.run = async (client, message, args, options) => {

    // var guildIDData = options.active.get(message.guild.id);

    // if (!guildIDData) return message.channel.send("❌**Nothing playing in this server.**");

    // if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You aren't in the same voice channel.");

    // if (isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.reply("Choose a number between 0 - 150.");

    // guildIDData.dispatcher.setVolume(args[0] / 100);

    // return message.channel.send(`🔊 Volume changed to ${args[0]}`);

}

module.exports.help = {
    name: "volume",
    description: "",
    category: "",
    aliases: ["geluid"]
}

// Usage: **!volume {1 - 150}**