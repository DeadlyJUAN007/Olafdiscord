module.exports.run = async (client, message, args) => {

    // var sendTime = message.createdTimestamp;

    // var time = message.createdTimestamp - Date.now();

    // return message.channel.send(`🏓Pong: ${message.createdTimestamp - Date.now()}ms`);

    // return message.channel.send(`🏓Pong: ${sendTime}ms`);

    return message.channel.send("🏓Pong:" + (message.createdTimestamp - Date.now()) + " ms");

    // return message.channel.send(`🏓Pong: ${time}ms`);
}

module.exports.help = {
    name: "ping",
    description: "See how fast the bot reacts.",
    category: "Information",
    aliases: []
}

// Usage: **!ping**