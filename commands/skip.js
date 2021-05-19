const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    // var guildIDData = options.active.get(message.guild.id);

    // if (!guildIDData) return message.channel.send("❌**Nothing playing in this server.**");

    // if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("You aren't in the same voice channel.");

    // if (message.member.hasPermission("KICK_MEMBERS")) {

    //     message.channel.send("⏩ ***Skipped*** 👍");

    //     return guildIDData.dispatcher.emit("finish");
    // }

    // var amountUsers = message.member.voice.channel.members.size;

    // var amountSkip = Math.ceil(amountUsers / 2);

    // if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    // if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.reply("You already skipped.");

    // guildIDData.queue[0].voteSkips.push(message.member.id);
    // options.active.set(message.guild.id, guildIDData);

    // if (guildIDData.queue[0].voteSkips.length >= amountSkip) {

    //     message.channel.send("⏩ ***Skipped*** 👍");

    //     return guildIDData.dispatcher.emit("finish");

    // }

    // message.channel.send(`**Skipping?** (${guildIDData.queue[0].voteSkips.length}/${amountSkip} people)`);

}

module.exports.help = {
    name: "skip",
    description: "Skip the current song playing.",
    category: "",
    aliases: ["volgende", "next", "overslaan"]
}

// Usage: **!skip**