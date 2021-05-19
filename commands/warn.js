const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    if (!args[0]) return message.reply("No user specified!");

    if (!args[1]) return message.reply("No reasons given!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("No perms");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("User not found!");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! But you can't warn this user");

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns:0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Warned:** ${warnUser} (${warnUser.id})
        **Warned By:** ${message.author}
        **Reason:** ${reason}`)
        .addField("**Warns Count**", warns[warnUser.id].warns);

    var channel = message.member.guild.channels.cache.get("733959399365935145");
    
    if(!channel) return;

    channel.send(embed);

    if (warns[warnUser.id].warns == 4) {

        var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`Watch Out!, ${warnUser}`)
        .addField("**Warning**", `${warnUser} Has only one warning left that will result in a ban!`);
    
        message.channel.send(embed)
    
    }else if (warns[warnUser.id].warns == 5) {
        message.guild.member(warnUser).ban(reason);
        message.channel.send(`**${warnUser}** Has been banned for having too many wanings!`);
    }

}

module.exports.help = {
    name: "warn",
    description: "Warn a person.",
    category: "Moderation",
    aliases: ["waarschuw"]
}

// Usage: **!warn {@username} {reason}**