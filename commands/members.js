const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var memberTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    var people = memberTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;

    var memberEmbed = new discord.MessageEmbed()
        .setTitle("<MemberCount>")
        .setColor("#00FF00")
        .addField("Members", memberTotal, true)
        .addField("Bots", bots, true)
        .addField("People", people, true)
        .addField("Online", online, true);

    message.channel.send(memberEmbed);
}

module.exports.help = {
    name: "members",
    description: "See how many people are in the discord.",
    category: "Information",
    aliases: ["serverpeople", "people", "mensen", "mensjes", "leden"]
}

// Usage: **!members**