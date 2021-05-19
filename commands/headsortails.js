module.exports.run = async (client, message, args) => {

    var value = ["Heads", "Tails"];

    var result = value[Math.floor(Math.random() * value.length)];

    message.channel.send(`:coin: It is **${result}**!`);

}

module.exports.help = {
    name: "headsortails",
    description: "Play heads or tails.",
    category: "Generaly",
    aliases: ["kop-of_munt", "k.o.m", "50_50"]
}

// Usage: **!headsortails**