const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    var roles = message.guild.roles.cache.size - 1;

    var embed = new discord.MessageEmbed()
        .setColor("#05b0ff")
        .setThumbnail(`${message.guild.iconURL({ size: 4096 })}`)
        .setTitle(`${message.guild.name}`)
        .addField("ID:", `${message.guild.id}`, true)
        .addField("Owner:", `${message.guild.owner.user.tag}`, true)
        .addField("Region:", `${message.guild.region}`, true)
        .addField("Bots:", `${message.guild.members.cache.filter(m => m.user.bot).size}`, true)
        .addField("People:", `${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size}`, true)
        .addField("Total member count:", message.guild.memberCount, true)
        .addField("Online:", `${message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size}`, true)
        .addField("Textchannels:", `${message.guild.channels.cache.filter(chan => chan.type == "text").size}`, true)
        .addField("Voicechannels:", `${message.guild.channels.cache.filter(chan => chan.type == "voice").size}`, true)
        .addField("Server made at:", `${moment(message.guild.createdAt).format("LLLL")}`)
        .addField("You joined at:", `${moment(message.member.joinedAt).format("LLLL")}`)
        .addField(`Roles [${roles}]`, `${message.guild.roles.cache.map(r => r).join(" ").replace("@everyone", "")}`);

    message.channel.send(embed);
}

module.exports.help = {
    name: "serverinfo",
    description: "Get to know everything about the server.",
    category: "Information",
    aliases: ["serverinformatie", "serverdata", "si"]
}

// Usage: **!serverinfo**