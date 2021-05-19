const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Bot Info")
    .setDescription("An info card that provides information about the bot")
    .setColor("#0088ff")
    .addFields(
        {name: "Owner:", value:"Alex"},
        {name: "Birthday", value:message.guild.me.joinedAt}
    )
    .addField("Bot name:", client.user.username)
    .setThumbnail("https://bit.ly/2CF4qta")
    .setFooter("That was all of the info", "https://bit.ly/2CL1BqI")
    .setTimestamp();

    return message.channel.send(botEmbed);
    
}

module.exports.help = {
    name: "botinfo",
    description: "Gives info about the Olaf Bot.",
    category: "Information",
    aliases: ["botinformatie", "olafinfo"]
}

// Usage: **!botinfo**