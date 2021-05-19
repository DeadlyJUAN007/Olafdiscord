const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (client, message, args) => {

    // try{

    //     var helptext = "**C.E.T Bot** \n\n **__Commands__** \n **!hello** - Say hello to the bot. \n **!botinfo** - Gives info about the bot. \n **!serverinfo** - Gives info about the discord server. \n **!ticket** - Makes a new ticket where u can ask questions. \n **!close** - Closes the ticket you typed in. \n **!clear {amount}** - Removes the amount of messages. \n **!tempmute {@username} {time}** - Mute a person. \n **!warn {@username} {reason}** - Warns a person \n **!kick {@username} {reason}** - Kicks a person out of the server. \n **!ban {@username} {reason}** - Bans a person out of the server. \n **!announcement {titel} {message} {color} {channel}** - Makes an announcement.";

    //     message.author.send(helptext);

    //     message.reply("Check your Dm's");

    // } catch (error) {
    //     message.reply("Sorry! Something went wrong.")
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    client.commands.forEach(command => {

        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category
        }

        commandList.push(constructor);

    });

    var response = "**Olaf Bot Commands**\n\n";
    // var edit = "**__Commands__**\n\n";
    var general = "**__Generaly__**\n";
    var music = "\n**__Music__**\n";
    var info = "\n**__Information__**\n";
    var mod = "\n**__Moderation__**\n";

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "Generaly") {

            general += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["category"] == "Music") {

            music += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["category"] == "Information") {

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["category"] == "Moderation") {

            mod += `${prefix}${command["name"]} - ${command["description"]}\n`;

        }

    }

    // response += edit;
    response += general;
    response += music;
    response += info;
    response += mod;

    message.author.send(response).then(() => {
        message.reply("Check your Dm's! :mailbox_with_mail:");
    }).catch(() => {
        message.reply("Something went wrong! Please check if your Dm's are public.");
    });
}
module.exports.help = {
    name: "help",
    description: "Gives every command possible.",
    category: "Information",
    aliases: ["cmds", "commands"]
}