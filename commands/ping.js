module.exports.run = async (client, message, args) => {

    // var sendTime = message.createdTimestamp;
    // var ms = Date.now(1000);
    var time = message.createdTimestamp - Date.now();

    return message.channel.send(`🏓Pong: ${message.createdTimestamp - Date.now()}ms`);

}

module.exports.help = {
    name: "ping",
    description: "See how fast the bot reacts.",
    category: "Information",
    aliases: []
}

// Usage: **!ping**