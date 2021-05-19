const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry! But you can't use this command.");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Wrong Usage.")
            .setColor("#00ee00")
            .setDescription(`Make an announcement by doing: \n !announcement titel ${seperator} message ${seperator} color ${seperator} channel.`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "📢-aankondigingen";

    var options = {

        titel: argsList[0],
        message: argsList[1] || "No message given.",
        color: argsList[2].trim(),
        channel: argsList[3].trim()

    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle("**Announcement**")
        .setColor(options.color)
        .setDescription(`Message from ${message.author} \n\n ${options.titel} \n\n ${options.message}`)
        .addField(message.guild.mention("here"))
        .setTimestamp();

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.channel);
    if (!channel) return message.reply("This channel doesn't exist");

    channel.send(announceEmbed);
    
    message.channel.send(`Announcement made in ${channel}`);
}

module.exports.help = {
    name: "announcement",
    description: "Makes a announcement.",
    category: "Moderation",
    aliases: ["aankondiging"]
}

// Usage: **!announcement {title} {message} {color} {channel}** 