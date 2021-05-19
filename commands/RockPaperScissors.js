const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // sps steen, papier, schaar

    if (!args[0]) return message.reply("Usage: **!rps Rock, Paper, Scissors**");

    var options = ["rock", "paper", "scissors"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "ROCK") {

        if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, I win!`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, You win!`);

        } else if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, Its a Draw!`);

        }

    } else if (args[0].toUpperCase() == "PAPER") {

        if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, I win!`);

        } else if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, You win!`);

        } else if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, Its a Draw!`);

        }

    } else if (args[0].toUpperCase() == "SCISSORS") {

        if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, I win!`);

        } else if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, You win!`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, Its a Draw!`);

        }

    }
}

module.exports.help = {
    name: "rps",
    description: "Play rock paper scissors with the bot.",
    category: "Generaly",
    aliases: ["sps", "steen_papier_schaar", "rock_paper_scissors"]
}

// Usage: **!rps {rock / paper / scissors} **