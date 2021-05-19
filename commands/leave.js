// const discord = require("discord.js");
// const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {

//     if (!message.member.voice.channel) return message.reply("❌**You have to be in a voice channel to use this command**");

//     if (!message.guild.me.voice.channel) return message.channel.send("Sorry! The bot isn't connected to a voice channel.");

//     if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("Sorry! You must be in the same voice channel as the bot.");

//     message.guild.me.voice.channel.leave();

//     message.channel.send("📭 **Successfully disconnected**");

}

module.exports.help = {
    name: "leave",
    description: "Let the bot leave out of your voice channel!",
    category: "Music",
    aliases: ["dis", "disconnect", "go_away"]
}

// // Usage: **!leave**