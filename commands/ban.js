const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry! But you can't use this command");

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("No perms");

        if (!args[0]) return message.reply("No user specified!");

        if (!args[1]) return message.reply("No reasons given!");

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        var reason = args.slice(1).join(" ");

        if (!banUser) return message.reply("User not found!");

        if(banUser.hasPermission("MANAGE_MESSAGE")) return message.reply("Sorry! But you can't ban this user");

        var embedPromptBan = new discord.MessageEmbed()
            .setTitle("Respond within 30 seconds")
            .setDescription(`Are u sure you want to ban ${banUser}?`)
            .setColor("RED");
        
        var banEmbed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Banned:** ${banUser} (${banUser.id})
            **Banned By:** ${message.author}
            **Reason:** ${reason}`);
        
        message.channel.send(embedPromptBan).then(async msg =>{

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(emoji === "✅"){

                msg.delete();

                banUser.ban(reason).catch(err =>{
                    if(err) return message.reply("Something went wrong.");
                
                });

                message.channel.send(banEmbed);

            }else if(emoji === "❌"){

                msg.delete();

                message.reply("Ban canceled").then(m => m.delete({timeout:5000}));
            
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
    name: "ban",
    description: "Ban a person.",
    category: "Moderation",
    aliases: ["verban"]
}

// Usage: **!ban {@username} {reason}**