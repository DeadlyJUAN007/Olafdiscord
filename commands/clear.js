const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! But you can't use this command");

    if (!args[0]) return message.reply("Give the amount of messages you want to clear.");

    if (Number.isInteger(parseInt(args[0]))) {
 
        var amount = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {
                message.reply(`Are u stupid? I cant delete 0 messages`).then(msg => msg.delete({timeout: 3000}));

            } else if (args[0] == 1) {
                message.reply(`I removed 1 message.`).then(msg => msg.delete({timeout: 3000}));
           
            } else {
                message.reply(`I removed ${args[0]} messages.`).then(msg => msg.delete({timeout: 3000}));
            }
        
        })
    
    }else {
        return message.reply("Give a number.");
    }
}
module.exports.help = {
    name: "clear",
    description: "Erase the amount of messages you want.",
    category: "Moderation",
    aliases: ["ruim_op", "clean", "sweap"]
}

// Usage: **!clear {amount}**