const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
    if (!member) member = message.member;

    var roles = member.roles.cache.size - 1;
    var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");
    if (roles == 0) roleNames = "This user doesn't have any roles.";

    var status = member.presence.status;

    var nickName = member.nickname;
    if (nickName == null || undefined) nickName = "None";

    var embed = new discord.MessageEmbed()
        .setColor("#05b0ff")
        .setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
        .setTitle(`${member.user.tag}`)
        .addField("ID:", `${member.id}`, true)
        .addField("Nickname:", nickName, true)
        .addField("Status:", `${status}`, true)
        .addField("Game:", `${member.presence.activities[0] ? member.presence.activities[0].name : "Nothing playing"}`, true)
        .addField("Account created:", `${moment(member.user.createdAt).format("LLLL")}`) //LL
        .addField("Server joined at:", `${moment(member.joindAt).format('LLLL')}`)
        .addField(`Roles [${roles}]`, `${roleNames}`);

    message.channel.send(embed);
}

module.exports.help = {
    name: "userinfo",
    description: "Get to know everything about your account or someone else's.",
    category: "Information",
    aliases: ["ui", "gebruikerinfo"]
}

// Usage: **!userinfo {@username}**