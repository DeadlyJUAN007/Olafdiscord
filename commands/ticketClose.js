const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "734542732801867827";

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry! But you can't close this ticket.")

    if (message.channel.parentID == categoryID) {
  
        message.channel.delete();

        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("This ticket is marked as **Complete**")
            .setFooter("Ticket closed")
            .setTimestamp();

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "📕-log");
        if (!ticketChannel) return message.reply("This channel doesn't exist.");

        ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("Sorry! but you can only use this command in a ticket channel.");

    }

}

module.exports.help = {
    name: "close",
    description: "Close the ticket you are in.",
    category: "Moderation",
    aliases: ["tc"]
}

// Usage: **!close**