const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    // if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have permission to do that.");
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to do that.");

    if(!args[0]) return message.reply("Usage: prefix <prefix>");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefix: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setTitle("Prefix")
        .setColor("#ff0000")
        .setDescription(`Prefix has been set to ${args[0]}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "prefix",
    description: "Change the prefix for the Bot.",
    category: "Moderation",
    aliases: ["voorvoegsel"]
}

// Usage: **!hello**