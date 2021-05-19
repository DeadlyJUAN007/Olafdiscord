module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    await message.channel.overwritePermissions([

        {
            id: message.guild.roles.cache.find(r => r.name == "@everyone").id,
            deny: ['SEND_MESSAGES']
        }

    ]);

    message.channel.send("Channel in lockdown! 🔐")

}

module.exports.help = {
    name: "lockdown",
    description: "Lock the channel you are in.",
    category: "Moderation",
    aliases: ["afsluiten", "quarantaine", "sluit_chat", "vergrendel"]
}

// Usage: **!lockdown**