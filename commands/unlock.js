module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    await message.channel.overwritePermissions([

        {
            id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
            allow: ['SEND_MESSAGES']
        }

    ]);

    message.channel.send("Channel unlocked! 🔓");

}

module.exports.help = {
    name: "unlock",
    description: "Unlock the channel you are in.",
    category: "Moderation",
    aliases: ["open", "ontgrendel"]
}

// Usage: **!unlock**