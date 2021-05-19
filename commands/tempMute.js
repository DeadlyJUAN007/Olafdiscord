const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    if (!args[0]) return message.reply("No user specified!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("No perms");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("User not found!");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! But you can't mute this user");

    var muteRole = message.guild.roles.cache.get('734435993456869514');
    if(!muteRole) return message.channel.send("This role doens't exist.");

    var muteTime = args[1];

    if(!muteTime) return message.reply("No time given.");

    await(mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} has been muted for ${muteTime}.`);

    setTimeout(() => {
        
        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} has been unmuted.`);

    }, ms(muteTime) * 1000);

}

module.exports.help = {
    name: "tempmute",
    description: "Mute a person for a while.",
    category: "Moderation",
    aliases: ["mute", "tm"]
}

// Usage: **!tempmute {@username} {time in seconds}**