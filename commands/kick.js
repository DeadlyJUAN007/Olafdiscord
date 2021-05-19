const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");

    if (!args[0]) return message.reply("No user specified!");

    if (!args[1]) return message.reply("No reasons given!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    //if(kickUser.hasPermission("MANAGE_MESSAGE")) return message.reply("Sorry! But you can't kick this user");

    var reason = args.slice(1).join(" ");

    if (!kickUser) return message.reply("User not found!");

    var embedPrompt = new discord.MessageEmbed()
            .setTitle("Respond within 30 seconds")
            .setDescription(`Are u sure you want to kick ${kickUser}?`)
            .setColor("RED");
        
        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Kicked:** ${kickUser} (${kickUser.id})
            **Kicked By:** ${message.author}
            **Reason:** ${reason}`);
        
        message.channel.send(embedPrompt).then(async msg =>{

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(emoji === "✅"){

                msg.delete();

                kickUser.kick(reason).catch(err =>{
                    if(err) return message.reply("Something went wrong.");
                
                });

                message.channel.send(embed);

            }else if(emoji === "❌"){

                msg.delete();

                message.reply("Kick canceled").then(m => m.delete({timeout:5000}));

            }

        })

    }
async function promptMessage(message, author, time, reactions){

    time *= 1000;
    
    for(const reaction of reactions){
        await message.react(reaction);
    }
    
    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    
    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}
module.exports.help = {
    name: "kick",
    description: "Kick a person of the server.",
    category: "Moderation",
    aliases: ["doei", "schop"]
}

// Usage: **!kick {@username} {reason}**