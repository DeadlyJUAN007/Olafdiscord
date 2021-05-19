const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "734542732801867827";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketExist = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketExist = true;

            message.reply("You already have a ticket.");

            return;
        };

    });

    if (ticketExist) return;

    var embed = new discord.MessageEmbed()
        .setTitle(`**Ticket making for ${message.author.username}...**`)
        .setFooter("Ticket is created");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`**Hello ${message.author.username}**`)
                        .setDescription("Ask here your question.")

                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Something went wrong.");
            });
        }
    ).catch(err => {
        message.channel.send("Something went wrong.");
    });

}

module.exports.help = {
    name: "ticket",
    description: "Make a ticket to ask a question.",
    category: "Information",
    aliases: ["kaartje"]
}

// Usage: **!ticket**