const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send("No user specified.");

    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
    if(!member) return message.channel.send("User not found.");

    var text = args.join(" ").slice(args[0].length + 1);
    if(!text) return message.channel.send("No message given.");

    var author = message.author.tag;

    member.send(`${text}\nMessage from: ${author}`).then(() => {    //`\nMessage from: ${author}`
        message.channel.send("Message send.");
    }).catch(() => {
        message.channel.send(":x: The user has private Dm's on.");
    });

}

module.exports.help = {
    name: "dm",
    description: "Let the bot say something to a member through Dm's.",
    category: "Generaly",
    aliases: ["pm", "private_message", "direct_message"]
}
