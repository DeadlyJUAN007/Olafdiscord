module.exports.run = async (client, message, args) => {

    message.channel.send('Calculating ping...').then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        resultMessage.edit(`Bot delay: ${ping}, API delay: ${client.ws.ping}`)
    })





    // var sendTime = message.createdTimestamp;

    // var time = message.createdTimestamp - Date.now();

    // return message.channel.send(`🏓Pong: ${message.createdTimestamp - Date.now()}ms`);

    // return message.channel.send(`🏓Pong: ${sendTime - Date.now()}ms`);

    // return message.channel.send("🏓Pong:" + (message.createdTimestamp - Date.now()) + " ms");

    // return message.channel.send(`🏓Pong: ${time}ms`);
}

module.exports.help = {
    name: "ping",
    description: "See how fast the bot reacts.",
    category: "Information",
    aliases: []
}

// Usage: **!ping**