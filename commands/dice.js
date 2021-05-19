module.exports.run = async (client, message, args) => {

    var result = Math.ceil(Math.random() * 6);

    message.channel.send(`:game_die: You trowed **${result}**! :game_die:`);

}

module.exports.help = {
    name: "dice",
    description: "Throw the dice to get a random number between 1 - 6.",
    category: "Generaly",
    aliases: ["dobbelsteen", "dobbelen"]
}

// Usage: **!dice**