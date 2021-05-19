const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry! But you can't use this command");

    let botMessage = args.join(" ");

    message.delete().catch();
    
    message.channel.send(botMessage);

}

module.exports.help = {
    name: "say",
    description: "Let the bot say something for you.",
    category: "Moderation",
    aliases: []
}